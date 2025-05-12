import DashboardHeader from "@/components/dashboard-header"
import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getSegments } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow, parseISO } from "date-fns"
import { AuthCheck } from "@/components/auth-check"

export default function SegmentsPage() {
  const segments = getSegments()

  return (
    <AuthCheck>
      <DashboardHeader heading="Audience Segments" text="Create and manage your customer segments">
        <Link href="/segments/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Segment
          </Button>
        </Link>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => (
            <Card key={segment.id}>
              <CardHeader>
                <CardTitle>{segment.name}</CardTitle>
                <CardDescription>{segment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Audience Size:</span>
                    <Badge variant="secondary">{segment.audienceSize} customers</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Created:</span>
                    <span className="text-sm">
                      {formatDistanceToNow(parseISO(segment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Link href={`/segments/${segment.id}/campaign`}>
                  <Button size="sm">Create Campaign</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DashboardShell>
    </AuthCheck>
  )
}
