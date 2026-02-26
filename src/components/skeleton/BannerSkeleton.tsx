export default function BannerSkeleton() {
  return (
    <div className="relative h-[222px] w-full overflow-hidden px-6 md:h-[416px] md:px-8 lg:h-[456px] lg:px-0">
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-100"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-100/20 blur-3xl md:h-96 md:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_top,#fafafa_0%,rgba(250,250,250,0.7)_25%,rgba(250,250,250,0.2)_55%,transparent_100%)] md:h-64"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full w-full items-center justify-between lg:max-w-[1000px]">
        <div className="flex flex-col space-y-2">
          <div className="h-4 w-40 rounded bg-black-100/40 animate-pulse md:h-5 md:w-64" />
          <div className="h-3 w-16 rounded bg-black-100/40 animate-pulse md:h-4 md:w-20" />
          <div className="h-4 w-32 rounded bg-black-100/40 animate-pulse md:h-5 md:w-48" />
          <div className="h-3 w-24 rounded bg-black-100/40 animate-pulse md:h-4 md:w-32" />
        </div>
        <div className="h-[82px] w-[82px] rounded-sm bg-black-100/40 animate-pulse md:h-[182px] md:w-[182px] md:rounded-md lg:h-[232px] lg:w-[232px]" />
      </div>
    </div>
  );
}
