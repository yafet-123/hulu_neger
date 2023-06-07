"use client";

import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Display = ({ course, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  console.log(course);
  const handleCopy = () => {
    setCopied(course.title);
    navigator.clipboard.writeText(course.title);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClickForUpdate = () => {
    handleEdit(course.course_id);
  };

  const handleClickForDelete = () => {
    handleDelete(course.course_id);
  };

  const handleView = () => {
    router.push(`/Admin/HtmlCourse/View?id=${course_id}`);
  };

  return (
    <div className="prompt_card lg:px-20">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {course.course_id}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {moment(course.ModifiedDate).utc().format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === course.title
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === course.title ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{course.title}</p>
      <div className="flex items-center justify-between mt-5">
        <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleView}
        >
          View
        </p>
        {session?.user.email === course.email && (
          <div className="flex items-center justify-between gap-4 border-t border-gray-100">
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
    </div>
  );
};

export default Display;
