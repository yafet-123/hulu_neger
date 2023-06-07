"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const VerticalNavbar: React.FC = () => {
  const SideBarList = [
    { link: "/Admin", name: "Dashboard" },
    { link: "/Admin/User", name: "User" },
    { link: "/Admin/Job/Add", name: "Add Job" },
    { link: "/Admin/Job/Display", name: "Display Job" },
    { link: "/Admin/Job/Category", name: "Job Category" },
    { link: "/Admin/Job/Location", name: "Job Location" },
    { link: "/Admin/News/Category", name: "News Category" },
    { link: "/Admin/News", name: "News" },
    { link: "/Admin/Entertainment/Category", name: "Entertainment Category" },
    { link: "/Admin/Entertainment", name: "Entertainment" },
    { link: "/Admin/HtmlCourse", name: "HTML Course" },
    { link: "/Admin/CssCourse", name: "CSS Course" },
    { link: "/Admin/JavascriptCourse", name: "JavaScript Course" },
    { link: "/Admin/PythonCourse", name: "Python Course" },
    { link: "/Admin/Blogs/Category", name: "Blogs Category" },
    { link: "/Admin/Blogs", name: "Blogs" },
    { link: "/Admin/AiSearch/Category", name: "AiSearch Category" },
    { link: "/Admin/AiSearch", name: "AiSearch" },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className={`flex h-full w-full lg:w-60 pt-24 sticky top-0 bottom-0`}>
      <nav className="w-full lg:h-screen flex flex-col py-8 lg:px-4 dark:bg-[#02201D]">
        <div className="flex justify-between ml-2 lg:ml-5">
          <h1 className={`text-2xl font-bold text-black dark:text-white`}>
            Admin Page
          </h1>
        </div>

        <div className="mt-10">
          <ul className="flex flex-row lg:flex-col w-full lg:w-60 lg:h-[50rem] scroll_width">
            {SideBarList.map((side, index) => (
              <li className="mb-5" key={index}>
                <Link
                  href={side.link}
                  className={
                    side.link == pathname
                      ? "whitespace-nowrap bg-[#009688] text-white flex items-center p-4 text-xs lg:text-sm rounded-xl"
                      : "whitespace-nowrap lg:w-full flex items-center p-4 text-xs lg:text-sm text-black hover:bg-white hover:text-[#009688]"
                  }
                >
                  <span className={`ml-0 lg:ml-4 font-semibold`}>
                    {side.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default VerticalNavbar;
