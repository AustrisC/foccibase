import { Input } from "@/components/ui/input"

interface ProductInputTitleProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  saveProductTitle: () => void
}

export function ProductInputTitle({
  value,
  onChange,
  saveProductTitle,
}: ProductInputTitleProps) {
  return (
    <Input
      id="product-title"
      value={value}
      className="font-bold md:text-base px-0 pt-0 pb-1.5 border-0 bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-0"
      autoComplete="off"
      tabIndex={-1} // Removes focus when opened
      onChange={onChange}
      onBlur={saveProductTitle}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Saves on Enter button hit
          e.preventDefault()
          saveProductTitle()
        }
      }}
    />
  )
}
