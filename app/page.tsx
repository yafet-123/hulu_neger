import Image from "next/image";
import React from "react";
import prisma from "@/utils/prismaClient";
import LatestJobs from '@/components/Home/LatestJobs'
import SearchJobs from '@/components/Home/SearchJobs'
import Hero from '@/components/Home/Hero'

export default function HomePage() {
  return(
    <section className="w-full flex flex-col h-full">
      <Hero />
      <LatestJobs />
      <SearchJobs />
    </section>
  )
}
