import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate the message data
    if (!body.campaignId || !body.customerId || !body.message) {
      return NextResponse.json({ error: "Campaign ID, customer ID, and message are required" }, { status: 400 })
    }

    // Simulate a 90% success rate
    const isSuccess = Math.random() < 0.9

    // In a real app, this would send the message to a real vendor API
    // and then call the delivery receipt API with the result

    // Simulate an async delivery receipt callback
    setTimeout(async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/delivery-receipt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId: body.campaignId,
            customerId: body.customerId,
            status: isSuccess ? "SENT" : "FAILED",
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error("Error sending delivery receipt:", error)
      }
    }, 500)

    return NextResponse.json(
      {
        message: "Message queued for delivery",
        status: "QUEUED",
      },
      { status: 202 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
