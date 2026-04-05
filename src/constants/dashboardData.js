export const DASHBOARD_DATA = {
  summary: [
    {
      id: "balance",
      title: "Current Balance",
      value: "$ 6,558.85", // (Total Income - Total Expense)
      amount: 6558.85,
      gradient: "from-orange-500 to-amber-600",
      trend: "up"
    },
    {
      id: "income",
      title: "Total Income",
      value: "$ 10,050.00", // (450 + 1200 + 5000 + 2500 + 900)
      amount: 10050.00,
      gradient: "from-teal-500 to-green-600",
      trend: "up"
    },
    {
      id: "expenses",
      title: "Total Expenses",
      value: "$ 3,491.15", // (120.50 + 85 + 210 + 300 + 45 + categorized items)
      amount: 3491.15,
      gradient: "from-yellow-500 to-amber-600",
      trend: "down"
    },
    {
      id: "savings",
      title: "Net Savings",
      value: "$ 6,558.85",
      amount: 6558.85,
      gradient: "from-blue-500 to-sky-600",
      trend: "up"
    }
  ],
  analytics: {
    monthlyTrend: [
      { day: '12', income: 450, expenses: 120.50 },
      { day: '13', income: 1200, expenses: 85 },
      { day: '14', income: 5000, expenses: 210 },
      { day: '15', income: 2500, expenses: 300 },
      { day: '16', income: 900, expenses: 45 }
    ],
   
    categories: [
      { name: 'Loan Deposit', value: 5000, color: '#3b82f6' },
      { name: 'Payroll', value: 2500, color: '#10b981' },
      { name: 'Sales', value: 1200, color: '#f59e0b' },
      { name: 'Consulting', value: 900, color: '#8b5cf6' },
      { name: 'Marketing', value: 450, color: '#ec4899' }
    ]
  },
  transactions: [
    { id: 1, name: "Morris Jhonson", date: "12/04/23", time: "10:46 AM", amount: "$450.00", status: "Completed", type: "income", avatar: "https://i.pravatar.cc/150?u=1", category: "Marketing" },
    { id: 2, name: "Jessica Parkar", date: "12/04/23", time: "11:30 AM", amount: "$120.50", status: "Completed", type: "expense", avatar: "https://i.pravatar.cc/150?u=2", category: "Office Supplies" },
    { id: 3, name: "Jenny Daniel", date: "13/04/23", time: "09:15 AM", amount: "$85.00", status: "Pending", type: "expense", avatar: "https://i.pravatar.cc/150?u=3", category: "General Banking" },
    { id: 4, name: "Alex Rivera", date: "13/04/23", time: "01:20 PM", amount: "$1,200.00", status: "Completed", type: "income", avatar: "https://i.pravatar.cc/150?u=4", category: "Sales" },
    { id: 5, name: "Sarah Connor", date: "14/04/23", time: "03:45 PM", amount: "$210.00", status: "Completed", type: "expense", avatar: "https://i.pravatar.cc/150?u=5", category: "Software Subscription" },
    { id: 6, name: "Union Bank", date: "14/04/23", time: "10:00 AM", amount: "$5,000.00", status: "Completed", type: "income", avatar: "https://i.pravatar.cc/150?u=6", category: "Loan Deposit" },
    { id: 7, name: "AR Shakir", date: "15/04/23", time: "12:00 PM", amount: "$300.00", status: "Pending", type: "expense", avatar: "https://i.pravatar.cc/150?u=7", category: "Freelance Payment" },
    { id: 8, name: "Salary Transary", date: "15/04/23", time: "08:30 AM", amount: "$2,500.00", status: "Completed", type: "income", avatar: "https://i.pravatar.cc/150?u=8", category: "Payroll" },
    { id: 9, name: "David Miller", date: "16/04/23", time: "02:10 PM", amount: "$45.00", status: "Completed", type: "expense", avatar: "https://i.pravatar.cc/150?u=9", category: "Travel" },
    { id: 10, name: "Emma Wilson", date: "16/04/23", time: "05:55 PM", amount: "$900.00", status: "Completed", type: "income", avatar: "https://i.pravatar.cc/150?u=10", category: "Consulting" }
  ]
};