import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import Link from "next/link";

const buttonVariants = cva(
  "cursor-pointer transition-all duration-200 flex items-center justify-center whitespace-nowrap font-semibold",
  {
    variants: {
      variant: {
        primary:
          "bg-green-500 text-white  hover:bg-green-600 disabled:bg-black-100",
        outline: "bg-white text-green-600 border border-line-200",
      },
      size: {
        sm: "h-[32px] lg:h-[42px] text-sm lg:text-md px-3 rounded-[6px]",
        md: "h-[42px] lg:h-[48px] text-md lg:text-lg px-6 rounded-[8px]",
        lg: "w-full max-w-[580px] h-[52px] lg:h-[56px] text-lg lg:text-2lg rounded-[8px]",
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
  isRoundedFull?: boolean;
  href?: string;
  ariaLabel?: string;
  className?: string;
  target?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  isRoundedFull = false,
  href,
  ariaLabel,
  variant,
  size,
  className,
  target,
}: ButtonProps) {
  const finalClassName = cn(
    buttonVariants({ variant, size }),
    disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-md",
    isRoundedFull && "rounded-full",
    className,
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        target={target}
        className={finalClassName}
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
      disabled={disabled}
      className={finalClassName}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
