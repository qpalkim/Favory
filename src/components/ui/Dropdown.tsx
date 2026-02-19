"use client";
import { useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useClickOutside } from "@/lib/utils/useClickOutside";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Dropdown({ options, trigger, isOpen: controlledOpen, onOpenChange }: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? internalOpen;

  const setIsOpen = (open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  }

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger ?? (
          <EllipsisVertical
            aria-label="더보기 옵션"
            className="text-black-200 h-4 w-4 md:h-5 md:w-5"
          />
        )}
      </div>

      {isOpen && (
        <ul className="border-black-200 absolute right-0 z-10 mt-1 cursor-pointer list-none overflow-hidden rounded-lg border bg-white whitespace-nowrap drop-shadow-md">
          {options.map((option, idx) => (
            <li key={option.label}>
              <button
                className={`md:text-md text-black-500 hover:bg-black-10 w-full cursor-pointer px-5 py-2 text-center text-xs transition-colors duration-200 ease-in-out md:px-6 ${idx === 0 ? "rounded-t-lg" : ""
                  } ${idx === options.length - 1
                    ? "rounded-b-lg"
                    : "border-black-200 border-b"
                  }`}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
