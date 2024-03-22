import type { Metadata } from "next";
import "./globals.css";
import { workSans, montserrat } from "../assets/fonts";
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Stretchly - Track your flexibility progress",
  description:
    "A flexibility timer that allows you to also track the intensity and distance of your stretches.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={`${workSans.variable} ${montserrat.variable}`} lang="en">
      <body className="h-full text-black bg-lightprimary">
        <Toaster richColors />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
