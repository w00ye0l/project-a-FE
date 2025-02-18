import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthSession from "./_component/AuthSession";
import MainNavBar from "./_component/MainNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Master Car",
  description: "master car made by azero company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
      </head>
      <body className={inter.className}>
        <AuthSession>
          {/* 메인 네비게이션 바 */}
          <MainNavBar />

          {children}
          <Toaster richColors position="bottom-right" />
        </AuthSession>
      </body>
    </html>
  );
}
