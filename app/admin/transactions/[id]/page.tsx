import { Metadata } from 'next';
import TransactionDetails from "@/components/admin/TransactionDetails";

export const metadata: Metadata = {
  title: 'Transaction Details',
};

interface TransactionPageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionPage({ params }: TransactionPageProps) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-8 px-4">
      <TransactionDetails transactionId={id} />
    </div>
  );
}
