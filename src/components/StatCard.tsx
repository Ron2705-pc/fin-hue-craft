import { TrendingUp, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  amount: string;
  change: string;
  changeText: string;
  accentColor: "purple" | "orange" | "cyan" | "green";
}

const StatCard = ({ title, amount, change, changeText, accentColor }: StatCardProps) => {
  const accentClasses = {
    purple: "border-t-stat-purple",
    orange: "border-t-stat-orange",
    cyan: "border-t-stat-cyan",
    green: "border-t-stat-green",
  };

  return (
    <div className={cn(
      "bg-card rounded-xl p-6 shadow-card border-t-4 relative",
      accentClasses[accentColor]
    )}>
      <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        <MoreVertical className="w-5 h-5" />
      </button>

      <div className="mb-4">
        <h3 className="text-sm text-muted-foreground font-medium mb-1">{title}</h3>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground mb-2">{amount}</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-stat-green text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {change}
            </span>
            <span className="text-xs text-muted-foreground">{changeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
