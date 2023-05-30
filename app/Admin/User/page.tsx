"use client";
import Image from 'next/image'
import Form from "@/components/Admin/User/Form";
import { useState } from "react";

interface User {
  UserName:string;
  email:string;
}

export default function AdminUserHome() {
  const [submitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User>({ UserName: "",email:"" });
  const createUser = async (e) => {
    e.preventDefault();
    console.log(user.UserName)
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/User/Add", {
        method: "POST",
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
  return(
    <section className='w-full box-border pt-24'>
      <Form
        type='Create'
        user={user}
        setUser={setUser}
        submitting={submitting}
        handleSubmit={createUser}
      />
    </section>
  )
}
