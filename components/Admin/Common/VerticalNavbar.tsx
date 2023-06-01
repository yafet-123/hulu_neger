'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, {useState,useEffect} from "react";

const VerticalNavbar:React.FC = () => {
    const SideBarList = [
        { link: "/Admin", name: "Dashboard",},
        { link: "/Admin/User",  name: "User",},
        { link: "/Admin/Job/Add",  name: "Add Job" },
        { link: "/Admin/Job/Display",   name: "Display Job" },
        { link: "/Admin/Job/Category",   name: "Category" },
        { link: "/Admin/Job/Display",   name: "Location" },
        { link: "/Admin/News/Category",   name: "News Category" },
        { link: "/Admin/Job/Display",   name: "News" },
        { link: "/Admin/Entertainment/Category",   name: "Entertainment Category" },
        { link: "/Admin/Job/Display",   name: "Entertainment" },
        { link: "/Admin/Job/Display",   name: "HTML Course" },
        { link: "/Admin/Job/Display",   name: "CSS Course" },
        { link: "/Admin/Job/Display",   name: "JavaScript Course" },
        { link: "/Admin/Job/Display",   name: "Python Course" },
        { link: "/Admin/Blogs/Category",   name: "Blogs Category" },
        { link: "/Admin/Job/Display",   name: "Blogs" },
        { link: "/Admin/Job/Display",   name: "AiSearch Category" },
        { link: "/Admin/Job/Display",   name: "AiSearch" },
    ];
    const pathname = usePathname();
    console.log(pathname)
	return(
        <div className={`flex h-full sticky top-0 bottom-0 w-full lg:w-60 pt-24 `}>
            <nav className="w-full lg:h-screen flex flex-col py-8 lg:px-4 dark:bg-[#02201D]">
                <div className="flex justify-between ml-2 lg:ml-5">
                    <h1 className={`text-2xl font-bold text-black dark:text-white`}>Admin Page</h1>
                </div>

                <div className="mt-10">
                    <ul className="flex flex-row lg:flex-col w-full lg:w-60 lg:h-[50rem] sticky top-0 bottom-0 scroll_width">
                        {SideBarList.map((side, index) => (
                            <li className="mb-5" key={index}>
                                <Link
                                    href={side.link}
                                    className={ side.link == pathname ? "whitespace-nowrap bg-[#009688] text-white flex items-center p-4 text-xs lg:text-sm rounded-xl":
                                    "whitespace-nowrap lg:w-full flex items-center p-4 text-xs lg:text-sm text-black hover:bg-white hover:text-[#009688]" }
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
	)
}

export default VerticalNavbar