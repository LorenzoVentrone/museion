import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utils/Navbar"; // aggiungi questo import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Museion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar /> {/* Navbar qui, visibile su tutte le pagine */}
        {children}
      </body>
    </html>
  );
}