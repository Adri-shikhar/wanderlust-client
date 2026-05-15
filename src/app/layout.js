const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import ReactToastifyContainer from "@/components/ReactToastifyContainer";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wanderlust — Discover Your Next Adventure",
  description: "Browse curated destinations, book trips, and manage your travel experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       
        {children}
        <Footer />
        <Toaster richColors position="top-center" />
        <ReactToastifyContainer />
      </body>
    </html>
  );
}
