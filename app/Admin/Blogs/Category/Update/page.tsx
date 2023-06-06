"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Admin/Category/Form";

const Update = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const [category, setCategory] = useState({ Category: "" });
  const [submitting, setIsSubmitting] = useState(false);
  console.log(category)
  useEffect(() => {
    const getCategoryDetails = async () => {
      const response = await fetch(`/api/Blogs/Category/${categoryId}`);
      const data = await response.json();

      setCategory({
        Category: data.CategoryName,
      });
    };

    if (categoryId) getCategoryDetails();
  }, [categoryId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!categoryId) return alert("Missing Category Id!");

    try {
      const response = await fetch(`/api/Blogs/Category/${categoryId}`, {
        method: "PATCH",
        body: JSON.stringify({
          CategoryName: category.Category,
        }),
      });

      if (response.ok) {
        router.push("/Admin/Blogs/Category");
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
        category={category}
        setCategory={setCategory}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </section>
  );
};

export default Update;
