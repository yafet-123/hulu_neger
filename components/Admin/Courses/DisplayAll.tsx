import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Display = ({ course }) => {
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
        <p className="my-4 font-satoshi text-sm text-gray-700">{course.title}</p>
        <div className="bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow ql-video" dangerouslySetInnerHTML={{ __html: course.content }} />
      </div>
    </div>
  );
};

export default Display;
