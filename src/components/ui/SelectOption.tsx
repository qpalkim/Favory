"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";
import Dropdown from "./Dropdown";

export interface Option {
  label: string;
  value?: string | number;
}

interface SelectOptionProps {
  options: Option[];
  onSelect: (option: Option) => void;
  disabled?: boolean;
}

export default function SelectOption({
  options = [],
  onSelect,
  disabled,
}: SelectOptionProps) {
  const [selected, setSelected] = useState<Option>(
    options.find((opt) => opt.label === "최신순") || options[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => {
      if (disabled) return;
      setSelected(opt);
      onSelect(opt);
      setIsOpen(false);
    },
  }));

  return (
    <Dropdown
      options={dropdownOptions}
      trigger={
        <button
          disabled={disabled}
          className={cn(
            "flex items-center gap-2",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
          onClick={() => {
            if (disabled) return;
            setIsOpen(!isOpen);
          }}
        >
          <p
            className={cn(
              "text-sm font-semibold md:text-[15px]",
              disabled ? "text-black-100" : "text-green-600",
            )}
          >
            {selected.label}
          </p>
          {isOpen ? (
            <ChevronUp
              className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                disabled ? "text-black-100" : "text-green-600",
              )}
              strokeWidth={2}
            />
          ) : (
            <ChevronDown
              className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                disabled ? "text-black-100" : "text-green-600",
              )}
              strokeWidth={2}
            />
          )}
        </button>
      }
    ></Dropdown>
  );
}
