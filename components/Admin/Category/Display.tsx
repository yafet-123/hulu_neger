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
  console.log(category);
  console.log(category.User?.email);
  const handleCopy = () => {
    setCopied(category.CategoryName);
    navigator.clipboard.writeText(category.CategoryName);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClickForUpdate = () => {
    handleEdit(category.category_id);
  };

  const handleClickForDelete = () => {
    handleDelete(category.category_id);
  };

  return (
    <div className="prompt_card lg:px-20">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {category.category_id}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {moment(category.ModifiedDate).utc().format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === category.CategoryName
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === category.CategoryName ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {category.CategoryName}
      </p>
      {session?.user.email === category.email && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleClickForUpdate}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleClickForDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Display;
