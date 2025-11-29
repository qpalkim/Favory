"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Dropdown from "./Dropdown";

export interface Option {
  label: string;
  value?: string | number;
}

interface SelectOptionProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export default function SelectOption({
  options = [],
  onSelect,
}: SelectOptionProps) {
  const [selected, setSelected] = useState<Option>(
    options.find((opt) => opt.label === "최신순") || options[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => {
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
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-sm font-semibold text-green-600 md:text-[15px]">
            {selected.label}
          </p>
          {isOpen ? (
            <ChevronUp
              className="h-4 w-4 text-green-600 md:h-5 md:w-5"
              strokeWidth={2}
            />
          ) : (
            <ChevronDown
              className="h-4 w-4 text-green-600 md:h-5 md:w-5"
              strokeWidth={2}
            />
          )}
        </button>
      }
    ></Dropdown>
  );
}
