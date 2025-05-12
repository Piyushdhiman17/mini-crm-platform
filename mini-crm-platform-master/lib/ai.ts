// This file now contains mock implementations that don't use async/await directly
// In a real application, these would be proper API calls

export function createSegmentFromNaturalLanguage(input: string) {
  // Mock implementation
  const result = {
    name: input.split(" ").slice(0, 3).join(" "),
    description: input,
    ruleGroups: [
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
    ],
  }

  if (input.toLowerCase().includes("inactive")) {
    result.ruleGroups[0].rules.push({
      id: "rule-2",
      field: "lastOrderDate",
      operator: "<",
      value: "90",
    })
  }

  return result
}

export function generateCampaignInsights(campaignData: any) {
  // Mock implementation
  return (
    "Your campaign reached " +
    campaignData.stats.audienceSize +
    " users. " +
    campaignData.stats.sent +
    " messages were delivered. " +
    "The delivery rate was " +
    campaignData.stats.deliveryRate +
    "%."
  )
}

export function suggestMessageVariants(objective: string, segmentName: string) {
  // Mock implementation
  return [
    `Hi {name}, we miss you! Here's 10% off your next order.`,
    `Hi {name}, it's been a while! Come back and enjoy 10% off today.`,
    `Hi {name}, we've got something special for you - 10% off your next purchase!`,
  ]
}
