"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => {
      setSelected(opt);
      onSelect(opt);
    },
  }));

  return (
    <Dropdown
      options={dropdownOptions}
      trigger={
        <button className="flex cursor-pointer items-center gap-2">
          <p className="hover-text-shadow text-sm font-semibold text-green-600 md:text-[15px] lg:text-lg">
            {selected.label}
          </p>
          <ChevronDown
            className="h-4 w-4 text-green-600 md:h-5 md:w-5 lg:h-6 lg:w-6"
            strokeWidth={2}
          />
        </button>
      }
    ></Dropdown>
  );
}
