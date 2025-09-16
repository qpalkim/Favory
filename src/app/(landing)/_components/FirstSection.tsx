import { BookOpen, Clapperboard, Music4, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function SkeletonRow({ Icon, label }: { Icon: LucideIcon; label: string }) {
  const barWidths = [32, 20, 132, 120];
  return (
    <div className="flex min-h-[32px] min-w-[215px] gap-2 rounded-md bg-white shadow-md md:h-[50px] md:w-[336px] lg:h-[72px] lg:w-[479px]">
      <div className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-tl-md rounded-bl-md bg-gray-300 md:w-[50px] lg:w-[72px]">
        <Icon
          strokeWidth={1}
          className="h-[14px] w-[14px] md:h-[19px] md:w-[19px] lg:h-[28px] lg:w-[28px]"
          aria-label={`${label} 아이콘`}
        />
      </div>
      <div className="py-1 md:py-2 lg:py-3">
        {barWidths.map((w, i) => (
          <div
            key={i}
            className={`mt-${i === 0 ? "[0]" : "[2px]"} h-[4px] w-[${w}px] rounded-md bg-gray-300 md:h-[${i === 1 ? 4 : 5}px] md:w-[${i === 1 ? 24 : i === 2 ? 208 : i === 3 ? 180 : 52}px] lg:h-[${i === 1 ? 6 : 8}px] lg:w-[${i === 1 ? 48 : i === 2 ? 296 : i === 3 ? 232 : 73}px]`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default function FirstSection() {
  const skeletonItems = [
    { icon: Music4, label: "음악" },
    { icon: Clapperboard, label: "영화" },
    { icon: Tv, label: "드라마" },
    { icon: BookOpen, label: "책" },
  ];

  return (
    <section className="mx-auto flex w-fit flex-col justify-center px-4 lg:w-full lg:flex-row-reverse lg:items-center lg:justify-between">
      <div className="h-[210px] w-[312px] overflow-hidden rounded-xl bg-gradient-to-b from-green-100 to-green-500 shadow-2xl md:h-[290px] md:w-[488px] lg:h-[412px] lg:w-[694px]">
        <div className="flex flex-col items-center gap-2 p-3">
          {skeletonItems.map((item) => (
            <SkeletonRow key={item.label} Icon={item.icon} label={item.label} />
          ))}
        </div>
      </div>
      <h1 className="mt-6 text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        느낀 점을 작성하여
        <br />
        짧은 감상 기록을 남겨 보세요
      </h1>
    </section>
  );
}
