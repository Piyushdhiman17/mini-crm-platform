import DashboardHeader from "@/components/dashboard-header"
import DashboardShell from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SegmentBuilder from "@/components/segment-builder"
import { AuthCheck } from "@/components/auth-check"

export default function CreateSegmentPage() {
  return (
    <AuthCheck>
      <DashboardHeader heading="Create Segment" text="Define your audience with flexible rule logic" />
      <DashboardShell>
        <Card>
          <CardHeader>
            <CardTitle>Segment Builder</CardTitle>
            <CardDescription>
              Build your audience segment using the rule builder below. Combine conditions using AND/OR operators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SegmentBuilder />
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthCheck>
  )
}
