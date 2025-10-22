import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", income: 200, expense: 400 },
  { month: "Feb", income: 300, expense: 380 },
  { month: "Mar", income: 380, expense: 420 },
  { month: "Apr", income: 450, expense: 380 },
  { month: "May", income: 540, expense: 320 },
  { month: "Jun", income: 380, expense: 420 },
];

const AssetsChart = () => {
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
    </div>
  );
};

export default AssetsChart;
