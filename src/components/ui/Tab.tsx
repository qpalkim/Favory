"use client";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tabVariants = cva(
  "whitespace-nowrap flex items-center justify-center cursor-pointer p-3 md:p-4 transition-colors border-b-2 border-transparent duration-200 ease-in-out font-medium text-md md:text-lg",
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

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface TabProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tab({ items, value, onChange, className }: TabProps) {
  const activeTabItem = items.find((item) => item.id === value);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <div className="border-black-100 absolute bottom-0 left-0 w-full border-b" />
        <div
          className="relative mx-auto mb-4 flex max-w-[660px] justify-evenly"
          role="tablist"
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                tabVariants({
                  variant: value === item.id ? "active" : "default",
                }),
              )}
              role="tab"
              aria-selected={value === item.id}
              aria-controls={`tab-panel-${item.id}`}
              id={`tab-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
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
