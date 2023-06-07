"use client";

import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Display = ({ category, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  console.log(jobs);
  const handleCopy = () => {
    setCopied(jobs.CompanyName);
    navigator.clipboard.writeText(jobs.CompanyName);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card lg:px-20">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {jobs.job_id}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {moment(jobs.ModifiedDate).utc().format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === jobs.CompanyName
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === jobs.CompanyName ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center my-5">
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {jobs.CompanyName}
        </p>
        <Image src={jobs.Image} alt="news Image" width={100} height={100} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center my-5">
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {jobs.JobsName}
        </p>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {jobs.CareerLevel}
        </p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleView}
        >
          View
        </p>

        {session?.user.email === jobs.email && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;
