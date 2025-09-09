import { Metadata } from "next";
import { Pretendard } from "@/font";
import Header from "@/components/Header";
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
    <html lang="ko" className={Pretendard.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
