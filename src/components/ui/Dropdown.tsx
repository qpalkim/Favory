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
}

export default function Dropdown({ options, trigger }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger ?? <EllipsisVertical color="#777777" />}
      </div>

      {isOpen && (
        <ul className="border-black-200 absolute right-0 z-10 mt-1 cursor-pointer list-none overflow-hidden rounded-lg border bg-white whitespace-nowrap drop-shadow-md md:mt-2">
          {options.map((option, idx) => (
            <li key={option.label}>
              <button
                className={`md:text-md text-black-500 hover:bg-black-10 w-full cursor-pointer px-5 py-2 text-center text-xs transition-colors duration-200 ease-in-out md:px-6 lg:text-[15px] ${
                  idx === 0 ? "rounded-t-lg" : ""
                } ${
                  idx === options.length - 1
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
