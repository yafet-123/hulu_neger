"use client";
import React from "react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { useState } from "react";
import DisplayCategories from "@/components/Home/DisplayCategories";
import DisplayLocation from "@/components/Home/DisplayLocation";

async function fetchLocation() {
  const response = await fetch(
    // fetch from our code repository
    process.env.URL + "/api/Job/Location",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const locations = await response.json(); // change file response json file
  return locations;
}

async function fetchCategories() {
  const response = await fetch(
    // fetch from our code repository
    process.env.URL + "/api/Job/Category",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const categories = await response.json(); // change file response json file
  return categories;
}

export default async function SearchJobs() {
  const [jobs, setJobs] = useState("category");
  const locations = await fetchLocation();
  const categories = await fetchCategories();
  return (
    <div className="flex flex-col w-full h-full py-20 px-0 md:px-32">
      <h1 className="font-semibold text-[#009688] dark:text-white text-md md:text-3xl lg:text-4xl capitalize w-full">
        Search and Find Jobs in Ethiopia
      </h1>
      <hr className="w-full bg-black dark:bg-gray-200 mb-5" />
      <div className="flex w-full h-[30rem] lg:h-[45rem] p-2">
        <div className="w-[75%] flex-1 border dark:border-[#000] rounded-xl shadow-2xl shadow-zinc-900 p-5 bg-neutral-100 dark:bg-[#1B2637]">
          <div className="w-full h-full overflow-y-scroll">
            {jobs == "category" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {categories.map((data, index) => (
                  <DisplayCategories key={data.category_id} category={data} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {locations.map((data, index) => (
                  <DisplayLocation key={data.location_id} location={data} />
                ))}
              </div>
            )}
          </div>
        </div>

        <ul className="mt-5">
          <li
            onClick={(e) => setJobs("category")}
            className={
              jobs == "category"
                ? "py-3 bg-[#009688] px-6 border border-slate-300 flex items-center text-white dark:border-none hover:font-bold -ml-1"
                : "py-3 bg-gray-200 dark:bg-slate-600 border-4 border-y-white dark:border-slate-700 flex items-center hover:bg-white hover:text-black"
            }
          >
            <span className="font-bold text-md lg:text-lg">
              <BiCategory />
            </span>
            <span className="hidden lg:inline-flex text-xl ml-2 lg:ml-3">
              Jobs by Category
            </span>
          </li>
          <li
            onClick={(e) => setJobs("location")}
            className={
              jobs == "location"
                ? "py-3 bg-[#009688] px-6 border border-slate-300 flex items-center text-white dark:border-none hover:font-bold -ml-1s"
                : "py-3 bg-gray-200 dark:bg-slate-600 border-4 border-y-white dark:border-slate-700 flex items-center hover:bg-white hover:text-black"
            }
          >
            <span className="font-bold text-md lg:text-lg">
              <GoLocation />
            </span>
            <span className="hidden lg:inline-flex text-xl ml-3">
              Jobs by Location
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
