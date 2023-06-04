"use client";
import Image from "next/image";
import Form from "@/components/Admin/Course/Form";
import Display from "@/components/Admin/Course/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const JavascriptCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.course_id} course={data} />
      ))}
    </div>
  );
};

export default function JavascriptHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allJavascript, setAllJavascript] = useState([]);
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const { data: session } = useSession();

  const createJavascript = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/Javascript/Add", {
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

  const fetchJavascript = async () => {
    const response = await fetch("/api/Javascript");
    const data = await response.json();

    setAllJavascript(data);
  };

  useEffect(() => {
    fetchJavascript();
  }, []);
  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Javascript"
        title={title}
        settitle={settitle}
        content={content}
        setcontent={setcontent}
        submitting={submitting}
        handleSubmit={createJavascript}
      />

      <JavascriptCardList data={allJavascript} />
    </section>
  );
}