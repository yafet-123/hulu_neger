"use client";
import Image from "next/image";
import Form from "@/components/Admin/Html/Form";
import Display from "@/components/Admin/Html/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const HtmlCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.course_id} data={data} />
      ))}
    </div>
  );
};

export default function HtmlHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allHtml, setAllHtml] = useState([]);
  const [allHtmlCategory, setAllHtmlCategory] = useState([]);
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const { data: session } = useSession();

  const createHtml = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/Html/Add", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content:content,
          user_id: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/Admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchHtml = async () => {
    const response = await fetch("/api/Html");
    const data = await response.json();

    setAllHtml(data);
  };

  const fetchHtmlCategory = async () => {
    const response = await fetch("/api/Html/Category");
    const data = await response.json();

    setAllHtmlCategory(data);
  };

  useEffect(() => {
    fetchHtml();
    fetchHtmlCategory();
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

      <HtmlCardList data={allHtml} />
    </section>
  );
}
