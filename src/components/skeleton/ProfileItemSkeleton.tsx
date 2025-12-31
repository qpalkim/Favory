export default function ProfileItemSkeleton() {
  return (
    <div className="border-black-100 block w-full overflow-hidden border-b py-4 last:border-b-0 md:py-6 lg:max-w-[660px]">
      <div className="flex items-center gap-[10px] md:gap-4">
        <div className="bg-black-100/40 h-[32px] w-[32px] animate-pulse rounded-full md:h-[36px] md:w-[36px]" />
        <div className="min-w-0 flex-1">
          <div className="bg-black-100/40 h-[14px] w-[96px] animate-pulse rounded-md md:h-[16px] md:w-[140px]" />
          <div className="bg-black-100/40 mt-1 h-[12px] w-[160px] animate-pulse rounded-md md:h-[14px] md:w-[220px]" />
        </div>
      </div>
    </div>
  );
}
