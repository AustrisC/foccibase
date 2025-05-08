import "@/styles/globals.css"

import type { Metadata } from "next"
import Link from "next/link"

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
                    <Link href="/products">
                      <span role="img" aria-label="products">
                        🥑
                      </span>{" "}
                      Products
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/recipes">
                      <span role="img" aria-label="recipes">
                        📚
                      </span>{" "}
                      Recipes
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/menu">
                      <span role="img" aria-label="menu">
                        📜
                      </span>{" "}
                      Menu
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/vendors">
                      <span role="img" aria-label="vendors">
                        🚚
                      </span>{" "}
                      Vendors
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/sales">
                      <span role="img" aria-label="sales">
                        📊
                      </span>{" "}
                      Sales
                    </Link>
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
