import { Metadata } from "next";
import { Pretendard, LeferiBold } from "@/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Favory - 내 취향을 담은 나만의 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${Pretendard.variable} ${LeferiBold.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="z-0 flex-grow pt-10 md:pt-12 lg:pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
