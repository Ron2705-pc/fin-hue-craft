import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import AssetsChart from "@/components/AssetsChart";
import TransactionsTable from "@/components/TransactionsTable";
import { Search, Bell, Settings } from "lucide-react";

const Index = () => {
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
              amount="$8500"
              change="38%"
              changeText="Increased form last month"
              accentColor="purple"
            />
            <StatCard
              title="Total Spending"
              amount="$3500"
              change="75%"
              changeText="Increased form last month"
              accentColor="orange"
            />
            <StatCard
              title="Spending Goal"
              amount="$9254"
              change="18%"
              changeText="Increased form last month"
              accentColor="cyan"
            />
            <StatCard
              title="Total Transactions"
              amount="$17000"
              change="88%"
              changeText="Increased form last month"
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
