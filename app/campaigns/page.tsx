import DashboardHeader from "@/components/dashboard-header"
import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getCampaigns } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow, parseISO } from "date-fns"
import { AuthCheck } from "@/components/auth-check"

export default function CampaignsPage() {
  const campaigns = getCampaigns()

  return (
    <AuthCheck>
      <DashboardHeader heading="Campaigns" text="View and manage your marketing campaigns">
        <Link href="/segments">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </DashboardHeader>
      <DashboardShell>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{campaign.name}</CardTitle>
                    <CardDescription>Segment: {campaign.segmentName}</CardDescription>
                  </div>
                  <Badge>{formatDistanceToNow(parseISO(campaign.sentAt), { addSuffix: true })}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm">{campaign.message}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{campaign.stats.audienceSize}</p>
                      <p className="text-xs text-muted-foreground">Audience Size</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.stats.sent}</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.stats.failed}</p>
                      <p className="text-xs text-muted-foreground">Failed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.stats.deliveryRate}%</p>
                      <p className="text-xs text-muted-foreground">Delivery Rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardShell>
    </AuthCheck>
  )
}
