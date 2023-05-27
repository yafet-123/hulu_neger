import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useState,useEffect} from "react";

export default function VerticalNavbar(){
    const SideBarList = [
        { link: "/Admin", name: "Dashboard",},
        { link: "/Admin/User",  name: "User",},
        { link: "/Admin/Job/Add",  name: "Add Job" },
        { link: "/Admin/Job/Display",  name: "Display Job" },
        { link: "/Admin/Category",  name: "Category" },
        { link: "/Admin/Location",  name: "Location" },
        { link: "/Admin/NewsCategory", name: "News Category" },
        { link: "/Admin/News",  name: "News" },
        { link: "/Admin/EntertainmentCategory",  name: "Entertainment Category" },
        { link: "/Admin/Entertainment", name: "Entertainment" },
        { link: "/Admin/HTmlCourse",  name: "HTML Course" },
        { link: "/Admin/CSSCourse", name: "CSS Course" },
        { link: "/Admin/JavascriptCourses", name: "JavaScript Course" },
        { link: "/Admin/PythonCourses", name: "Python Course" },
        { link: "/Admin/BlogsCategory", name: "Blogs Category" },
        { link: "/Admin/Blogs",  name: "Blogs" },
        { link: "/Admin/AiSearchCategory",  name: "AiSearch Category" },
        { link: "/Admin/AiSearch",  name: "AiSearch" },
    ];
   
    const router = useRouter();
    const path = router.pathname

	return(
        <div className={`flex h-full sticky top-0 bottom-0 ${sideBar ? "w-16 lg:w-28" : "w-16 lg:w-96"} pt-24`}>
            <nav className="w-full h-screen flex flex-col py-8 lg:px-4 dark:bg-[#02201D] scroll_width">
                <div className="flex justify-between ml-2 lg:ml-5">
                    <h1 className={`text-2xl font-bold text-black dark:text-white`}>Admin Page</h1>
                </div>

                <div className="mt-10">
                    <ul>
                        {SideBarList.map((side, index) => (
                            <li className="mb-5 flex flex-col lg:flex-row" key={index}>
                                <Link
                                    href={side.link}
                                    className={ side.link == path ? "lg:w-full bg-white flex items-center px-4 py-2 lg:py-4 text-xs lg:text-sm text-black rounded-xl":
                                    "lg:w-full flex items-center px-4 py-2 lg:py-4 text-xs lg:text-sm text-black hover:text-white dark:text-white hover:bg-[#009688] rounded-xl" }
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