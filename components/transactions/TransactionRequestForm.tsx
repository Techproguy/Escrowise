import React, { useState, FormEvent, ChangeEvent, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Database } from "@/types/database.types";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { AnnotationCanvas } from "@/components/ui/annotation-canvas";
import { useAuth } from "@/contexts/auth-context";
import { X } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import type { ImageProps } from "next/image";
import type { HTMLAttributes } from "react";

type TransactionFormData = Database['public']['Tables']['transactions']['Row'];

interface TransactionRequestFormProps {
  sellerId: string;
}


export function TransactionRequestForm({ sellerId }: TransactionRequestFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const supabaseClient = useSupabaseClient();

  const CATEGORIES = ["Electronics", "Fashion", "Services", "Collectibles", "Other"] as const;
  const DELIVERY_METHODS = ["Shipping", "Local Pickup", "Digital Delivery"] as const;
  const CURRENCIES = ["USD", "EUR", "GBP", "NGN"] as const;

  const [form, setForm] = useState<Partial<TransactionFormData>>({
    item_title: '',
    category: '',
    description: '',
    photos: [],
    price: '',
    currency: '',
    price_justification: '',
    delivery_method: '',
    shipping_details: '',
    inspection_period: 5,
    payment_deadline: '',
    return_policy: '',
    warranty: '',
    special_terms: '',
    buyer_email: '',
    buyer_name: '',
    buyer_phone: '',
    require_verification: false,
    min_buyer_rating: 0,
    allow_direct_comm: false,
    comm_guidelines: '',
    fee_payer: '',
    insurance: '',
    dispute_resolution: '',
    protection_services: '',
    seller_id: sellerId,
    status: 'pending',
    draft: false
  });
  const [activeStep, setActiveStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("item-details");
  const [showPhotos, setShowPhotos] = useState(false);
  const [annotateIdx, setAnnotateIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!form.draft) return;
    const interval = setInterval(() => saveDraft(), 30000);
    return () => clearInterval(interval);
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  }; // Make sure all input fields have the correct 'name' attribute

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const uploaded: string[] = [];
    for (const file of files) {
      const path = `transactions/${sellerId}/${Date.now()}-${file.name}`;
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage.from("attachments").upload(path, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("attachments").getPublicUrl(path);
        if (urlData?.publicUrl) uploaded.push(urlData.publicUrl);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
    setForm(prev => ({
      ...prev,
      photos: [...(((prev as any).photos || []) as string[]), ...uploaded]
    }));
  };

  const handlePhotoDelete = (idx: number) => {
    setForm(prev => ({
      ...prev,
      photos: (((prev as any).photos || []) as string[]).filter((_, i) => i !== idx)
    }));
  };

  const saveDraft = async () => {
    setSaving(true);
    await supabase.from("transactions").upsert({
      ...form,
      seller_id: sellerId,
      status: "pending",
      draft: true
    });
    setSaving(false);
    // setDraftSaved(true); // Commented out because setDraftSaved is not defined
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!form.item_title || !form.item_title.trim()) errors.push("Item title is required");
    if (!form.category) errors.push("Category is required");
    if (!form.description || !form.description.trim()) errors.push("Description is required");
    if (!form.photos || !form.photos.length) errors.push("At least one photo is required");
    if (!form.price || !form.price.trim()) errors.push("Price is required");
    if (!form.currency) errors.push("Currency is required");
    if (!form.delivery_method) errors.push("Delivery method is required");
    if (!form.insurance || !form.insurance.trim()) errors.push("Insurance is required");
    if (!form.buyer_email || !form.buyer_email.trim()) errors.push("Buyer email is required");
    // Optional: email format validation
    if (form.buyer_email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.buyer_email)) errors.push("Valid buyer email required");
    return errors;
  };


  const handleAnnotationSave = async (dataUrl: string) => {
    if (annotateIdx === null) return;
    setForm((prev: Partial<TransactionFormData>) => ({
      ...prev,
      photos: prev?.photos?.map((photo: string, i: number) => i === annotateIdx ? dataUrl : photo) || []
    }));
    setAnnotateIdx(null);
  };

  const handleSubmit = async (sendInvitation = true, e?: React.FormEvent<HTMLFormElement>) => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Error",
        description: validationErrors.join("\n"),
        variant: "destructive"
      });
      return;
    }
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert({
          ...form,
          status: "pending",
          draft: !sendInvitation
        })
        .select("id")
        .single();
      if (error) throw error;

      if (sendInvitation && data?.id) {
        const notificationPromises = [
          fetch("/api/notify", {
            method: "POST",
            body: JSON.stringify({
              user_id: form.buyer_email,
              transaction_id: data?.id,
              type: "email",
              message: `You have been invited to a transaction: ${form.item_title}`
            }),
            headers: { "Content-Type": "application/json" } as HeadersInit
          }),
          fetch("/api/notify", {
            method: "POST",
            body: JSON.stringify({
              user_id: form.buyer_phone,
              transaction_id: data?.id,
              type: "sms",
              message: `You have been invited to a transaction: ${form.item_title}`
            }),
            headers: { "Content-Type": "application/json" } as HeadersInit
          }),
          fetch("/api/notify", {
            method: "POST",
            body: JSON.stringify({
              user_id: form.buyer_email,
              transaction_id: data?.id,
              type: "in-app",
              message: `You have been invited to a transaction: ${form.item_title}`
            }),
            headers: { "Content-Type": "application/json" } as HeadersInit
          })
        ];

        try {
          await Promise.all(notificationPromises);
        } catch (notificationError: any) {
          console.error("Error sending notifications:", notificationError);
          // Don't fail the entire transaction if notifications fail
        }
      }
      setSaving(false);
      toast({
        title: "Success",
        description: "Transaction created successfully!"
      });
    } catch (err: any) {
      console.error("Error creating transaction:", err);
      setSaving(false);
      toast({
        title: "Error",
        description: err.message || "Failed to create transaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Tabs defaultValue="item" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="item">Item Details</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
      </TabsList>
      <TabsContent value="item">
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item_title">Item Title</Label>
                <Input
                  name="item_title"
                  value={form.item_title || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  value={form.description || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category || ''} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                value={form.price || ''}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={form.currency || ''} onValueChange={(value) => setForm((prev) => ({ ...prev, currency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="delivery_method">Delivery Method</Label>
              <Select value={form.delivery_method || ''} onValueChange={(value) => setForm((prev) => ({ ...prev, delivery_method: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery method" />
                </SelectTrigger>
                <SelectContent>
                  {DELIVERY_METHODS.map((deliveryMethod) => (
                    <SelectItem key={deliveryMethod} value={deliveryMethod}>
                      {deliveryMethod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="insurance">Insurance</Label>
              <Input
                name="insurance"
                value={form.insurance || ''}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </>
);

}

export default TransactionRequestForm;
