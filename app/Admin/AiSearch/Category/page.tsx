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

const AiSearchCategoryCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((category) => (
        <Display key={category.category_id} category={category} />
      ))}
    </div>
  );
};

export default function AiSearchCategoryHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allAiSearchCategory, setAllAiSearchCategory] = useState([]);
  const [category, setCategory] = useState<Category>({ Category: "" });
  const { data: session } = useSession();
  const createAiSearchCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/AiSearch/Category/Add", {
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

  const fetchAiSearchCategory = async () => {
    const response = await fetch("/api/AiSearch/Category");
    const data = await response.json();

    setAllAiSearchCategory(data);
  };

  useEffect(() => {
    fetchAiSearchCategory();
  }, []);
  return (
    <section className="w-full box-border lg:pt-24">
      <Form
        type="Create"
        typeofCategory="AiSearch"
        category={category}
        setCategory={setCategory}
        submitting={submitting}
        handleSubmit={createAiSearchCategory}
      />

      <AiSearchCategoryCardList data={allAiSearchCategory} />
    </section>
  );
}
