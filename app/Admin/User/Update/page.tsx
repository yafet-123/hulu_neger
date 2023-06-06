"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Admin/User/Form";

const Update = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [user, setUser] = useState({ UserName: "", email: "" });
  const [submitting, setIsSubmitting] = useState(false);
  console.log(user)
  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/User/${userId}`);
      const data = await response.json();

      setUser({
        UserName: data.UserName,
        email: data.email,
      });
    };

    if (userId) getUserDetails();
  }, [userId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) return alert("Missing UserId!");

    try {
      const response = await fetch(`/api/User/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          UserName: user.UserName,
          email: user.email,
        }),
      });

      if (response.ok) {
        router.push("/Admin/User");
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
        user={user}
        setUser={setUser}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </section>
  );
};

export default Update;
