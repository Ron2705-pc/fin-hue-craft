import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddBudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBudgetModal = ({ open, onOpenChange }: AddBudgetModalProps) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Budget set successfully!");
    setCategory("");
    setAmount("");
    setPeriod("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Budget Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget-category">Category</Label>
            <Input
              id="budget-category"
              placeholder="e.g., Monthly Expenses"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget-amount">Budget Amount</Label>
            <Input
              id="budget-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget-period">Period</Label>
            <Input
              id="budget-period"
              placeholder="e.g., Monthly, Weekly"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-stat-cyan hover:bg-stat-cyan/90">
            Set Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetModal;
