import type { Database } from "@/types/database.types"

import { supabase } from "./supabase-client"

export type ProductCategory =
  Database["public"]["Tables"]["product_categories"]["Row"]

export async function getProductCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase.from("product_categories").select("*")
  if (error) throw error
  return data ?? []
}
