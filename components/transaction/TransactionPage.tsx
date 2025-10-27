"use client"

import type React from "react"
import Header from "./Header"
import TransactionForm from "./TransactionForm"
import TransactionDetails from "./TransactionDetails"
import Button from "./Button"

import { useState } from "react";

const TransactionPage: React.FC = () => {
  const [transaction, setTransaction] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    inspectionPeriod: ""
  });

  // Handler to update transaction state from TransactionForm
  const handleTransactionChange = (field: string, value: string) => {
    setTransaction(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
      <Header />
      <div className="flex flex-col w-full max-w-[1190px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <TransactionForm transaction={transaction} onTransactionChange={handleTransactionChange} />
        <TransactionDetails
          name={transaction.name}
          category={transaction.category}
          price={transaction.price}
          description={transaction.description}
          inspectionPeriod={transaction.inspectionPeriod}
        />
        <div className="flex justify-end mt-12 sm:mt-16">
          <Button className="px-8 sm:px-12 py-4 sm:py-5">Create Transaction</Button>
        </div>
      </div>
    </main>
  );
};

export default TransactionPage;

