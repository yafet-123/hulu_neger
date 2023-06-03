import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import VerticalNavbar from "@/components/Admin/Common/VerticalNavbar";
import Navbar from "@/components/Admin/Common/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Generated by create next app",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex flex-col lg:flex-row w-full h-full">
        
          {/* @ts-ignore */}
          <VerticalNavbar />
        
        <div className="w-full px-20">{children}</div>
      </div>
    </div>
  );
}
