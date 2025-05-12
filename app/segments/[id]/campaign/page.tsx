import DashboardHeader from "@/components/dashboard-header"
import DashboardShell from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSegments } from "@/lib/data"
import CampaignCreator from "@/components/campaign-creator"
import { AuthCheck } from "@/components/auth-check"
import { notFound } from "next/navigation"

export default function CreateCampaignPage({
  params,
}: {
  params: { id: string }
}) {
  const segments = getSegments()
  const segment = segments.find((s) => s.id === params.id)

  if (!segment) {
    notFound()
  }

  return (
    <AuthCheck>
      <DashboardHeader heading="Create Campaign" text={`Create a new campaign for the "${segment.name}" segment`} />
      <DashboardShell>
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Configure your campaign message and delivery settings</CardDescription>
          </CardHeader>
          <CardContent>
            <CampaignCreator segment={segment} />
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthCheck>
  )
}
