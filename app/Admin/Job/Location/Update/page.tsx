"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Admin/Courses/Form";

const Update = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const [submitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const getcourseDetails = async () => {
      const response = await fetch(`/api/Html/${courseId}`);
      const data = await response.json();
      settitle(data.title)
      setcontent(data.content)
    };

    if (courseId) getcourseDetails();
  }, [courseId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!courseId) return alert("Missing course Id!");

    try {
      const response = await fetch(`/api/Html/${courseId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          content:content,
        }),
      });

      if (response.ok) {
        router.push("/Admin/HtmlCourse");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type='Edit'
        title={title}
        settitle={settitle}
        content={content}
        setcontent={setcontent}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </section>
  );
};

export default Update;
