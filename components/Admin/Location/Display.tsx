"use client";

import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Display = ({ location, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  console.log(location);
  const handleCopy = () => {
    setCopied(location.LocationName);
    navigator.clipboard.writeText(location.LocationName);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card lg:px-20">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {location.location_id}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {moment(location.ModifiedDate).utc().format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === location.LocationName
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === location.LocationName ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center my-5">
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {location.LocationName}
        </p>
        <Image
            src={location.Image}
            alt="news Image"
            width={100}
            height={100}
          />
      </div>
      {session?.user.email === "yafetaddisu123@gmail.com" &&
        pathName === "/profile" && (
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
