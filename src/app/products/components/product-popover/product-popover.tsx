"use client"

import { TrashIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type Product } from "@/server/get-products"
import { supabase } from "@/server/supabase-client"

import { ProductFieldInput } from "./product-input-field"
import { ProductInputTitle } from "./product-input-title"

interface ProductPopoverProps {
  product: Product
}

export function ProductPopover({
  product,
  onTitleChangeAction,
  onRemoveAction,
}: ProductPopoverProps & {
  onTitleChangeAction: (id: string, title: string) => void
  onRemoveAction: (id: string) => void
}) {
  const keyLabelMap: { [key: string]: string } = {
    package_price: "Cost / KG",
    package_weight_kg: "Weight (PKG)",
    shelf_life_days: "Shelf Life",
    storage_temperature: "Storage Temp.",
    url: "URL",
  }
  const filteredProduct = Object.fromEntries(
    Object.entries(product)
      .filter(([key]) => Object.keys(keyLabelMap).includes(key))
      .map(([key, value]) => [key as keyof Product, value]),
  )

  const [open, setOpen] = useState(false)
  const [editTitle, setEditTitle] = useState(product.name)
  const [editValues, setEditValues] = useState(filteredProduct)

  const saveProductTitle = async () => {
    if (editTitle !== product.name) {
      onTitleChangeAction(product.id, editTitle) // Optimistically updates parent state
      await supabase
        .from("products")
        .update({ name: editTitle })
        .eq("id", product.id)
    }
  }

  const saveProductField = async (key: string) => {
    if (editValues[key] !== product[key as keyof Product]) {
      await supabase
        .from("products")
        .update({ [key]: editValues[key as keyof typeof editValues] })
        .eq("id", product.id)
    }
  }

  const handleRemove = async () => {
    setOpen(false)
    onRemoveAction(product.id)
    await supabase.from("products").delete().eq("id", product.id)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="w-full">
          {product.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-75"
        align="start"
        sideOffset={8}
        tabIndex={-1} // Removes focus when opened
      >
        <div className="flex items-baseline">
          <div className="flex-1">
            <ProductInputTitle
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              saveProductTitle={saveProductTitle}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 group"
            onClick={handleRemove}
            type="button"
          >
            <TrashIcon
              className="w-5 h-5 text-muted-foreground group-hover:text-red-600 transition-colors"
              aria-label="Remove product"
            />
          </Button>
        </div>
        <div>
          {Object.entries(filteredProduct).map(([key]) => {
            return (
              <ProductFieldInput
                key={key}
                id={key}
                label={keyLabelMap[key]}
                value={editValues[key] ?? ""}
                onChange={(val) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [key]: val,
                  }))
                }
                onBlur={() => saveProductField(key)}
              />
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
