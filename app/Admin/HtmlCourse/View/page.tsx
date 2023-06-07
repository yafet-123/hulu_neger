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

export default function HtmlHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const fetchHtml = async () => {
    const response = await fetch("/api/Html");
    const data = await response.json();

    setAllHtml(data);
  };


  useEffect(() => {
    fetchHtml();
  }, []);
  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Html"
        title={title}
        settitle={settitle}
        content={content}
        setcontent={setcontent}
        submitting={submitting}
        handleSubmit={createHtml}
      />

      <HtmlCardList data={allHtml} handleDelete={handleDelete} handleEdit={handleEdit} />
    </section>
  );
}
