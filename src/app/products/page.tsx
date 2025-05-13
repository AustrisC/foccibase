"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { CategoryTitle } from "./components/category-title"

type Category = {
  id: string
  name: string
  products: string[]
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "essentials",
      name: "Essentials",
      products: ["Flour", "Water", "Yeast"],
    },
    {
      id: "vegetables",
      name: "Vegetables",
      products: ["Onions", "Red Peppers", "Basil"],
    },
  ])

  const [newCategory, setNewCategory] = useState("")
  const [newProducts, setNewProducts] = useState<{ [key: string]: string }>({})
  const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({})

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: Date.now().toString(), name: newCategory, products: [] },
      ])
      setNewCategory("")
    }
  }

  const handleAddProduct = (catId: string) => {
    const product = newProducts[catId]?.trim()
    if (product) {
      setCategories((categories) =>
        categories.map((cat) =>
          cat.id === catId
            ? { ...cat, products: [...cat.products, product] }
            : cat,
        ),
      )
      setNewProducts({ ...newProducts, [catId]: "" })
    }

    setShowInput({ ...showInput, [catId]: false })
  }

  const onPlusclick = (category: Category) => {
    setShowInput((prev) => ({
      ...prev,
      [category.id]: true,
    }))
  }

  return (
    <div className="flex flex-wrap gap-8">
      {categories.map((category) => (
        <div key={category.id} className="min-w-[320px] flex-1">
          <CategoryTitle
            name={category.name}
            onPlusClick={() => onPlusclick(category)}
          />
          <div className="flex flex-col gap-1.5 mb-2">
            {category.products.map((product, index) => (
              <Button key={index} variant="secondary" size="sm">
                {product}
              </Button>
            ))}
          </div>
          {showInput[category.id] && (
            <div className="flex gap-2 mb-2">
              <Input
                className="flex-1"
                type="text"
                placeholder="Add product"
                value={newProducts[category.id] || ""}
                onChange={(e) =>
                  setNewProducts({
                    ...newProducts,
                    [category.id]: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddProduct(category.id)
                }}
                onBlur={() => handleAddProduct(category.id)}
                autoFocus
              />
            </div>
          )}
        </div>
      ))}
      <div className="min-w-[320px] flex-1">
        <h2 className="text-2xl mb-4">Add Category</h2>
        <div className="flex gap-2">
          <Input
            className="flex-1"
            type="text"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddCategory()
            }}
          />
          <button
            className="rounded bg-primary text-primary-foreground px-3 py-1"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
