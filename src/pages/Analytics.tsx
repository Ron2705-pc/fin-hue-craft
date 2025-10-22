import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Search, Bell, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const Analytics = () => {
  const { toast } = useToast();
  const [incomeExpenseData, setIncomeExpenseData] = useState<MonthlyData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      // Process data for monthly income vs expense
      const monthlyMap: { [key: string]: { income: number; expense: number } } = {};
      const categoryMap: { [key: string]: number } = {};

      transactions?.forEach((transaction) => {
        const date = new Date(transaction.date);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        
        if (!monthlyMap[monthKey]) {
          monthlyMap[monthKey] = { income: 0, expense: 0 };
        }

        if (transaction.type === 'income') {
          monthlyMap[monthKey].income += Number(transaction.amount);
        } else {
          monthlyMap[monthKey].expense += Number(transaction.amount);
          categoryMap[transaction.category] = (categoryMap[transaction.category] || 0) + Number(transaction.amount);
        }
      });

      const monthlyData: MonthlyData[] = Object.entries(monthlyMap).map(([month, data]) => ({
        month,
        ...data,
      }));

      const colors = ["hsl(var(--stat-orange))", "hsl(var(--stat-purple))", "hsl(var(--stat-cyan))", "hsl(var(--stat-green))", "hsl(var(--primary))"];
      const categoryDataArray: CategoryData[] = Object.entries(categoryMap).map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }));

      setIncomeExpenseData(monthlyData);
      setCategoryData(categoryDataArray);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
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
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          ) : incomeExpenseData.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No transaction data available. Add some transactions to see analytics.</p>
            </div>
          ) : (
            <>
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
                <BarChart data={incomeExpenseData}>
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
          </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;
