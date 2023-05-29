"use client";
import Image from 'next/image'
import Form from "@/components/Admin/User/Form";
import { useState } from "react";

interface User {
  UserName:string;
  confirmPassword:string;
  password:string;
  email:string;
}

export default function AdminUserHome() {
  const [typepassword, setTypepassword] = useState('password');
  const [typepasswordconfirm, setTypepasswordconfirm] = useState('password');
  const [passworderror,setpassworderror] = useState("")
  const [submitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User>({ UserName: "", confirmPassword:"",password: "",email:"" });
  const createUser = async (e) => {
    e.preventDefault();
    console.log(user.UserName)
    setIsSubmitting(true);
    try {
      if(user.confirmPassword === user.password){
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
      }else{
        setpassworderror("Password and confirm password should be same.")
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
        typepassword={typepassword}
        setTypepassword={setTypepassword}
        typepasswordconfirm={typepasswordconfirm}
        setTypepasswordconfirm={setTypepasswordconfirm}
      />
    </section>
  )
}
