"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, RefreshCw, Send } from "lucide-react"

type Segment = {
  id: string
  name: string
  description: string
  audienceSize: number
  createdAt: string
  rules: any[]
}

export default function CampaignCreator({ segment }: { segment: Segment }) {
  const [campaignName, setCampaignName] = useState(`${segment.name} Campaign`)
  const [message, setMessage] = useState("")
  const [objective, setObjective] = useState("")
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleGenerateMessages = () => {
    if (!objective) {
      toast({
        title: "Error",
        description: "Please enter a campaign objective",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Mock message generation instead of async fetch
    setTimeout(() => {
      const mockMessages = [
        `Hi {name}, we miss you! Here's 10% off your next order.`,
        `Hi {name}, it's been a while! Come back and enjoy 10% off today.`,
        `Hi {name}, we've got something special for you - 10% off your next purchase!`,
      ]

      setSuggestedMessages(mockMessages)
      setIsGenerating(false)
    }, 800)
  }

  const handleSelectMessage = (msg: string) => {
    setMessage(msg)
  }

  const handleSendCampaign = () => {
    if (!campaignName) {
      toast({
        title: "Error",
        description: "Please enter a campaign name",
        variant: "destructive",
      })
      return
    }

    if (!message) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock campaign sending instead of async fetch
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Campaign sent successfully",
      })

      // Redirect to the campaigns page
      router.push("/campaigns")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input id="name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
      </div>

      <div className="flex items-center justify-between bg-muted p-4 rounded-md">
        <div>
          <h3 className="font-medium">Target Audience</h3>
          <p className="text-sm text-muted-foreground">{segment.description}</p>
        </div>
        <Badge>{segment.audienceSize} customers</Badge>
      </div>

      <Tabs defaultValue="manual">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Write Message</TabsTrigger>
          <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Hi {name}, here's 10% off on your next order!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Use {"{name}"} to personalize the message with the customer's name.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="ai" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="objective">Campaign Objective</Label>
            <Input
              id="objective"
              placeholder="e.g., Win back inactive customers"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerateMessages} disabled={isGenerating || !objective} variant="outline">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Message Variants
              </>
            )}
          </Button>

          {suggestedMessages.length > 0 && (
            <div className="space-y-3 mt-4">
              <Label>Suggested Messages</Label>
              {suggestedMessages.map((msg, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer hover:border-primary ${message === msg ? "border-primary" : ""}`}
                  onClick={() => handleSelectMessage(msg)}
                >
                  <CardContent className="p-4">
                    <p>{msg}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSendCampaign} disabled={isLoading || !message || !campaignName}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Campaign
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
