import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xeltronic Electrical Solution",
  description: "Industrial automation parts supplier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#071018] text-white">
        <Header />

        <a
          href="https://wa.me/971554835199"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-attention fixed bottom-6 right-6 z-[9999] group animate-[whatsappPulse_2s_infinite]"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-green-400/30 bg-[#071018]/95 px-5 py-4 shadow-2xl backdrop-blur-xl transition hover:scale-105">
            <div>
              <p className="text-sm font-bold text-white">Need a Quote?</p>
              <p className="text-xs text-green-400">
                Chat with an Automation Expert
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]">
              <img
                src="/whatsapp.png"
                alt="WhatsApp"
                className="h-10 w-10"
              />
            </div>
          </div>
        </a>

        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}