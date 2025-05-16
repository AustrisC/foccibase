import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProductFieldInputProps extends React.ComponentProps<"input"> {
  id: string
  label: string
  value: string | number
}

export function ProductFieldInput({
  id,
  label,
  value,
  ...props
}: ProductFieldInputProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <Label htmlFor={id} className="text-muted-foreground cursor-pointer">
        {label}
      </Label>
      <Input
        id={id}
        value={value ?? ""}
        className="h-8 border-0 bg-transparent dark:bg-transparent text-right shadow-none focus-visible:ring-0 focus-visible:border-0 dark:focus:bg-input/30 cursor-pointer"
        autoComplete="off"
        tabIndex={-1} // Removes focus when opened
        onMouseDown={(e) => {
          // Prevent default cursor placement, focus input, then move cursor to end
          e.preventDefault()
          const input = e.target as HTMLInputElement
          input.focus()
          const val = input.value
          input.setSelectionRange(val.length, val.length)
        }}
        {...props}
      />
    </div>
  )
}
