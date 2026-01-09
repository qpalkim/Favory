export default function CommentItemSkeleton() {
  return (
    <div className="flex animate-pulse gap-2 py-6 lg:max-w-[660px]">
      <div className="bg-black-100/40 h-8 w-8 rounded-full md:h-9 md:w-9" />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-0.5">
          <div className="bg-black-100/40 h-4 w-24 rounded md:h-[18px]" />
          <div className="bg-black-100/40 h-[15px] w-32 rounded md:h-4" />
        </div>
        <div className="mt-2 space-y-1">
          <div className="bg-black-100/40 md:h-[18px h-4 w-full rounded" />
          <div className="bg-black-100/40 md:h-[18px h-4 w-[90%] rounded" />
        </div>
      </div>
    </div>
  );
}
