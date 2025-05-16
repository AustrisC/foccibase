"use client"

import { useEffect, useState } from "react"

import { postgresErrorHandler } from "@/lib/error-handler"
import {
  getProductCategories,
  type ProductCategory,
} from "@/server/get-product-categories"
import { getProducts, type Product } from "@/server/get-products"
import { supabase } from "@/server/supabase-client"

import { AddProductInput } from "./components/add-product-input"
import { CategoryTitle } from "./components/category-title"
import { ProductPopover } from "./components/product-popover/product-popover"
import { ProductsSkeleton } from "./components/products-skeleton"

interface CategoryMap extends ProductCategory {
  products: Product[]
}

export default function ProductsPage() {
  // From database
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [products, setProducts] = useState<Product[]>([])

  // Local state
  const [newProducts, setNewProducts] = useState<{ [key: string]: string }>({})

  // Loaders, booleans
  const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    Promise.all([getProducts(), getProductCategories()])
      .then(([products, categories]) => {
        setProducts(products)
        setCategories(categories)
      })
      .finally(() => setLoading(false))

    // Subscribe to products changes
    const productsChannel = supabase
      .channel("public:products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          getProducts().then(setProducts)
        },
      )
      .subscribe()

    // Subscribe to categories changes
    const categoriesChannel = supabase
      .channel("public:product_categories")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_categories" },
        () => {
          getProductCategories().then(setCategories)
        },
      )
      .subscribe()

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(productsChannel)
      supabase.removeChannel(categoriesChannel)
    }
  }, [])

  const categoryMap = categories.map((category) => ({
    ...category,
    products: products
      .filter((product) => product.category_id === category.id)
      .sort((a, b) => a.name.localeCompare(b.name)), // Sort by name to avoid products switching order when updated, perhaps should use DB based indices
  }))

  const handleAddProduct = async (catId: string) => {
    // Instantly hides the input
    setShowInput({ ...showInput, [catId]: false })

    const productName = newProducts[catId]?.trim()
    if (productName) {
      const tempId = `temp-${Date.now()}`
      const optimisticProduct = {
        id: tempId, // Temporary ID to avoid React key issues
        name: productName,
        category_id: catId,
      } as Product

      setProducts((prev) => [...prev, optimisticProduct])

      // Insert the new product into the database
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: productName,
            category_id: catId,
          },
        ])
        .select() // Inserts row with real ID

      // Remove the optimistic product and add the real one if insert succeeded
      if (!error && data && data.length > 0) {
        setProducts((prev) =>
          prev.filter((p) => p.id !== tempId).concat(data[0]),
        )
      } else if (error) {
        // Remove the optimistic product if error occurs
        setProducts((prev) => prev.filter((p) => p.id !== tempId))
        postgresErrorHandler(error, "product")
      }

      // Clears the input
      setNewProducts({ ...newProducts, [catId]: "" })
    }
  }

  const onPlusclick = (category: CategoryMap) => {
    setShowInput((prev) => ({
      ...prev,
      [category.id]: true,
    }))
  }

  const onProductKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryId: string,
  ) => {
    // Hides the input if esc button is pressed and product field is empty
    if (
      e.key === "Escape" &&
      (!newProducts[categoryId] || newProducts[categoryId].trim() === "")
    ) {
      setShowInput((prev) => ({
        ...prev,
        [categoryId]: false,
      }))
    }

    if (e.key === "Enter") {
      handleAddProduct(categoryId)
    }
  }

  const handleProductTitleChange = (productId: string, newTitle: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, name: newTitle } : p)),
    )
  }

  if (loading) {
    return <ProductsSkeleton count={3} />
  }

  return (
    <div className="flex flex-wrap gap-8">
      {categoryMap.map((category) => (
        <div key={category.id} className="min-w-[320px] flex-1">
          <CategoryTitle
            name={category.name}
            onPlusClick={() => onPlusclick(category)}
          />
          <div className="flex flex-col gap-1.5 mb-2">
            {category.products.map((product) => (
              <ProductPopover
                key={product.id}
                product={product}
                onTitleChangeAction={handleProductTitleChange}
              />
            ))}
          </div>
          {showInput[category.id] && (
            <AddProductInput
              value={newProducts[category.id] || ""}
              onChange={(val) =>
                setNewProducts({
                  ...newProducts,
                  [category.id]: val,
                })
              }
              onAdd={() => handleAddProduct(category.id)}
              onKeyDown={(e) => onProductKeyDown(e, category.id)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
