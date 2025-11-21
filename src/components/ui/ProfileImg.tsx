"use client";
import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import defaultProfile from "@/assets/icon/defaultProfile.svg";

const profileImgVariants = cva("relative rounded-full", {
  variants: {
    size: {
      sm: "w-[24px] h-[24px] md:w-[32px] md:h-[32px]",
      md: "w-[32px] h-[32px] md:w-[36px] md:h-[36px]",
      lg: "w-[60px] h-[60px] md:w-[85px] md:h-[85px]",
      xl: "w-[72px] h-[72px] md:w-[112px] md:h-[112px]",
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

interface ProfileImgProps extends VariantProps<typeof profileImgVariants> {
  src: string | null;
  onClick?: () => void;
  clickable?: boolean;
  className?: string;
}

export default function ProfileImg({
  src,
  onClick,
  size,
  clickable,
  className,
}: ProfileImgProps) {
  return (
    <div
      className={cn(profileImgVariants({ size, clickable }), className)}
      onClick={clickable ? onClick : undefined}
    >
      <Image
        className="rounded-full object-cover"
        src={src || defaultProfile}
        alt="프로필 이미지"
        fill
      />
    </div>
  );
}
