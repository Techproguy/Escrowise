import React from "react";

interface UserParty {
  first_name: string;
  last_name: string;
  // Add more fields as needed
}

interface TransactionDetailsCardProps {
  transaction: {
    item_title: string;
    category: string;
    price: number;
    currency: string;
    description: string;
    photos?: string[];
    status: string;
    inspection_period: number;
  } | null;
  buyer?: UserParty;
  seller?: UserParty;
}

const TransactionDetailsCard = ({ transaction, buyer, seller }: TransactionDetailsCardProps) => {
  if (!transaction) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-xl font-bold tracking-tighter text-black">{transaction.item_title}</h3>
          <p className="text-sm text-gray-600">{transaction.category}</p>
        </div>
        <p className="text-xl font-bold text-black mt-2 sm:mt-0">
          {transaction.price} {transaction.currency}
        </p>
      </div>
      <p className="mb-3 text-gray-700">{transaction.description}</p>
      {transaction.photos && Array.isArray(transaction.photos) && (
        <div className="flex gap-2 mb-3">
          {transaction.photos.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`photo-${idx}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
        <span>
          <strong>Seller:</strong> {seller?.first_name} {seller?.last_name}
        </span>
        {buyer && (
          <span>
            <strong>Buyer:</strong> {buyer?.first_name} {buyer?.last_name}
          </span>
        )}
        <span>
          <strong>Status:</strong> {transaction.status}
        </span>
        <span>
          <strong>Inspection Period:</strong> {transaction.inspection_period} days
        </span>
      </div>
    </div>
  );
};

export default TransactionDetailsCard;
