"use client";
import { useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowLeft, ArrowRight } from "lucide-react";

const paginationVariants = cva(
  "flex items-center justify-center transition-colors cursor-pointer text-lg rounded-full w-9 h-9 md:w-10 md:h-10 md:text-[20px] hover:font-medium disabled:cursor-not-allowed",
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
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  const PAGE_COUNT = 5;
  const [firstPage, setFirstPage] = useState(1);

  useEffect(() => {
    if (totalPages <= PAGE_COUNT) {
      setFirstPage(1);
      return;
    }

    const currentGroup = Math.ceil(currentPage / PAGE_COUNT);
    setFirstPage((currentGroup - 1) * PAGE_COUNT + 1);
  }, [currentPage, PAGE_COUNT, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onChange(page);
  };

  const handlePrevPage = () => handlePageChange(currentPage - 1);

  const handleNextPage = () => handlePageChange(currentPage + 1);

  const pages = Array.from(
    { length: Math.min(PAGE_COUNT, totalPages - firstPage + 1) },
    (_, i) => firstPage + i,
  );

  return (
    <div className="flex items-center">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className="disabled:text-black-100 mr-5 flex cursor-pointer items-center justify-center rounded-full p-2 text-green-600 transition-colors hover:text-green-500 disabled:cursor-not-allowed md:mr-8"
      >
        <ArrowLeft
          aria-label="이전 페이지로 이동"
          className="h-6 w-6 md:h-8 md:w-8"
        />
      </button>

      <div className="flex items-center gap-2 md:gap-4">
        {pages.map((page) => (
          <button
            key={page}
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
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className="disabled:text-black-100 ml-5 flex cursor-pointer items-center justify-center rounded-full p-2 text-green-600 transition-colors hover:text-green-500 disabled:cursor-not-allowed md:ml-8"
      >
        <ArrowRight
          aria-label="다음 페이지로 이동"
          className="h-6 w-6 md:h-8 md:w-8"
        />
      </button>
    </div>
  );
}
