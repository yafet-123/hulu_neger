"use client";
import Image from "next/image";
import Form from "@/components/Admin/Courses/Form";
import Display from "@/components/Admin/Courses/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const HtmlCardList = ({ data, handleEdit , handleDelete, handleView }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.course_id} course={data} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
      ))}
    </div>
  );
};

export default function HtmlHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allHtml, setAllHtml] = useState([]);
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const { data: session } = useSession();
  console.log(allHtml)
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

  const handleEdit = (course_id) => {
    console.log(course_id)
    router.push(`/Admin/HtmlCourse/Update?id=${course_id}`);
  };

  const handleDelete = async (course_id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this User?"
    );

    if (hasConfirmed) {
      try {
       const response = await fetch(`/api/Html/${course_id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/Admin/HtmlCourse");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

   const handleView = (course_id) => {
    router.push(`/Admin/HtmlCourse/View/${course_id}`);
  };

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

      <HtmlCardList data={allHtml} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
    </section>
  );
}
