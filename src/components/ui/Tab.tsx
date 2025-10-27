"use client";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tabVariants = cva(
  "whitespace-nowrap flex items-center justify-center cursor-pointer p-3 md:p-4 lg:p-6 transition-colors border-b-2 border-transparent duration-200 ease-in-out font-medium text-md md:text-lg lg:text-xl",
  {
    variants: {
      variant: {
        default: "text-black-200 hover:text-green-600 hover-text-shadow",
        active: "text-green-600 font-semibold border-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const tabListVariants = cva(
  "flex justify-evenly border-b border-black-100 gap-3",
);

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  items: TabItem[];
  className?: string;
}

export default function Tab({ items, className }: TabProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.id);
  const activeTabItem = items.find((item) => item.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(tabListVariants(), "mb-4")} role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              tabVariants({
                variant: activeTab === item.id ? "active" : "default",
              }),
            )}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`tab-panel-${item.id}`}
            id={`tab-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeTabItem && (
        <div
          id={`tab-panel-${activeTabItem.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTabItem.id}`}
        >
          {activeTabItem.content}
        </div>
      )}
    </div>
  );
}
