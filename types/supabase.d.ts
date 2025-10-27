import { Database } from './database.types';

declare global {
  type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

  interface DatabaseTables {
    public: {
      Tables: {
        [key: string]: {
          Row: Record<string, unknown>;
          Insert: Record<string, unknown>;
          Update: Record<string, unknown>;
        };
      };
      Views: {
        [key: string]: {
          Row: Record<string, unknown>;
        };
      };
      Functions: {
        [key: string]: {
          Args: Record<string, unknown>;
          Returns: unknown;
        };
      };
      Enums: {
        [key: string]: string[];
      };
    };
  }

  type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
  type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
}

export {};
