import { Home, Receipt, BarChart3, Clock, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection?: string;
}

const Sidebar = ({ activeSection = "dashboard" }: SidebarProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "transactions", label: "Transactions", icon: Receipt },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "history", label: "History", icon: Clock },
  ];

  const generalItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help Center", icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-muted">
        <h1 className="text-2xl font-bold">FinTrack</h1>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-8">
          <h2 className="text-xs uppercase text-sidebar-foreground/60 mb-3 px-3">Menu</h2>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                    "hover:bg-sidebar-muted",
                    activeSection === item.id && "bg-sidebar-accent text-primary-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase text-sidebar-foreground/60 mb-3 px-3">General</h2>
          <ul className="space-y-1">
            {generalItems.map((item) => (
              <li key={item.id}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                    "hover:bg-sidebar-muted"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
