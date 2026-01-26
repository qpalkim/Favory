"use client";
import { useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowLeft, ArrowRight } from "lucide-react";

const paginationVariants = cva(
  "flex items-center justify-center transition-colors cursor-pointer text-sm rounded-lg md:rounded-xl w-8 h-8 md:w-9 md:h-9 md:text-md hover:font-medium disabled:opacity-40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "text-black-500 hover:bg-green-500 hover:text-white ",
        active: "bg-green-600 text-white font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PaginationProps extends VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}

const PAGE_COUNT = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
  disabled,
}: PaginationProps) {
  const [firstPage, setFirstPage] = useState(1);

  useEffect(() => {
    if (totalPages <= PAGE_COUNT) {
      setFirstPage(1);
      return;
    }

    const currentGroup = Math.ceil(currentPage / PAGE_COUNT);
    setFirstPage((currentGroup - 1) * PAGE_COUNT + 1);
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onChange(page);
  };

  const pages = Array.from(
    { length: Math.min(PAGE_COUNT, totalPages - firstPage + 1) },
    (_, i) => firstPage + i,
  );

  return (
    <nav aria-label="페이지네이션" className="flex items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        aria-label="이전 페이지로 이동"
        className="mr-4 cursor-pointer text-green-600 transition-colors hover:text-green-500 disabled:hidden md:mr-6"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden />
      </button>

      <div className="flex items-center gap-2 md:gap-4">
        {pages.map((page) => (
          <button
            key={page}
            disabled={disabled}
            onClick={() => handlePageChange(page)}
            className={paginationVariants({
              variant: currentPage === page ? "active" : "default",
            })}
            aria-label={`${page} 페이지`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        aria-label="다음 페이지로 이동"
        className="ml-4 cursor-pointer text-green-600 transition-colors hover:text-green-500 disabled:hidden md:ml-6"
      >
        <ArrowRight className="h-5 w-5" aria-hidden />
      </button>
    </nav>
  );
}
