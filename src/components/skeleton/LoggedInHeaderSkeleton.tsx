export default function LoggedInHeaderSkeleton() {
  return (
    <header className="fixed z-50 w-full bg-green-500 shadow-lg">
      <div className="relative mx-auto flex h-10 max-w-[1448px] items-center justify-between px-4 transition-all md:h-12">
        <div className="bg-black-100/40 h-6 w-[86px] animate-pulse rounded md:h-7 md:w-[101px]" />
        <div className="flex items-center gap-3 md:gap-5">
          <div className="bg-black-100/40 h-6 w-7 animate-pulse rounded md:h-8 md:w-[84px]" />
          <div className="bg-black-100/40 h-6 w-6 animate-pulse rounded-full md:h-8 md:w-8" />
          <div className="bg-black-100/40 h-6 w-6 animate-pulse rounded-full md:h-8 md:w-8" />
        </div>
      </div>
    </header>
  );
}
