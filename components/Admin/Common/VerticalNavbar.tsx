"use client"
import React, {useState,useEffect} from "react";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaBlogger,FaBlog } from "react-icons/fa"
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu, AiFillDashboard, AiOutlineUser, AiOutlineFolderAdd, AiOutlineHtml5 } from "react-icons/ai";
import { DiJavascript1, DiPython } from "react-icons/di"
import { GiArtificialIntelligence, GiArtificialHive, GiNewspaper} from "react-icons/gi"
import { SiCss3 } from 'react-icons/si'
import { MdOutlineCategory, MdLocationOn } from "react-icons/md";
import { BsNewspaper, BsFiletypeCss } from 'react-icons/bs'
import Link from 'next/link'
import { FiLogOut } from "react-icons/fi"
import { BiDownArrow, BiNews } from "react-icons/bi"
import { BsDisplay, BsFunnelFill } from 'react-icons/bs'


export default function VerticalNavbar(){
    const SideBarList = [
        { link: "/Admin", icon: <AiFillDashboard size={25}/>, name: "Dashboard",},
        { link: "/Admin/User", icon: <AiOutlineUser size={25}/>, name: "User",},
        { link: "/Admin/Job/Add", icon: <AiOutlineFolderAdd size={25}/>, name: "Add Job" },
        { link: "/Admin/Job/Display", icon: <BsDisplay size={25}/>, name: "Display Job" },
        { link: "/Admin/Job/Category", icon: <MdOutlineCategory size={25}/>, name: "Category" },
        { link: "/Admin/Job/Location", icon: <MdLocationOn size={25}/>, name: "Location" },
        { link: "/Admin/NewsCategory", icon: <BiNews size={25}/>, name: "News Category" },
        { link: "/Admin/News", icon: <GiNewspaper size={25}/>, name: "News" },
        { link: "/Admin/EntertainmentCategory", icon: <BsNewspaper size={25}/>, name: "Entertainment Category" },
        { link: "/Admin/Entertainment", icon: <BsFunnelFill size={25}/>, name: "Entertainment" },
        { link: "/Admin/HTmlCourse", icon: <AiOutlineHtml5 size={25}/>, name: "HTML Course" },
        { link: "/Admin/CSSCourse", icon: <SiCss3 size={25}/>, name: "CSS Course" },
        { link: "/Admin/JavascriptCourses", icon: <DiJavascript1 size={25}/>, name: "JavaScript Course" },
        { link: "/Admin/PythonCourses", icon: <DiPython size={25}/>, name: "Python Course" },
        { link: "/Admin/BlogsCategory", icon: <FaBlog size={25}/>, name: "Blogs Category" },
        { link: "/Admin/Blogs", icon: <FaBlogger size={25}/>, name: "Blogs" },
        { link: "/Admin/AiSearchCategory", icon: <GiArtificialHive size={25}/>, name: "AiSearch Category" },
        { link: "/Admin/AiSearch", icon: <GiArtificialIntelligence size={25}/>, name: "AiSearch" },
    ];
	const router = useRouter();
    const [sideBar , setsideBar] = useState(false);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };
    const path = router.pathname

	return(
            <div className={`flex h-full sticky top-0 bottom-0 ${sideBar ? "w-16 lg:w-28" : "w-16 lg:w-96"} pt-24`}>
                <nav className="w-full h-screen flex flex-col lg:px-4 bg-transparent dark:bg-[#02201D] scroll_width">
                    <div className="flex justify-between ml-2 lg:ml-5">
                        <h1 className={`text-2xl font-bold text-black dark:text-white ${sideBar ? "hidden" : "hidden lg:flex"}`}>Admin Page</h1>
                        <button 
                            onClick={handleSideBar} 
                            className={`flex text-black dark:text-white hover:text-slate-800 focus:outline-none ${ sideBar ? "flex justify-center items-center" : ""} `}
                        >
                            <AiOutlineMenu size={35} />
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
                                            <span className="text-xs lg:text-lg">{side.icon}</span>
                                            <span className={`ml-0 lg:ml-4 font-semibold ${sideBar ? 'hidden' : 'hidden lg:flex' } `}>
                                                {side.name}
                                            </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto flex flex-col">
                        
                    </div>
                </nav>
            </div>
	)
}