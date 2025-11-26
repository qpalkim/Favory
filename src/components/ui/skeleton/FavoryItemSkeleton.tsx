interface FavoryItemSkeletonProps {
  profile?: boolean;
}

export default function FavoryItemSkeleton({
  profile = false,
}: FavoryItemSkeletonProps) {
  return (
    <div className="border-black-100 flex gap-[10px] overflow-hidden border-b py-4 last:border-b-0 md:gap-4 md:py-6 lg:max-w-[660px]">
      {!profile && (
        <div className="bg-black-100 h-[24px] w-[24px] animate-pulse rounded-full md:h-[32px] md:w-[32px]" />
      )}
      <div className="min-w-0 flex-1">
        <div className="bg-black-100 h-[15px] w-[92px] animate-pulse rounded-md md:h-[18px] md:w-[148px]" />
        <div className="bg-black-100 mt-1 h-[14px] w-[52px] animate-pulse rounded-md md:h-[15px] md:w-[112px]" />
        <div className="bg-black-100 mt-2 h-[15px] w-[124px] animate-pulse rounded-lg md:h-[18px] md:w-[200px]" />
        <div className="bg-black-100 mt-1 h-[14px] w-[72px] animate-pulse rounded-lg md:h-[15px] md:w-[92px]" />
      </div>
      <div className="bg-black-100 flex h-[72px] w-[72px] animate-pulse flex-col items-center justify-center rounded-sm object-cover md:h-[92px] md:w-[92px] md:rounded-md" />
    </div>
  );
}
