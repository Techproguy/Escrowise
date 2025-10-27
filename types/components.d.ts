import { ReactNode } from "react";

declare module "@/lib/supabase" {
  const supabase: any;
  export default supabase;
}
