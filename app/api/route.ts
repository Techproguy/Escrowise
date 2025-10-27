import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json({ error: 'Type parameter is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('type', type)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
