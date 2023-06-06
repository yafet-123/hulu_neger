"use client";
import Image from "next/image";
import Form from "@/components/Admin/Blogs/Form";
import Display from "@/components/Admin/Blogs/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const BlogsCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.blogs_id} blogs={data} />
      ))}
    </div>
  );
};
 
export default function BlogsHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [Description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState([])
  const [allBlogsCategory, setAllBlogsCategory] = useState([]);
  const [blogs, setBlogs] = useState({
    Header: "",
    ShortDescription: "",
    Image: "",
  });
  const { data: session } = useSession();
  console.log(blogs)
  async function imageUploadData() {
    const formData = new FormData();
    let imagesecureUrl = "";
    formData.append("file", blogs.Image);

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

  const createBlogs = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageData = await imageUploadData()
    try {
      const response = await fetch("/api/Blogs//Add", {
        method: "POST",
        body: JSON.stringify({
          Header: blogs.Header,
          Image: imageData,
          ShortDescription: blogs.ShortDescription,
          Description: Description,
          categoryId: categoryId,
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

  const fetchBlogs = async () => {
    const response = await fetch("/api/Blogs");
    const data = await response.json();

    setAllBlogs(data);
  };

  const fetchBlogsCategory = async () => {
    const response = await fetch("/api/Blogs/Category");
    const data = await response.json();

    setAllBlogsCategory(data);
  };

  useEffect(() => {
    fetchBlogs();
    fetchBlogsCategory();
  }, []);
  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Blogs"
        blogs={blogs}
        setBlogs={setBlogs}
        Description={Description}
        setDescription={setDescription}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={allBlogsCategory}
        submitting={submitting}
        handleSubmit={createBlogs}
      />

      <BlogsCardList data={allBlogs} />
    </section>
  );
}
