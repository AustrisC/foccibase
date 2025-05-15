"use client"

import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type Product } from "@/server/get-products"

interface ProductPopoverProps {
  product: Product
}

export function ProductPopover({ product }: ProductPopoverProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const keyLabelMap: { [key: string]: string } = {
    package_price: "Cost / KG",
    package_weight_kg: "Weight (PKG)",
    shelf_life_days: "Shelf Life",
    storage_temperature: "Storage Temp.",
    url: "URL",
  }
  const filteredProduct = Object.fromEntries(
    Object.entries(product).filter(([key]) =>
      Object.keys(keyLabelMap).includes(key),
    ),
  )

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
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold text-2xl leading-none">{product.name}</h4>
          </div>
          <div className="grid gap-2">
            {Object.entries(filteredProduct).map(([key, value]) => {
              return (
                <div key={key} className="grid grid-cols-2 items-center gap-4">
                  <Label
                    htmlFor={key}
                    className="text-muted-foreground cursor-pointer"
                  >
                    {keyLabelMap[key]}
                  </Label>
                  <Input
                    id={key}
                    value={value ?? ""}
                    className="h-8 border-0 bg-transparent dark:bg-transparent text-right shadow-none focus-visible:ring-0 focus-visible:border-0 dark:focus:bg-input/30"
                    autoComplete="off"
                    tabIndex={-1}
                    readOnly={false}
                    ref={inputRef}
                    onFocus={(e) => {
                      // Move cursor to end
                      const val = e.target.value
                      e.target.setSelectionRange(val.length, val.length)
                    }}
                    onMouseDown={(e) => {
                      // Prevent default cursor placement, focus input, then move cursor to end
                      e.preventDefault()
                      const input = e.target as HTMLInputElement
                      input.focus()
                      const val = input.value
                      input.setSelectionRange(val.length, val.length)
                    }}
                    onChange={() => {}} // TODO: implement this
                  />
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
