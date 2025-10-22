import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface ChartData {
  month: string;
  income: number;
  expense: number;
}

const AssetsChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      const monthlyMap: { [key: string]: { income: number; expense: number } } = {};

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
        }
      });

      const chartData: ChartData[] = Object.entries(monthlyMap).map(([month, data]) => ({
        month,
        ...data,
      }));

      setData(chartData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Your Assets</h2>
        <select className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">Loading chart data...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No data available yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
      )}
    </div>
  );
};

export default AssetsChart;
