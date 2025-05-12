"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3 } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <BarChart3 className="h-6 w-6" />
        <span className="inline-block font-bold">Mini CRM</span>
      </Link>
      <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
        <Link
          href="/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/customers"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/customers" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Customers
        </Link>
        <Link
          href="/segments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/segments" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Segments
        </Link>
        <Link
          href="/campaigns"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/campaigns" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Campaigns
        </Link>
      </nav>
    </div>
  )
}
