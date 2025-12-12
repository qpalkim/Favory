import Link from "next/link";

export default function Footer() {
  return (
    <footer className="z-10 flex h-[90px] w-full items-center justify-center bg-green-600 md:h-[120px]">
      <div className="flex h-full w-full max-w-[1400px] items-center justify-between px-4">
        <Link
          href="/"
          className="font-leferiBold md:text-2lg text-lg text-white"
        >
          Favory
        </Link>
        <p className="text-black-200 text-sm md:text-lg">@qpalkim - 2025</p>
      </div>
    </footer>
  );
}
