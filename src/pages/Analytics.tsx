import Sidebar from "@/components/Sidebar";
import { Search, Bell, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const incomeExpenseData = [
  { month: "Jan", income: 8500, expense: 3200 },
  { month: "Feb", income: 9200, expense: 3800 },
  { month: "Mar", income: 8800, expense: 4200 },
  { month: "Apr", income: 10500, expense: 3800 },
  { month: "May", income: 11200, expense: 4500 },
  { month: "Jun", income: 9800, expense: 4200 },
];

const categoryData = [
  { name: "Food & Dining", value: 1200, color: "hsl(var(--stat-orange))" },
  { name: "Shopping", value: 800, color: "hsl(var(--stat-purple))" },
  { name: "Transportation", value: 500, color: "hsl(var(--stat-cyan))" },
  { name: "Bills & Utilities", value: 700, color: "hsl(var(--stat-green))" },
  { name: "Entertainment", value: 300, color: "hsl(var(--primary))" },
];

const monthlyTrendData = [
  { month: "Jan", income: 8500, expense: 3200 },
  { month: "Feb", income: 9200, expense: 3800 },
  { month: "Mar", income: 8800, expense: 4200 },
  { month: "Apr", income: 10500, expense: 3800 },
  { month: "May", income: 11200, expense: 4500 },
  { month: "Jun", income: 9800, expense: 4200 },
];

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection="analytics" />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Analytics</h1>
              <p className="text-sm text-muted-foreground">Insights into your financial data</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search analytics"
                  className="pl-10 pr-4 py-2 w-64 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-foreground" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold">
                EC
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Income vs Expense Line Chart */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-6">Income vs Expense</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incomeExpenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `₹${value}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(var(--chart-income))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-income))' }}
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expense" 
                  stroke="hsl(var(--chart-expense))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-expense))' }}
                  name="Expense"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category-wise Spending Pie Chart */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-6">Category-wise Spending</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trend Bar Chart */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-6">Monthly Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `₹${value}`}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="hsl(var(--chart-income))" name="Income" />
                  <Bar dataKey="expense" fill="hsl(var(--chart-expense))" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
