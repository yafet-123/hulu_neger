"use client";
import Image from "next/image";
import Form from "@/components/Admin/Courses/Form";
import Display from "@/components/Admin/Courses/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const CssCardList = ({ data, handleEdit , handleDelete }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.course_id} course={data} handleDelete={handleDelete} handleEdit={handleEdit} />
      ))}
    </div>
  );
};

export default function CssHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allCss, setAllCss] = useState([]);
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const { data: session } = useSession();

  const createCss = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/Css/Add", {
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
    router.push(`/Admin/CssCourse/Update?id=${course_id}`);
  };

  const handleDelete = async (course_id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this User?"
    );

    if (hasConfirmed) {
      try {
       const response = await fetch(`/api/Css/${course_id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/Admin/CssCourse");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchCss = async () => {
    const response = await fetch("/api/Css");
    const data = await response.json();

    setAllCss(data);
  };

  useEffect(() => {
    fetchCss();
  }, []);
  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Css"
        title={title}
        settitle={settitle}
        content={content}
        setcontent={setcontent}
        submitting={submitting}
        handleSubmit={createCss}
      />

      <CssCardList data={allCss} handleDelete={handleDelete} handleEdit={handleEdit}  />
    </section>
  );
}
