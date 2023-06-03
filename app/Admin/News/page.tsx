"use client";
import Image from "next/image";
import Form from "@/components/Admin/News/Form";
import Display from "@/components/Admin/News/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const NewsCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.news_id} news={data} />
      ))}
    </div>
  );
};

export default function NewsHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const [Description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState([])
  const [allNewsCategory, setAllNewsCategory] = useState([]);
  const [news, setNews] = useState({
    Header: "",
    ShortDescription: "",
    Image: "",
  });
  const { data: session } = useSession();
  console.log(news)
  async function imageUploadData() {
    const formData = new FormData();
    let imagesecureUrl = "";
    formData.append("file", news.Image);

    formData.append("upload_preset", "my_upload");

    const imageUpload = await fetch(
      `https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    imagesecureUrl = imageUpload.secure_url;
    return imagesecureUrl;
  }

  const createNews = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageData = await imageUploadData()
    try {
      const response = await fetch("/api/News//Add", {
        method: "POST",
        body: JSON.stringify({
          Header: news.Header,
          Image: imageData,
          ShortDescription: news.ShortDescription,
          Description: Description,
          categoryId: news.categoryId,
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

  const fetchNews = async () => {
    const response = await fetch("/api/News");
    const data = await response.json();

    setAllNews(data);
  };

  const fetchNewsCategory = async () => {
    const response = await fetch("/api/News/Category");
    const data = await response.json();

    setAllNewsCategory(data);
  };

  useEffect(() => {
    fetchNews();
    fetchNewsCategory();
  }, []);
  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type="Create"
        typeofCategory="News"
        news={news}
        setNews={setNews}
        Description={Description}
        setDescription={setDescription}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={allNewsCategory}
        submitting={submitting}
        handleSubmit={createNews}
      />

      <NewsCardList data={allNews} />
    </section>
  );
}
