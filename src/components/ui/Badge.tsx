import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const badgeVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-green-600 bg-green-10",
  {
    variants: {
      size: {
        sm: "text-sm px-[6px] py-1 md:text-md lg:text-lg",
        lg: "text-md px-[6px] py-1 lg:text-2lg font-medium",
      },
      clickable: {
        true: "hover:opacity-80 cursor-pointer",
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
}

export default function Badge({
  children,
  onClick,
  href,
  ariaLabel,
  size,
  clickable = true,
}: BadgeProps) {
  const classes = badgeVariants({ size, clickable });

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel}>
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
