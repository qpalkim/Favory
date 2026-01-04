import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import Link from "next/link";

const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap font-semibold rounded-md",
  {
    variants: {
      variant: {
        primary:
          "bg-green-500 text-white hover:bg-green-600 disabled:bg-black-100",
        outline:
          "bg-white text-green-600 border border-green-600 disabled:opacity-40",
      },
      size: {
        sm: "h-[32px] md:h-[36px] text-xs md:text-sm px-3 w-max",
        md: "h-[36px] md:h-[38px] gap-[8px] text-sm md:text-md px-3 w-max",
        lg: "w-full h-[36px] md:h-[42px] text-md md:text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  ariaLabel?: string;
  target?: string;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  variant,
  size,
  children,
  onClick,
  type = "button",
  disabled = false,
  href,
  ariaLabel,
  target,
  isLoading = false,
  className,
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    disabled || isLoading
      ? "cursor-not-allowed pointer-events-none"
      : "hover:shadow-md",
    className,
  );

  const content = isLoading ? (
    <div className="flex items-center justify-center">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent md:h-5 md:w-5" />
    </div>
  ) : (
    children
  );

  if (href && !disabled && !isLoading) {
    return (
      <Link
        href={href}
        target={target}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
