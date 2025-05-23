import { Geist, Geist_Mono } from "next/font/google";
import { InfoPanelProvider } from '../context/InfoPanelContext';
import InfoPanel from '../components/ui/InfoPanel';
import "./globals.css";
import { AuthProvider } from "@/components/utils/AuthProvider";
import Navbar from "@/components/utils/Navbar";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <InfoPanelProvider>
            <Navbar />
            {children}
            <InfoPanel />
          </InfoPanelProvider>
        </AuthProvider>
      </body>
    </html>
  );
}