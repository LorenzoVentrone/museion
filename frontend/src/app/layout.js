import { Geist, Geist_Mono } from "next/font/google";
import { InfoPanelProvider } from '../context/InfoPanelContext';
import InfoPanel from '../components/ui/InfoPanel';
import "./globals.css";
import { AuthProvider } from "@/components/utils/AuthProvider";
import Navbar from "@/components/utils/Navbar";
import { Toaster } from 'react-hot-toast';

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
            {/*Alert carucci*/}
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#2e2b28', color: '#fff' },
                success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              }}
            />
            <InfoPanel />
          </InfoPanelProvider>
        </AuthProvider>
      </body>
    </html>
  );
}