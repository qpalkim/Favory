"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useClickOutside } from "@/lib/utils/useClickOutside";

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export default function Modal({ children, onClose, className }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/32"
    >
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto w-[320px] rounded-2xl bg-white p-6 md:w-[419px] md:rounded-[20px] md:p-8",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
