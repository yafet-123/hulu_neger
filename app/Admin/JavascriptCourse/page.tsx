"use client";
import Image from "next/image";
import Form from "@/components/Admin/Courses/Form";
import Display from "@/components/Admin/Courses/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const JavascriptCardList = ({ data, handleEdit , handleDelete, handleView }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.course_id} course={data} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
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

  const handleEdit = (course_id) => {
    console.log(course_id)
    router.push(`/Admin/JavascriptCourse/Update?id=${course_id}`);
  };

  const handleDelete = async (course_id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this User?"
    );

    if (hasConfirmed) {
      try {
       const response = await fetch(`/api/Javascript/${course_id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/Admin/JavascriptCourse");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

   const handleView = (course_id) => {
    router.push(`/Admin/JavascriptCourse/View/${course_id}`);
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

      <JavascriptCardList data={allJavascript} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
    </section>
  );
}
