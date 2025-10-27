"use client"

import { useEffect, useState } from 'react';
import { supabase } from '../../src/supabaseClient';

interface TransactionDetailsProps {
  name: string
  category: string
  price: string
  description: string
  inspectionPeriod: string
}

function TransactionDetails({ name, category, price, description, inspectionPeriod }: TransactionDetailsProps) {
  return (
    <article className="p-5 sm:p-6 w-full rounded-xl bg-gray-50 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tighter text-black">{name}</h3>
          <p className="text-sm sm:text-base text-gray-600">{category}</p>
        </div>
        <p className="text-lg sm:text-xl font-bold text-black mt-2 sm:mt-0">${Number.parseFloat(price).toFixed(2)}</p>
      </div>
      <p className="mb-5 text-sm sm:text-base text-gray-700">{description}</p>
      {inspectionPeriod && (
        <div className="flex gap-1.5 text-sm sm:text-base text-gray-700">
          <p>Inspection Period:</p>
          <p className="font-medium">{inspectionPeriod} Days</p>
        </div>
      )}
    </article>
  );
}

export default TransactionDetails
