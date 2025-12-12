import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Pretendard, LeferiBold } from "@/font";
import QueryClientProvider from "@/lib/network/QueryClientProvider";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
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
