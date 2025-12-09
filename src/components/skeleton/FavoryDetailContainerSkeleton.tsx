export default function FavoryDetailContainerSkeleton() {
  return (
    <div className="mx-auto flex justify-between gap-6 lg:max-w-[1200px] lg:px-6">
      <div className="relative w-full lg:max-w-[660px]">
        <div className="bg-black-100/40 max-h-[375px] animate-pulse overflow-hidden pb-[100%] md:max-h-[768px] lg:max-h-[660px]" />
        <div className="relative z-10 -mt-6 space-y-6 rounded-t-3xl bg-white p-6 shadow-lg md:-mt-18 md:p-8">
          <div className="flex items-center gap-2">
            <div className="bg-black-100/40 h-[28px] w-[86px] animate-pulse rounded-md md:h-[37px] md:w-[114px]" />
            <div className="bg-black-100/40 h-[24px] w-[70px] animate-pulse rounded-md md:w-[82px]" />
          </div>
          <div className="space-y-3">
            <div className="bg-black-100/40 h-6 w-[70%] animate-pulse rounded-md" />
            <div className="bg-black-100/40 h-5 w-[50%] animate-pulse rounded-md" />
          </div>
          <hr className="border-black-100" />
          <div className="bg-black-100/40 h-6 w-[60%] animate-pulse rounded-md" />
          <div className="mb-[52px] space-y-2 md:mb-[96px]">
            <div className="bg-black-100/40 h-5 w-full animate-pulse rounded-md" />
            <div className="bg-black-100/40 h-5 w-[90%] animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
