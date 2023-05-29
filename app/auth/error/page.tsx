import React from 'react'
import { useRouter } from "next/navigation";
export default function Error () {
  const { error } = useRouter().query;
  const router = useRouter();
  return(
    <React.Fragment>
      <div className="w-full h-screen bg-gray-100 dark:bg-slate-700 pt-24 grid justify-center content-center ">
        <div className="flex flex-col">
          <p className="text-center text-md lg:text-4xl font-bold">Error : {error}</p>
          <button 
              className="mt-10 text-xl md:text-2xl lg:text-3xl bg-blue-400 focus:text-white focus:bg-blue-600 p-4 rounded-xl"
              onClick={() => router.push("/auth/signin")}
          >Go To Login Page</button>
        </div>
      </div>
    </React.Fragment>
  )
};