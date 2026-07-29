import { cn } from "@/lib/utils";
import type { DashboardTab } from "@/types";

interface TabNavigationProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const tabs: { id: DashboardTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "polls", label: "Polls" },
  { id: "questions", label: "Questions" },
  { id: "analytics", label: "Analytics" },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
            activeTab === tab.id ? "tab-active" : "hover:bg-white/5"
          )}
          style={activeTab !== tab.id ? { color: "var(--text-muted)" } : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
