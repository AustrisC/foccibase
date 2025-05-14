"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  getProductCategories,
  type ProductCategory,
} from "@/server/get-product-categories"
import { getProducts, type Product } from "@/server/get-products"

import { AddProductInput } from "./components/add-product-input"
import { CategoryTitle } from "./components/category-title"
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
    Promise.all([getProducts(), getProductCategories()])
      .then(([products, categories]) => {
        setProducts(products)
        setCategories(categories)
      })
      .finally(() => setLoading(false))
  }, [])

  const categoryMap = categories.map((category) => ({
    ...category,
    products: products.filter((product) => product.category_id === category.id),
  }))

  const handleAddProduct = (catId: string) => {
    const productName = newProducts[catId]?.trim()
    if (productName) {
      const newProduct: Product = {
        id: Date.now().toString(), // TODO: change this
        name: productName,
        category_id: catId,
      } as Product

      setProducts((prev) => [...prev, newProduct])
      setNewProducts({ ...newProducts, [catId]: "" })
    }
    setShowInput({ ...showInput, [catId]: false })
  }

  const onPlusclick = (category: CategoryMap) => {
    setShowInput((prev) => ({
      ...prev,
      [category.id]: true,
    }))
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
              <Button key={product.id} variant="secondary" size="sm">
                {product.name}
              </Button>
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
            />
          )}
        </div>
      ))}
    </div>
  )
}
