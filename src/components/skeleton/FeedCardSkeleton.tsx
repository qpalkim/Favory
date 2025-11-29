export default function FeedCardSkeleton() {
  return (
    <div className="relative flex aspect-square h-full min-h-[160px] w-full min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="relative flex-1">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 w-full p-3 md:p-4 lg:p-5">
            <div className="bg-black-100/40 h-[15px] w-[72px] animate-pulse rounded-lg md:h-[18px] md:w-[124px]" />
            <div className="bg-black-100/40 mt-1 h-[14px] w-[52px] animate-pulse rounded-lg md:h-[15px] md:w-[92px]" />
          </div>
        </div>
        <div className="w-full flex-col justify-between bg-white p-3 md:p-4 lg:p-5">
          <div className="bg-black-100/40 h-[15px] w-[100px] animate-pulse rounded-lg md:h-[18px] md:w-[148px]" />
          <div className="bg-black-100/40 mt-1 hidden h-[14px] w-[52px] animate-pulse rounded-lg md:block md:h-[15px] md:w-[92px]" />
          <div className="bg-black-100/40 mt-1 h-[24px] w-[24px] animate-pulse rounded-full md:mt-2 md:h-[32px] md:w-[32px]" />
        </div>
      </div>
    </div>
  );
}
