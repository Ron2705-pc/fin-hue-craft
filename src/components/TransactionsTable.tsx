import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight } from "lucide-react";
import AddExpenseModal from "./modals/AddExpenseModal";
import AddBudgetModal from "./modals/AddBudgetModal";
import AddIncomeModal from "./modals/AddIncomeModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  description: string | null;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

const TransactionsTable = () => {
  const { toast } = useToast();
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      const mappedTransactions: Transaction[] = (data || []).map(t => ({
        id: t.id,
        description: t.description,
        date: t.date,
        category: t.category,
        amount: Number(t.amount),
        type: t.type as "income" | "expense",
      }));
      
      setTransactions(mappedTransactions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = (success: boolean) => {
    setExpenseModalOpen(false);
    setBudgetModalOpen(false);
    setIncomeModalOpen(false);
    if (success) {
      fetchTransactions();
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Latest Transactions</h2>
        <button className="text-sm text-primary hover:underline">See All</button>
      </div>

      <div className="flex gap-3 mb-6">
        <Button 
          onClick={() => setExpenseModalOpen(true)}
          className="bg-stat-orange hover:bg-stat-orange/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
        <Button 
          onClick={() => setBudgetModalOpen(true)}
          className="bg-stat-cyan hover:bg-stat-cyan/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Budget
        </Button>
        <Button 
          onClick={() => setIncomeModalOpen(true)}
          className="bg-stat-green hover:bg-stat-green/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Income
        </Button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No transactions yet. Add your first transaction above.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const date = new Date(transaction.date);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                
                return (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground">{transaction.description || 'No description'}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{formattedDate} - {formattedTime}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-foreground">₹{Number(transaction.amount).toLocaleString()}</span>
                        <ArrowUpRight className={`w-4 h-4 ${
                          transaction.type === "income" ? "text-stat-green" : "text-stat-orange"
                        }`} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <AddExpenseModal open={expenseModalOpen} onOpenChange={(open) => !open && handleModalClose(false)} />
      <AddBudgetModal open={budgetModalOpen} onOpenChange={(open) => !open && handleModalClose(false)} />
      <AddIncomeModal open={incomeModalOpen} onOpenChange={(open) => !open && handleModalClose(false)} />
    </div>
  );
};

export default TransactionsTable;
