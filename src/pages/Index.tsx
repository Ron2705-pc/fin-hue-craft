import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import AssetsChart from "@/components/AssetsChart";
import TransactionsTable from "@/components/TransactionsTable";
import { Search, Bell, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalSpending: 0,
    spendingGoal: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id);

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (transactions) {
        const income = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        
        const spending = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0);

        setStats({
          totalIncome: income,
          totalSpending: spending,
          spendingGoal: Number(profile?.spending_goal || 0),
          totalTransactions: transactions.length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection="dashboard" />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Welcome, Ethan Cole 👋</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search anything"
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Income"
              amount={`₹${stats.totalIncome.toLocaleString()}`}
              change="--"
              changeText="From all time"
              accentColor="purple"
            />
            <StatCard
              title="Total Spending"
              amount={`₹${stats.totalSpending.toLocaleString()}`}
              change="--"
              changeText="From all time"
              accentColor="orange"
            />
            <StatCard
              title="Spending Goal"
              amount={`₹${stats.spendingGoal.toLocaleString()}`}
              change="--"
              changeText="Current goal"
              accentColor="cyan"
            />
            <StatCard
              title="Total Transactions"
              amount={stats.totalTransactions.toString()}
              change="--"
              changeText="All transactions"
              accentColor="green"
            />
          </div>

          {/* Chart */}
          <AssetsChart />

          {/* Transactions Table */}
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
};

export default Index;
