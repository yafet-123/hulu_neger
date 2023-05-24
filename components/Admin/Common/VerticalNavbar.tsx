"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useState,useEffect} from "react";

// font awesome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faUser,faLocationCrosshairs, faNewspaper, faTypewriter,faCameraMovie,
    faJavaScript,faCode,faCSS3Logo,faBlog , faPython} from '@fortawesome/free-solid-svg-icons'

export default function VerticalNavbar(){
    const SideBarList = [
        { link: "/Admin", icons:<FontAwesomeIcon icon={faHouse} beat size="xl" />, name: "Dashboard",},
        { link: "/Admin/User", icons:<FontAwesomeIcon icon={faUser} beat size="xl"/>,  name: "User",},
        { link: "/Admin/Job/Add",  name: "Add Job" },
        { link: "/Admin/Job/Display",  name: "Display Job" },
        { link: "/Admin/Category",  name: "Category" },
        { link: "/Admin/Location",icons:<FontAwesomeIcon icon={faLocationCrosshairs} beat size="xl" />,  name: "Location" },
        { link: "/Admin/NewsCategory", name: "News Category" },
        { link: "/Admin/News", icons:<FontAwesomeIcon icon={faNewspaper} beat size="xl" />,  name: "News" },
        { link: "/Admin/EntertainmentCategory",  name: "Entertainment Category" },
        { link: "/Admin/Entertainment", name: "Entertainment" },
        { link: "/Admin/HTmlCourse",icons:<FontAwesomeIcon icon={faCode} beat size="xl" />,  name: "HTML Course" },
        { link: "/Admin/CSSCourse", name: "CSS Course" },
        { link: "/Admin/JavascriptCourses", name: "JavaScript Course" },
        { link: "/Admin/PythonCourses", name: "Python Course" },
        { link: "/Admin/BlogsCategory",icons:<FontAwesomeIcon icon={faBlog} beat size="xl" />,  name: "Blogs Category" },
        { link: "/Admin/Blogs",  name: "Blogs" },
        { link: "/Admin/AiSearchCategory",  name: "AiSearch Category" },
        { link: "/Admin/AiSearch",  name: "AiSearch" },
    ];
   
    const router = useRouter();
    const [sideBar , setsideBar] = useState(false);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };
    const path = router.pathname

	return(
        <div className={`flex h-full sticky top-0 bottom-0 ${sideBar ? "w-16 lg:w-28" : "w-16 lg:w-96"} pt-24`}>
            <nav className="w-full h-screen flex flex-col py-8 lg:px-4 dark:bg-[#02201D] scroll_width">
                <div className="flex justify-between ml-2 lg:ml-5">
                    <h1 className={`text-2xl font-bold text-black dark:text-white ${sideBar ? "hidden" : "hidden lg:flex"}`}>Admin Page</h1>
                    <button 
                        onClick={handleSideBar} 
                        className={`flex text-black dark:text-white hover:text-slate-800 focus:outline-none ${ sideBar ? "flex justify-center items-center" : ""} `}
                    >
                        <FontAwesomeIcon icon={faBars} flip size="2xl" />
                    </button>
                </div>

                <div className="mt-10">
                    <ul>
                        {SideBarList.map((side, index) => (
                            <li className="mb-5" key={index}>
                                <Link
                                    href={side.link}
                                    className={ side.link == path ? "lg:w-full bg-white flex items-center px-4 py-2 lg:py-4 text-xs lg:text-sm text-black rounded-xl":
                                    "lg:w-full flex items-center px-4 py-2 lg:py-4 text-xs lg:text-sm text-black hover:text-white dark:text-white hover:bg-[#009688] rounded-xl" }
                                >
                                    {side.icons}
                                    <span className={`ml-0 lg:ml-4 font-semibold ${sideBar ? 'hidden' : 'hidden lg:flex' } `}>
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