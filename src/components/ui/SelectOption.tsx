"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(
    options.find((opt) => opt.label === "최신순") || options[0],
  );

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
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="정렬 옵션 선택"
          className={cn(
            "flex items-center gap-2",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
          onClick={() => {
            if (disabled) return;
            setIsOpen(!isOpen);
          }}
        >
          <span
            className={cn(
              "text-sm font-semibold md:text-[15px]",
              disabled ? "text-black-100" : "text-green-600",
            )}
          >
            {selected.label}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 ease-out",
              disabled ? "text-black-100" : "text-green-600",
              isOpen && "rotate-180",
            )}
            aria-hidden
            strokeWidth={2}
          />
        </button>
      }
    ></Dropdown>
  );
}
