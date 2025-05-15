import "@/styles/globals.css"

import type { Metadata } from "next"

import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

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
          <SidebarProvider>
            <AppSidebar />
            <main>
              {/* <SidebarTrigger /> */}
              <div className="px-7 py-5">{children}</div>
            </main>
          </SidebarProvider>
          <Toaster richColors={true} />
        </ThemeProvider>
      </body>
    </html>
  )
}
