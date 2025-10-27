export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          seller_id: string
          item_title: string
          category: string
          description: string
          photos: string[]
          price: string
          currency: string
          price_justification: string
          delivery_method: string
          shipping_details: string
          inspection_period: number
          payment_deadline: string
          return_policy: string
          warranty: string
          special_terms: string
          buyer_email: string
          buyer_name: string
          buyer_phone: string
          require_verification: boolean
          min_buyer_rating: number
          allow_direct_comm: boolean
          comm_guidelines: string
          fee_payer: string
          insurance: string
          dispute_resolution: string
          protection_services: string
          status: string
          draft: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          item_title: string
          category: string
          description: string
          photos?: string[]
          price: string
          currency: string
          price_justification: string
          delivery_method: string
          shipping_details: string
          inspection_period: number
          payment_deadline: string
          return_policy: string
          warranty: string
          special_terms: string
          buyer_email: string
          buyer_name: string
          buyer_phone: string
          require_verification: boolean
          min_buyer_rating: number
          allow_direct_comm: boolean
          comm_guidelines: string
          fee_payer: string
          insurance: string
          dispute_resolution: string
          protection_services: string
          status?: string
          draft?: boolean
          created_at?: string
          updated_at?: string
        }
      },
      disputes: {
        Row: {
          id: string
          transaction_id: string
          initiator_id: string
          reason: string
          status: 'open' | 'under_review' | 'resolved' | 'rejected'
          resolution: string | null
          admin_id: string | null
          resolved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          transaction_id: string
          initiator_id: string
          reason: string
          status?: 'open' | 'under_review' | 'resolved' | 'rejected'
          resolution?: string | null
          admin_id?: string | null
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string
          initiator_id?: string
          reason?: string
          status?: 'open' | 'under_review' | 'resolved' | 'rejected'
          resolution?: string | null
          admin_id?: string | null
          resolved_at?: string | null
          updated_at?: string
        }
      },
      dispute_evidence: {
        Row: {
          id: string
          dispute_id: string
          file_url: string
          file_type: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          dispute_id: string
          file_url: string
          file_type: string
          uploaded_by: string
          created_at?: string
        }
      },
      dispute_comments: {
        Row: {
          id: string
          dispute_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          dispute_id: string
          author_id: string
          content: string
          created_at?: string
        }
      },
      audit_logs: {
        Row: {
          id: string
          action: string
          entity_type: string
          entity_id: string | null
          old_value: Json | null
          new_value: Json | null
          performed_by: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          entity_type: string
          entity_id?: string | null
          old_value?: Json | null
          new_value?: Json | null
          performed_by?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      },
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          role: 'admin' | 'user' | 'moderator'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          role?: 'admin' | 'user' | 'moderator'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          role?: 'admin' | 'user' | 'moderator'
          updated_at?: string
        }
      }
    },
    Views: {
      [_ in never]: never
    },
    Functions: {
      [_ in never]: never
    },
    Enums: {
      [_ in never]: never
    }
  }
}

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
