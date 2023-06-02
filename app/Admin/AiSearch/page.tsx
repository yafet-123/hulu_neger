"use client";
import Image from 'next/image'
import Form from "@/components/Admin/AiSearch/Form";
import Display from "@/components/Admin/Category/Display";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const AiSearchCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((data) => (
        <Display
          key={data._id}
          aiSearch={data}
        />
      ))}
    </div>
  );
};

export default function AiSearchHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allAiSearch, setAllAiSearch] = useState([]);
  const [allAiSearchCategory, setAllAiSearchCategory] = useState([]);
  const [aiSearch, setaiSearch] = useState({ Header : "", description:"", like:"", link:"", service:[], categoryId:[]  });
  const { data: session } = useSession();
  const createAiSearch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/AiSearch//Add", {
        method: "POST",
        body: JSON.stringify({
          Header:Header,
          description:description,
          like:0,
          link:link,
          service:service,
          categoryId:categoryId,
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

  const fetchAiSearch = async () => {
    const response = await fetch("/api/AiSearch/");
    const data = await response.json();

    setAllAiSearch(data);
  };

  const fetchAiSearchCategory = async () => {
    const response = await fetch("/api/AiSearch/Category");
    const data = await response.json();

    setAllAiSearchCategory(data);
  };

  useEffect(() => {
    fetchAiSearch();
    fetchAiSearchCategory();
  }, []);
  return (
    <section className='w-full box-border lg:pt-24'>
      <Form
        type='Create'
        typeof="AiSearch"
        aiSearch={aiSearch}
        setaiSearch={setaiSearch}
        categories={categories}
        submitting={submitting}
        handleSubmit={createAiSearch}
      />

      <AiSearchCardList data={allAiSearch} />
    </section>
  )
}
