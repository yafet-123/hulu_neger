import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Display = ({ course }) => {
  return (
    <div className="lg:px-20 lg:pt-24">
      <div className="flex flex-col">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer mb-5">
          <h3 className="font-satoshi font-semibold text-gray-900">
            <span className="text-md lg:text-2xl font-bold"> id : </span>
            <span className="text-md lg:text-xl">{course.course_id}</span>
          </h3>
          <p className="font-satoshi font-semibold text-gray-900">
            <span className="text-md lg:text-2xl font-bold">
              Modified Date :
            </span>
            <span className="text-md lg:text-xl">
              {moment(course.ModifiedDate).utc().format("YYYY-MM-DD")}
            </span>
          </p>
        </div>
        <p className="flex flex-col lg:flex-row lg:items-center my-4 font-satoshi text-sm text-gray-700">
          <span className="text-md lg:text-2xl font-bold mb-5 lg:mb-0">
            Title :
          </span>
          <span className="pl-5">{course.title}</span>
        </p>

        <p className="flex flex-col my-4 font-satoshi text-sm text-gray-700">
          <span className="text-md lg:text-2xl font-bold mb-5 lg:mb-0">
            Content :
          </span>
          <div
            className="pl-10 bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow ql-video"
            dangerouslySetInnerHTML={{ __html: course.content }}
          />
        </p>
      </div>
    </div>
  );
};

export default Display;
