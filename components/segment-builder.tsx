"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type Rule = {
  id: string
  field: string
  operator: string
  value: string
}

type RuleGroup = {
  id: string
  combinator: "and" | "or"
  rules: Rule[]
}

export default function SegmentBuilder() {
  const [segmentName, setSegmentName] = useState("")
  const [segmentDescription, setSegmentDescription] = useState("")
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([
    {
      id: "group-1",
      combinator: "and",
      rules: [{ id: "rule-1", field: "totalSpend", operator: ">", value: "" }],
    },
  ])
  const [activeTab, setActiveTab] = useState("builder")
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("")
  const [previewData, setPreviewData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const fields = [
    { id: "totalSpend", label: "Total Spend" },
    { id: "lastOrderDate", label: "Last Order Date" },
    { id: "orderCount", label: "Order Count" },
    { id: "status", label: "Status" },
  ]

  const operators = [
    { id: ">", label: "Greater than" },
    { id: "<", label: "Less than" },
    { id: "=", label: "Equal to" },
    { id: "!=", label: "Not equal to" },
    { id: "contains", label: "Contains" },
  ]

  const addRuleGroup = () => {
    setRuleGroups([
      ...ruleGroups,
      {
        id: `group-${Date.now()}`,
        combinator: "and",
        rules: [
          {
            id: `rule-${Date.now()}`,
            field: "totalSpend",
            operator: ">",
            value: "",
          },
        ],
      },
    ])
  }

  const addRule = (groupId: string) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            rules: [
              ...group.rules,
              {
                id: `rule-${Date.now()}`,
                field: "totalSpend",
                operator: ">",
                value: "",
              },
            ],
          }
        }
        return group
      }),
    )
  }

  const removeRule = (groupId: string, ruleId: string) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            rules: group.rules.filter((rule) => rule.id !== ruleId),
          }
        }
        return group
      }),
    )
  }

  const removeRuleGroup = (groupId: string) => {
    setRuleGroups(ruleGroups.filter((group) => group.id !== groupId))
  }

  const updateRule = (groupId: string, ruleId: string, field: string, value: string) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            rules: group.rules.map((rule) => {
              if (rule.id === ruleId) {
                return { ...rule, [field]: value }
              }
              return rule
            }),
          }
        }
        return group
      }),
    )
  }

  const updateGroupCombinator = (groupId: string, value: "and" | "or") => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return { ...group, combinator: value }
        }
        return group
      }),
    )
  }

  const handlePreview = () => {
    setIsLoading(true)

    // Mock preview data instead of async fetch
    setTimeout(() => {
      const mockPreview = {
        count: Math.floor(Math.random() * 500) + 100,
        sampleCustomers: Array.from({ length: 5 }, (_, i) => ({
          id: `cust_${i + 1}`,
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          totalSpend: Math.floor(Math.random() * 10000) + 500,
        })),
      }

      setPreviewData(mockPreview)
      setIsLoading(false)
    }, 500)
  }

  const handleNaturalLanguageConversion = () => {
    if (!naturalLanguageInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description of your segment",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock AI conversion instead of async fetch
    setTimeout(() => {
      // Generate a simple rule based on the input
      const newName = naturalLanguageInput.split(" ").slice(0, 3).join(" ")

      setSegmentName(newName)
      setSegmentDescription(naturalLanguageInput)

      // Create a simple rule based on the input
      const newRuleGroups = [
        {
          id: "group-1",
          combinator: "and",
          rules: [
            {
              id: "rule-1",
              field: "totalSpend",
              operator: ">",
              value: "5000",
            },
          ],
        },
      ]

      if (naturalLanguageInput.toLowerCase().includes("inactive")) {
        newRuleGroups[0].rules.push({
          id: "rule-2",
          field: "lastOrderDate",
          operator: "<",
          value: "90",
        })
      }

      setRuleGroups(newRuleGroups)
      setActiveTab("builder")

      toast({
        title: "Success",
        description: "Rules generated from your description",
      })

      setIsLoading(false)
    }, 800)
  }

  const handleSave = () => {
    if (!segmentName) {
      toast({
        title: "Error",
        description: "Please enter a segment name",
        variant: "destructive",
      })
      return
    }

    if (ruleGroups.some((group) => group.rules.length === 0)) {
      toast({
        title: "Error",
        description: "All rule groups must have at least one rule",
        variant: "destructive",
      })
      return
    }

    if (ruleGroups.some((group) => group.rules.some((rule) => !rule.value))) {
      toast({
        title: "Error",
        description: "All rules must have a value",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock save instead of async fetch
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Segment saved successfully",
      })

      // Redirect to the segments page
      router.push("/segments")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Segment Name</Label>
          <Input
            id="name"
            placeholder="High Value Customers"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Customers who spent over ₹10,000"
            value={segmentDescription}
            onChange={(e) => setSegmentDescription(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">Rule Builder</TabsTrigger>
          <TabsTrigger value="natural">Natural Language</TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="space-y-4">
          {ruleGroups.map((group, groupIndex) => (
            <Card key={group.id} className="relative">
              <CardContent className="pt-6">
                {groupIndex > 0 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-2">
                    <Badge variant="outline">OR</Badge>
                  </div>
                )}
                <div className="space-y-4">
                  {group.rules.map((rule, ruleIndex) => (
                    <div key={rule.id} className="flex items-end gap-2 flex-wrap md:flex-nowrap">
                      {ruleIndex > 0 && (
                        <div className="w-full md:w-auto flex justify-center">
                          <Select
                            value={group.combinator}
                            onValueChange={(value) => updateGroupCombinator(group.id, value as "and" | "or")}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="and">AND</SelectItem>
                              <SelectItem value="or">OR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="flex-1">
                        <Select
                          value={rule.field}
                          onValueChange={(value) => updateRule(group.id, rule.id, "field", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {fields.map((field) => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Select
                          value={rule.operator}
                          onValueChange={(value) => updateRule(group.id, rule.id, "operator", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {operators.map((operator) => (
                              <SelectItem key={operator.id} value={operator.id}>
                                {operator.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Value"
                          value={rule.value}
                          onChange={(e) => updateRule(group.id, rule.id, "value", e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRule(group.id, rule.id)}
                        disabled={group.rules.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => addRule(group.id)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Rule
                    </Button>
                    {ruleGroups.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeRuleGroup(group.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Group
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addRuleGroup}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add OR Group
          </Button>
        </TabsContent>
        <TabsContent value="natural" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="natural-language">Describe your audience in natural language</Label>
            <Textarea
              id="natural-language"
              placeholder="e.g., Customers who spent over ₹10,000 and haven't ordered in the last 90 days"
              value={naturalLanguageInput}
              onChange={(e) => setNaturalLanguageInput(e.target.value)}
              rows={4}
            />
            <Button onClick={handleNaturalLanguageConversion} disabled={isLoading}>
              Convert to Rules
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreview} disabled={isLoading}>
          <Users className="mr-2 h-4 w-4" />
          Preview Audience
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          Save Segment
        </Button>
      </div>

      {previewData && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Estimated audience size:</span>
                <Badge>{previewData.count} customers</Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Sample customers:</h4>
                <div className="space-y-2">
                  {previewData.sampleCustomers.map((customer: any) => (
                    <div key={customer.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p>{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                      <div>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(customer.totalSpend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
