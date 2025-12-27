import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";

const badgeVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-green-600 bg-green-10",
  {
    variants: {
      size: {
        sm: "text-xs px-[6px] py-1 md:text-sm",
        lg: "text-md px-[6px] py-1 font-medium",
      },
      clickable: {
        true: "cursor-pointer transition-opacity duration-200 hover:opacity-80",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      size: "sm",
      clickable: true,
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  ariaLabel?: string;
  clickable?: boolean;
  className?: string;
}

export default function Badge({
  children,
  onClick,
  href,
  ariaLabel,
  size,
  clickable = true,
  className,
}: BadgeProps) {
  const classes = clsx(badgeVariants({ size, clickable }), className);

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={clickable ? onClick : undefined}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
