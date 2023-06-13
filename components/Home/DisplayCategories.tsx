import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const DisplayCategories = ({ category }) => {
  const categoryId = category.category_id;
  const categoryName = category.CategoryName;
  const howMany = category._count.JobCategory;
  return (
    <Link
      className="flex justify-between items-center mb-3 group hover:bg-[#009688] px-2 lg:px-4 py-2 w-full"
      key={index}
      type="button"
      href={`Job/Category/${categoryId}/${categoryName}/${howMany}`}
    >
      <h1 className="w-2/4 lg:w-3/4 text-left text-black dark:text-white font-normal text-xs md:text-lg lg:text-xl capitalize group-hover:text-white">
        {category.CategoryName}
      </h1>
      <h1 className="w-1/4 px-2 lg:px-5 py-2 text-black dark:text-white border rounded-xl border-[#009688] text-[#009688] font-bold text-xs md:text-lg lg:text-xl group-hover:text-white group-hover:text-white group-hover:border-white">
        {category.count}
      </h1>
    </Link>
  );
};

export default DisplayCategories;
