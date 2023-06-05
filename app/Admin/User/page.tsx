"use client";
import Image from "next/image";
import Form from "@/components/Admin/User/Form";
import UserDisplay from "@/components/Admin/User/UserDisplay";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface User {
  UserName: string;
  email: string;
}

const UserCardList = ({ data }) => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((user) => (
        <UserDisplay key={user.user_id} user={user} />
      ))}
    </div>
  );
};

export default function AdminUserHome() {
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState<User>({ UserName: "", email: "" });
  console.log(allUsers)
  const createUser = async (e) => {
    e.preventDefault();
    console.log(user.UserName);
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

  const fetchUsers = async () => {
    const response = await fetch("/api/User");
    const data = await response.json();

    setAllUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <section className="w-full box-border lg:pt-24">
      {session?.user.email === "yafetaddisu123@gmail.com" ? (
        <Form
          type="Create"
          user={user}
          setUser={setUser}
          submitting={submitting}
          handleSubmit={createUser}
        />
      ):
      <div className="flex justify-center items-center lg:pt-20">
        <h1 className="font-bold text-lg lg:text-3xl">You are not allowed to add user.</h1>
      </div>
    }

      <UserCardList data={allUsers} />
    </section>
  );
}
