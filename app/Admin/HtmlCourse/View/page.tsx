"use client";
import Image from "next/image";
import Form from "@/components/Admin/Courses/Form";
import Display from "@/components/Admin/Courses/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const HtmlCardList = ({ data, handleEdit , handleDelete}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.course_id} course={data} handleDelete={handleDelete} handleEdit={handleEdit} />
      ))}
    </div>
  );
};

export default function HtmlView({params : {courseId} }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <section className="w-full h-full lg:pt-24">
      <HtmlCardList data={allHtml} handleDelete={handleDelete} handleEdit={handleEdit} />
    </section>
  );
}

export async function generateStaticParams() {
  const htmlview = await fetch('/api/Html').then((res) => res.json());
 
  return htmlview.map((html) => ({
    courseId: html.course_id.toString(),
  }));
}

