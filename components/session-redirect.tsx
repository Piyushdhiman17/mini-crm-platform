"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export function SessionRedirect({ redirectTo }: { redirectTo: string }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push(redirectTo)
    }
  }, [session, status, router, redirectTo])

  return null
}
