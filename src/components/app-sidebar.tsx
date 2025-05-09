import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Products",
    href: "/products",
    icon: "🥑",
  },
  {
    title: "Recipes",
    href: "recipes",
    icon: "📚",
  },
  {
    title: "Menu",
    href: "/menu",
    icon: "📜",
  },
  {
    title: "Vendors",
    href: "/vendors",
    icon: "🚚",
  },
  {
    title: "Sales",
    href: "/sales",
    icon: "📊",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Foccibase</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <span role="img" aria-label="products">
                        {item.icon}
                      </span>{" "}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
