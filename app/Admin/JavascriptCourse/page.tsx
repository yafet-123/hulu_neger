"use client";
import Image from "next/image";
import Form from "@/components/Admin/Entertainment/Form";
import Display from "@/components/Admin/Entertainment/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EntertainmentCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.entertainment_id} entertainment={data} />
      ))}
    </div>
  );
};

export default function EntertainmentHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allEntertainment, setAllEntertainment] = useState([]);
  const [Description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState([])
  const [allEntertainmentCategory, setAllEntertainmentCategory] = useState([]);
  const [entertainment, setEntertainment] = useState({
    Header: "",
    ShortDescription: "",
    Image: "",
  });
  const { data: session } = useSession();
  console.log(categoryId)
  async function imageUploadData() {
    const formData = new FormData();
    let imagesecureUrl = "";
    formData.append("file", entertainment.Image);

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

  const createEntertainment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageData = await imageUploadData()
    try {
      const response = await fetch("/api/Entertainment/Add", {
        method: "POST",
        body: JSON.stringify({
          Header: entertainment.Header,
          Image: imageData,
          ShortDescription: entertainment.ShortDescription,
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

  const fetchEntertainment = async () => {
    const response = await fetch("/api/Entertainment");
    const data = await response.json();

    setAllEntertainment(data);
  };

  const fetchEntertainmentCategory = async () => {
    const response = await fetch("/api/Entertainment/Category");
    const data = await response.json();

    setAllEntertainmentCategory(data);
  };

  useEffect(() => {
    fetchEntertainment();
    fetchEntertainmentCategory();
  }, []);
  return (
    <section className="w-full h-full lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Entertainment"
        entertainment={entertainment}
        setEntertainment={setEntertainment}
        Description={Description}
        setDescription={setDescription}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={allEntertainmentCategory}
        submitting={submitting}
        handleSubmit={createEntertainment}
      />

      <EntertainmentCardList data={allEntertainment} />
    </section>
  );
}
