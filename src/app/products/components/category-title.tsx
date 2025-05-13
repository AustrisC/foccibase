import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

type CategoryTitleProps = {
  name: string
  onPlusClick: () => void
}

export function CategoryTitle({ name, onPlusClick }: CategoryTitleProps) {
  return (
    <div className="flex items-center justify-between group mb-4">
      <h2 className="text-2xl">{name}</h2>
      <Button
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full dark:hover:bg-transparent"
        aria-label={`Add to ${name}`}
        variant="ghost"
        size="icon"
        onClick={onPlusClick}
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  )
}
