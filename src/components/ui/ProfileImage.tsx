"use client";
import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import defaultProfile from "@/assets/icon/defaultProfile.svg";

const profileImageVariants = cva("relative rounded-full shrink-0", {
  variants: {
    size: {
      sm: "w-[24px] h-[24px] md:w-[32px] md:h-[32px]",
      md: "w-[32px] h-[32px] md:w-[36px] md:h-[36px]",
      lg: "w-[60px] h-[60px] md:w-[85px] md:h-[85px]",
      xl: "w-[72px] h-[72px] md:w-[92px] md:h-[92px]",
    },
    clickable: {
      true: "cursor-pointer transition-opacity duration-200 hover:opacity-80",
      false: "cursor-default",
    },
  },
  defaultVariants: {
    size: "md",
    clickable: false,
  },
});

interface ProfileImageProps extends VariantProps<typeof profileImageVariants> {
  src: string | null;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  clickable?: boolean;
  className?: string;
}

export default function ProfileImage({
  src,
  onClick,
  size,
  clickable,
  className,
}: ProfileImageProps) {
  return (
    <div
      role="button"
      className={cn(profileImageVariants({ size, clickable }), className)}
      onClick={clickable ? onClick : undefined}
      aria-label={clickable ? "사용자 프로필 보기" : undefined}
      tabIndex={0}
    >
      <Image
        className="rounded-full object-cover"
        src={src || defaultProfile}
        alt="사용자 프로필 이미지"
        fill
        unoptimized
      />
    </div>
  );
}
