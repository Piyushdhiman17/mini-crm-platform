// Mock data functions for the CRM platform
// In a real application, these would fetch from a database

export function getCampaignStats() {
  // This is mock data - in a real app, this would come from your database
  return {
    totalCustomers: 1284,
    newCustomers: 24,
    activeSegments: 8,
    segmentGrowth: 12,
    campaignsSent: 32,
    deliveryRate: 92,
    recentActivity: 5,
    lastCampaignTime: "2 hours ago",
    recentCampaigns: [
      {
        id: "1",
        name: "Summer Sale Promotion",
        date: "Today",
        audienceSize: 450,
        sentRate: 94,
      },
      {
        id: "2",
        name: "Inactive Customer Win-back",
        date: "Yesterday",
        audienceSize: 320,
        sentRate: 91,
      },
      {
        id: "3",
        name: "New Product Announcement",
        date: "3 days ago",
        audienceSize: 514,
        sentRate: 96,
      },
    ],
  }
}

export function getCustomers(page = 1, limit = 10) {
  // Mock customer data
  const customers = Array.from({ length: 50 }, (_, i) => ({
    id: `cust_${i + 1}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    totalSpend: Math.floor(Math.random() * 10000) + 500,
    lastOrderDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
    orderCount: Math.floor(Math.random() * 20) + 1,
    status: Math.random() > 0.2 ? "active" : "inactive",
  }))

  const start = (page - 1) * limit
  const end = start + limit

  return {
    data: customers.slice(start, end),
    total: customers.length,
    page,
    limit,
    totalPages: Math.ceil(customers.length / limit),
  }
}

export function getSegments() {
  // Mock segment data
  return [
    {
      id: "seg_1",
      name: "High Value Customers",
      description: "Customers who spent over ₹10,000",
      audienceSize: 320,
      createdAt: "2023-05-15T10:30:00Z",
      rules: [{ field: "totalSpend", operator: ">", value: 10000 }],
    },
    {
      id: "seg_2",
      name: "Inactive Customers",
      description: "Customers who haven't ordered in 90 days",
      audienceSize: 450,
      createdAt: "2023-06-20T14:15:00Z",
      rules: [{ field: "lastOrderDate", operator: "<", value: "90days" }],
    },
    {
      id: "seg_3",
      name: "New Customers",
      description: "Customers who made their first purchase in the last 30 days",
      audienceSize: 215,
      createdAt: "2023-07-05T09:45:00Z",
      rules: [
        { field: "orderCount", operator: "=", value: 1 },
        { field: "lastOrderDate", operator: ">", value: "30days" },
      ],
    },
    {
      id: "seg_4",
      name: "Frequent Shoppers",
      description: "Customers with more than 5 orders",
      audienceSize: 180,
      createdAt: "2023-07-10T11:20:00Z",
      rules: [{ field: "orderCount", operator: ">", value: 5 }],
    },
  ]
}

export function getCampaigns() {
  // Mock campaign data
  return [
    {
      id: "camp_1",
      name: "Summer Sale Promotion",
      segmentId: "seg_1",
      segmentName: "High Value Customers",
      message: "Hi {name}, enjoy an exclusive 20% discount on our summer collection!",
      sentAt: "2023-07-15T10:30:00Z",
      status: "completed",
      stats: {
        audienceSize: 320,
        sent: 304,
        failed: 16,
        deliveryRate: 95,
      },
    },
    {
      id: "camp_2",
      name: "Inactive Customer Win-back",
      segmentId: "seg_2",
      segmentName: "Inactive Customers",
      message: "Hi {name}, we miss you! Here's 10% off your next order.",
      sentAt: "2023-07-10T14:15:00Z",
      status: "completed",
      stats: {
        audienceSize: 450,
        sent: 410,
        failed: 40,
        deliveryRate: 91.1,
      },
    },
    {
      id: "camp_3",
      name: "New Product Announcement",
      segmentId: "seg_4",
      segmentName: "Frequent Shoppers",
      message: "Hi {name}, check out our latest products just for you!",
      sentAt: "2023-07-05T09:45:00Z",
      status: "completed",
      stats: {
        audienceSize: 180,
        sent: 172,
        failed: 8,
        deliveryRate: 95.6,
      },
    },
  ]
}

export function getSegmentPreview(rules: any[]) {
  // In a real app, this would query your database with the rules
  // For now, we'll return a mock count
  return {
    count: Math.floor(Math.random() * 500) + 100,
    sampleCustomers: Array.from({ length: 5 }, (_, i) => ({
      id: `cust_${i + 1}`,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      totalSpend: Math.floor(Math.random() * 10000) + 500,
    })),
  }
}
