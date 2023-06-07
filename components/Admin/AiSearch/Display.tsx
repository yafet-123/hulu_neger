"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";

const Display = ({ aiSearch, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(aiSearch.link);
    navigator.clipboard.writeText(aiSearch.link);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {aiSearch.detail_id}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {moment(aiSearch.ModifiedDate).utc().format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === aiSearch.link
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === aiSearch.link ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {aiSearch.Header}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {aiSearch.service}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {aiSearch.description}
      </p>

      {session?.user.email === aiSearch.email && (
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
  );
};

export default Display;
