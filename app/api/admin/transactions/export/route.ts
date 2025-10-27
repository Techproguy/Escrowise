import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { format } from '@fast-csv/format'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')
  const formatType = searchParams.get('format') || 'csv'
  
  let query = supabaseAdmin
    .from('escrow_transactions')
    .select(`
      *,
      buyer:profiles!escrow_transactions_buyer_id_fkey(full_name, email),
      seller:profiles!escrow_transactions_seller_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.or(
      `id.ilike.%${search}%,description.ilike.%${search}%,buyer.full_name.ilike.%${search}%,seller.full_name.ilike.%${search}%`
    )
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (formatType === 'json') {
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="transactions-${new Date().toISOString()}.json"`
      }
    })
  }

  // CSV format
  const csvStream = format({ headers: true })
  let csvData = ''
  
  csvStream
    .on('data', (chunk) => (csvData += chunk))
    .on('end', () => {
      csvStream.end()
    })

  data?.forEach((tx) => {
    csvStream.write({
      'Transaction ID': tx.id,
      'Buyer Name': tx.buyer?.full_name || '',
      'Buyer Email': tx.buyer?.email || '',
      'Seller Name': tx.seller?.full_name || '',
      'Seller Email': tx.seller?.email || '',
      'Amount': tx.amount,
      'Status': tx.status,
      'Created At': new Date(tx.created_at).toISOString(),
      'Description': tx.description,
    })
  })

  csvStream.end()

  return new NextResponse(csvData, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="transactions-${new Date().toISOString()}.csv"`
    }
  })
}
