"use client";
import Image from 'next/image'
import Form from "@/components/Admin/User/Form";
import { useState } from "react";

export default function AdminUserHome() {
  const [typepassword, setTypepassword] = useState('password');
  const [typepasswordconfirm, setTypepasswordconfirm] = useState('password');
  const [passworderror,setpassworderror] = useState("")
  const [submitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({ UserName: "", confirmPassword:"",password: "",email:"" });
  const createUser = async (e) => {
    e.preventDefault();
    console.log(user.UserName)
    setIsSubmitting(true);
    if(user.confirmPassword === user.password){
      try {
          const response = await fetch("/api/User/Add", {
            method: "POST",
            body: JSON.stringify({
              UserName: user.UserName,
              Password: user.password,
              email: user.email,
              role:'admin'
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
    }else{
      setpassworderror("Password and confirm password should be same.")
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
        typepassword={typepassword}
        setTypepassword={setTypepassword}
        typepasswordconfirm={typepasswordconfirm}
        setTypepasswordconfirm={setTypepasswordconfirm}
      />
    </section>
  )
}
