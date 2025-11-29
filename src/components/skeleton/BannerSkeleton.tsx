export default function BannerSkeleton() {
  return (
    <div className="relative h-[222px] w-full overflow-hidden bg-gradient-to-b from-green-600 via-green-500 to-green-100 px-6 md:h-[416px] md:px-8 lg:h-[456px] lg:px-0">
      <div className="relative z-10 mx-auto flex h-full w-full items-center justify-between lg:max-w-[1000px]">
        <div className="flex flex-col space-y-2">
          <div className="bg-black-100/40 h-3 w-24 animate-pulse rounded md:h-4 md:w-32" />
          <div className="bg-black-100/40 h-4 w-40 animate-pulse rounded md:h-6 md:w-64" />
          <div className="bg-black-100/40 h-4 w-32 animate-pulse rounded md:h-5 md:w-48" />
          <div className="bg-black-100/40 h-3 w-20 animate-pulse rounded md:h-4 md:w-28" />
        </div>
        <div className="bg-black-100/40 h-[82px] w-[82px] animate-pulse rounded-sm md:h-[182px] md:w-[182px] md:rounded-md lg:h-[232px] lg:w-[232px]" />
      </div>
    </div>
  );
}
