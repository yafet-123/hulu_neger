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

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/user/${userId}`);
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
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          UserName: user.UserName,
          email: user.email,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      user={user}
      setUser={setUser}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default Update;
