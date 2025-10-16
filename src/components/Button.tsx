import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import Link from "next/link";

const buttonVariants = cva(
  " flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out whitespace-nowrap font-semibold rounded-md",
  {
    variants: {
      variant: {
        primary:
          "bg-green-500 text-white hover:bg-green-600 disabled:bg-black-100",
        outline: "bg-white text-green-600 border border-green-600",
      },
      size: {
        sm: "h-[32px] md:h-[36px] lg:h-[42px] text-md md:text-[15px] lg:text-lg px-3 md:px-4 lg:px-6 w-max",
        md: "h-[36px] md:h-[38px] lg:h-[42px] gap-[8px] text-md md:text-[15px] lg:text-lg px-3 lg:px-4 w-max",
        lg: "w-full h-[38px] md:h-[42px] lg:h-[52px] text-md md:text-[15px] lg:text-2lg",
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
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  href,
  ariaLabel,
  target,
  className,
  variant,
  size,
}: ButtonProps) {
  const finalClassName = cn(
    buttonVariants({ variant, size }),
    disabled ? "cursor-not-allowed" : "hover:shadow-md",
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
