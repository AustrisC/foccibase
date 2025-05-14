import type { Database } from "@/types/database.types"

import { supabase } from "./supabase-client"

export type Product = Database["public"]["Tables"]["products"]["Row"]

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*")
  if (error) throw error
  return data ?? []
}
