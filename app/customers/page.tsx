"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getCustomers } from "@/lib/data"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

export default function CustomersPage() {
  const [page, setPage] = useState(1)
  const [customers, setCustomers] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { data, totalPages: pages } = getCustomers(page, 10)
    setCustomers(data)
    setTotalPages(pages)
    setIsLoading(false)
  }, [page])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <>
      <DashboardHeader heading="Customers" text="Manage your customer data">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Import Customers
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <DataTable columns={columns} data={customers} pageCount={totalPages} currentPage={page} />
      </DashboardShell>
    </>
  )
}
