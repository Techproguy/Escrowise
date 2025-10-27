"use client"
import React, { useState } from "react"
import TransactionDetails from "./TransactionDetails"
import TransactionSummary from "./TransactionSummary"
import BuyerDetails from "./BuyerDetails"
import ItemEntryForm from "./ItemEntryForm"
import { motion } from "framer-motion"
import { supabase } from '../../src/supabaseClient';

interface Item {
  name: string
  price: string
  description: string
  category: string
}

interface TransactionFormState {
  title: string
  role: "Buyer" | "Seller"
  currency: string
  haveBuyer: boolean
  agreeTerms: boolean
}

interface TransactionFormProps {
  transaction: {
    name: string;
    category: string;
    price: string;
    description: string;
    inspectionPeriod: string;
  };
  onTransactionChange: (field: keyof TransactionFormProps['transaction'], value: string) => void;
}

function TransactionForm({ transaction, onTransactionChange }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormState>({
    title: "",
    role: "Buyer",
    currency: "USD",
    haveBuyer: false,
    agreeTerms: false,
  });

  const [items, setItems] = useState<Item[]>([]);

  // Handles changes for transaction fields controlled by parent
  const handleTransactionFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTransactionChange(name as keyof TransactionFormProps['transaction'], value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    setFormData((prev: TransactionFormState) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddItem = (item: Item) => {
    setItems((prev) => [...prev, item])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('transactions').insert([
      { title: formData.title, role: formData.role, currency: formData.currency, items },
    ]);
    if (error) console.error('Error inserting data:', error);
    else console.log('Data inserted successfully:', data);
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.form
      className="flex flex-col gap-8 sm:gap-10"
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.div className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-sm" variants={itemVariants}>
  <div className="mb-6 sm:mb-8">
    <label htmlFor="name" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
      Item Name
    </label>
    <input
      id="name"
      name="name"
      type="text"
      value={transaction.name}
      onChange={handleTransactionFieldChange}
      placeholder="Enter item name"
      className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
      required
    />
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
    <div>
      <label htmlFor="category" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
        Category
      </label>
      <input
        id="category"
        name="category"
        type="text"
        value={transaction.category}
        onChange={handleTransactionFieldChange}
        placeholder="Enter category"
        className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        required
      />
    </div>
    <div>
      <label htmlFor="price" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
        Price
      </label>
      <input
        id="price"
        name="price"
        type="number"
        value={transaction.price}
        onChange={handleTransactionFieldChange}
        placeholder="Enter price"
        className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        required
      />
    </div>
    <div>
      <label htmlFor="inspectionPeriod" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
        Inspection Period (Days)
      </label>
      <input
        id="inspectionPeriod"
        name="inspectionPeriod"
        type="number"
        min="1"
        max="30"
        value={transaction.inspectionPeriod}
        onChange={handleTransactionFieldChange}
        placeholder="e.g., 7"
        className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        required
      />
    </div>
  </div>
  <div className="mb-6 sm:mb-8">
    <label htmlFor="description" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
      Description
    </label>
    <textarea
      id="description"
      name="description"
      value={transaction.description}
      onChange={handleTransactionFieldChange}
      placeholder="Enter item description"
      className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
      required
    />
  </div>
        <div className="mb-6 sm:mb-8">
          <label htmlFor="title" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
            Transaction Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title for your transaction"
            className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label htmlFor="role" className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
              My Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all appearance-none"
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="Broker">Broker</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="currency"
              className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block"
            >
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all appearance-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="inspectionPeriod"
              className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block"
            >
              Inspection Period (Days)
            </label>
            <input
              id="inspectionPeriod"
              name="inspectionPeriod"
              type="number"
              min="1"
              max="30"
              value={transaction.inspectionPeriod}
              onChange={handleTransactionFieldChange}
              placeholder="e.g., 7"
              className="px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </motion.div>

      <motion.div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm" variants={itemVariants}>
        <ItemEntryForm onAddItem={handleAddItem} />
      </motion.div>

      {items.length > 0 && (
        <>
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tighter text-black">Added Items</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TransactionDetails
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    description={item.description}
                    inspectionPeriod={transaction.inspectionPeriod}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 sm:p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TransactionSummary items={items} />
          </motion.div>

          <motion.hr
            className="my-6 sm:my-8 bg-orange-400 h-[2px] border-none"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="mb-6 sm:mb-8 text-base sm:text-lg text-center text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            All prices are in {formData.currency}. Taxes may apply.
          </motion.p>

          <motion.div
            className="bg-white p-6 sm:p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <BuyerDetails haveBuyer={formData.haveBuyer} agreeTerms={formData.agreeTerms} onChange={handleChange} />
          </motion.div>
        </>
      )}
    </motion.form>
  )
}

export default TransactionForm
