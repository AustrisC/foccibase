import { PostgrestError } from "@supabase/supabase-js"
import { toast } from "sonner"

export function postgresErrorHandler(
  error: PostgrestError,
  targetName: string,
) {
  const defaultErrorMessage = `Failed to add ${targetName}: ${error.message}`

  const errorMessageMap: { [key: string]: string } = {
    "23505": `A ${targetName} with this name already exists. Please choose a different name.`,
  }

  const errorMessage = errorMessageMap[error.code] || defaultErrorMessage
  toast.error(errorMessage)
}
