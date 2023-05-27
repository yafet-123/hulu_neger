"use client";

import Image from 'next/image'
import Form from "@/components/Admin/User/Form";
import { useState } from "react";

export default function AdminUserHome() {
  const [typepassword, setTypepassword] = useState('password');
  const [typepasswordconfirm, setTypepasswordconfirm] = useState('password');
  const [submitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({ UserName: "", confirmPassword:"",password: "",email:"" });
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: user.UserName,
          userId: session?.user.id,
          tag: user.tag,
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
    <section className='w-full flex-col pt-24'>
      <Form
        type='Create'
        user={user}
        setUser={setUser}
        submitting={submitting}
        handleSubmit={createPrompt}
        typepassword={typepassword}
        setTypepassword={setTypepassword}
        typepasswordconfirm={typepasswordconfirm}
        setTypepasswordconfirm={setTypepasswordconfirm}
      />
    </section>
  )
}
