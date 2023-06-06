"use client";
import Image from "next/image";
import Form from "@/components/Admin/Category/Form";
import Display from "@/components/Admin/Category/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
interface Category {
  Category: string;
}

const NewsCategoryCardList = ({ data, handleEdit, handleDelete }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((category) => (
        <Display key={category.category_id} category={category} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default function NewsCategoryHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allNewsCategory, setAllNewsCategory] = useState([]);
  const [category, setCategory] = useState<Category>({ Category: "" });
  const { data: session } = useSession();
  const createNewsCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/News/Category/Add", {
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

  const fetchNewsCategory = async () => {
    const response = await fetch("/api/News/Category");
    const data = await response.json();

    setAllNewsCategory(data);
  };

  const handleEdit = (category_id) => {
    console.log(category_id)
    router.push(`/Admin/News/Category/Update?id=${category_id}`);
  };

  const handleDelete = async (category_id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this User?"
    );

    if (hasConfirmed) {
      try {
       const response = await fetch(`/api/News/Category/${category_id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/Admin/News/Category");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchNewsCategory();
  }, []);
  return (
    <section className="w-full box-border lg:pt-24">
      <Form
        type="Create"
        typeofCategory="News"
        category={category}
        setCategory={setCategory}
        submitting={submitting}
        handleSubmit={createNewsCategory}
      />

      <NewsCategoryCardList data={allNewsCategory} handleDelete={handleDelete} handleEdit={handleEdit} />
    </section>
  );
}
