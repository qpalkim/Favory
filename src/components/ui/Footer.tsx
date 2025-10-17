import Link from "next/link";

export default function Footer() {
  return (
    <footer className="z-10 h-[90px] w-full bg-green-600 px-6 py-[30px] md:h-[160px] md:py-[62px]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link
          href="/"
          className="font-leferiBold text-lg text-white md:text-xl"
        >
          Favory
        </Link>
        <p className="text-black-200 text-xs md:text-lg">@qpalkim - 2025</p>
      </div>
    </footer>
  );
}
