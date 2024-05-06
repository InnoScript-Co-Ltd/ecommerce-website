import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
// import { Header } from "@/components/Header/Header";
// import { Footer } from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import {store} from "@/services/redux/store";
import StoreProvider from "@/components/Provider/StoreProvider";

const Header = dynamic(() => import('@/components/Header/Header'), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer/Footer"), { ssr: false });

// const inter = Inter({ subsets: ["latin"] });
const roboto_condensed = Roboto_Condensed({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "WinKhin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_condensed.className}>
        <StoreProvider
          cart={[]}
        >
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}