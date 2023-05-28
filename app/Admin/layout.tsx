import { Inter } from 'next/font/google'
import type { Metadata } from 'next';
import '../globals.css'
import VerticalNavbar from "@/components/Admin/Common/VerticalNavbar"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col lg:flex-row w-full'>
      <div className="">
        {/* @ts-ignore */}
        <VerticalNavbar />
      </div>
      <div className="w-full px-20">
        { children }
      </div>
    </div>
  )
}