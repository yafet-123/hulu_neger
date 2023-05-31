"use client";
import Image from 'next/image'
import Form from "@/components/Admin/Job/Category/Form";
import UserDisplay from "@/components/Admin/User/UserDisplay";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

interface Category {
  Category:string;
}

const JobCategoryCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((category) => (
        <UserDisplay
          key={category.user_id}
          category={category}
        />
      ))}
    </div>
  );
};

export default function JobCategoryHome() {
  const [submitting, setIsSubmitting] = useState(false);
  const [allJobCategory, setAllJobCategory] = useState([]);
  const [category, setCategory] = useState<Category>({ Category: "" });
  const { data: session } = useSession();
  const createJobCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/Job/Category/Add", {
        method: "POST",
        body: JSON.stringify({
          CategoryName: category.Category,
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

  const fetchJobCategory = async () => {
    const response = await fetch("/api/Job/Category");
    const data = await response.json();

    setAllJobCategory(data);
  };

  useEffect(() => {
    fetchJobCategory();
  }, []);
  return (
    <section className='w-full box-border lg:pt-24'>
      <Form
        type='Create'
        category={category}
        setCategory={setCategory}
        submitting={submitting}
        handleSubmit={createJobCategory}
      />

      <JobCategoryCardList data={allJobCategory} />
    </section>
  )
}
