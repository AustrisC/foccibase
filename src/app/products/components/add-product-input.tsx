import { Input } from "@/components/ui/input"

type AddProductInputProps = {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

export function AddProductInput({
  value,
  onChange,
  onAdd,
  onKeyDown,
}: AddProductInputProps) {
  return (
    <div className="flex gap-2 mb-2">
      <Input
        className="flex-1"
        type="text"
        placeholder="Add product"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onAdd}
        autoFocus
      />
    </div>
  )
}
