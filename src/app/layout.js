import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "The virtual path through timeless art. ",
  icons:{
    icon: "images/WebLogo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#ede7db] text-[#1E1E1E] font-['EB_Garamond']">
        {children}
      </body>
    </html>
  );
}
