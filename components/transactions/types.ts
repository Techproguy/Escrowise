import React from 'react';

export interface Transaction {
  id: string
  title: string
  created: string
  amount: string
  currency: string
  role: string
  status: {
    text: string
    type: "awaiting-response" | "awaiting-payment" | "completed" | "cancelled"
  }
}

export interface TransactionRequestFormProps {
  sellerId: string;
}

export interface TransactionFormData {
  item_title: string;
  category: string;
  description: string;
  photos: string[];
  price: string;
  currency: string;
  price_justification: string;
  delivery_method: string;
  shipping_details: string;
  inspection_period: number;
  payment_deadline: string;
  return_policy: string;
  warranty: string;
  special_terms: string;
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  require_verification: boolean;
  min_buyer_rating: number;
  allow_direct_comm: boolean;
  comm_guidelines: string;
  fee_payer: string;
  insurance: string;
  dispute_resolution: string;
  protection_services: string;
  draft: boolean;
}

// Declare custom component types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  placeholder?: string;
}

export interface CardProps {
  children: React.ReactNode;
}

export interface CardContentProps {
  children: React.ReactNode;
}

export interface ImageAnnotatorProps {
  imageUrl: string;
  onSave: (dataUrl: string) => void;
}
