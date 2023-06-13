import Image from "next/image";
import React from "react";
import prisma from "@/utils/prismaClient";
import LatestJobs from '@/components/Home/LatestJobs'
import SearchJobs from '@/components/Home/SearchJobs'

export default function HomePage() {
  return(
    <section className="w-full flex-center flex-col h-full">
      <LatestJobs />
      <SearchJobs />
    </section>
  )
}
