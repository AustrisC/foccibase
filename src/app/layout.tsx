import "@/styles/globals.css"

import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Foccibase",
  description: "The tool",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background text-foreground min-h-screen">
            <div className="flex flex-row h-screen">
              <aside className="w-56 bg-muted border-r border-border flex flex-col py-4 px-2">
                <nav className="flex flex-col gap-1">
                  <Button asChild variant="ghost" className="justify-start">
                    <a href="#">
                      <span role="img" aria-label="products">
                        🥑
                      </span>{" "}
                      Products
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <a href="#">
                      <span role="img" aria-label="recipes">
                        📚
                      </span>{" "}
                      Recipes
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <a href="#">
                      <span role="img" aria-label="recipes">
                        📜
                      </span>{" "}
                      Menu
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <a href="#">
                      <span role="img" aria-label="recipes">
                        🚚
                      </span>{" "}
                      Vendors
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <a href="#">
                      <span role="img" aria-label="recipes">
                        📊
                      </span>{" "}
                      Sales
                    </a>
                  </Button>
                </nav>
              </aside>
              <main className="flex-1 p-8 overflow-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
