import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Pretendard, LeferiBold } from "@/font";
import QueryClientProvider from "@/lib/network/QueryClientProvider";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://favory.vercel.app"),
  title: "Favory | 내 취향을 담은 나만의 공간",
  description:
    "좋아하는 음악, 영화, 드라마, 도서를 한 곳에 모아 감상평을 기록하고, 공유해 보세요",
  openGraph: {
    title: "Favory | 내 취향을 담은 나만의 공간",
    description:
      "좋아하는 음악, 영화, 드라마, 도서를 한 곳에 모아 감상평을 기록하고, 공유해 보세요",
    images: ["/thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${Pretendard.variable} ${LeferiBold.variable}`}>
      <body className="flex flex-col bg-[#fafafa]">
        <QueryClientProvider>
          <ToastContainer
            position="bottom-center"
            toastStyle={{
              minHeight: "unset",
              minWidth: "unset",
              maxWidth: "80vw",
              marginBottom: "30px",
              backgroundColor: "#076653",
              color: "#ffffff",
              borderRadius: "16px",
            }}
            toastClassName="w-fit flex justify-center text-sm md:text-md break-words"
            autoClose={2000}
            icon={false}
            closeButton={false}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            limit={3}
            hideProgressBar
            draggable
            closeOnClick
            newestOnTop
          />
          <Header />
          <main className="z-0 flex-grow pt-10 md:pt-12">{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
