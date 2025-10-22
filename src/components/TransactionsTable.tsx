import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight } from "lucide-react";
import AddExpenseModal from "./modals/AddExpenseModal";
import AddBudgetModal from "./modals/AddBudgetModal";
import AddIncomeModal from "./modals/AddIncomeModal";

interface Transaction {
  id: string;
  title: string;
  date: string;
  time: string;
  medium: string;
  category: string;
  amount: string;
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  { id: "1", title: "Grocery Shopping", date: "22 Sep", time: "10:AM", medium: "Visa", category: "Food & Dining", amount: "65,022", type: "expense" },
  { id: "2", title: "Freelance Payment", date: "21 Sep", time: "10:AM", medium: "Paypal", category: "Income", amount: "65,022", type: "income" },
  { id: "3", title: "Subscription Service", date: "20 Sep", time: "10:AM", medium: "Payoneer", category: "Bills & Utilities", amount: "65,022", type: "expense" },
  { id: "4", title: "Salary Deposit", date: "19 Sep", time: "10:AM", medium: "Visa", category: "Income", amount: "65,022", type: "income" },
  { id: "5", title: "Online Purchase", date: "18 Sep", time: "10:AM", medium: "Payoneer", category: "Shopping", amount: "65,022", type: "expense" },
];

const TransactionsTable = () => {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);

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
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Medium</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">{transaction.title}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{transaction.date} - {transaction.time}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.medium === "Visa" ? "bg-stat-purple/10 text-stat-purple" :
                    transaction.medium === "Paypal" ? "bg-stat-cyan/10 text-stat-cyan" :
                    "bg-stat-orange/10 text-stat-orange"
                  }`}>
                    {transaction.medium}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{transaction.category}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm font-semibold text-foreground">₹{transaction.amount}</span>
                    <ArrowUpRight className={`w-4 h-4 ${
                      transaction.type === "income" ? "text-stat-green" : "text-stat-orange"
                    }`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddExpenseModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
      <AddBudgetModal open={budgetModalOpen} onOpenChange={setBudgetModalOpen} />
      <AddIncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
    </div>
  );
};

export default TransactionsTable;
