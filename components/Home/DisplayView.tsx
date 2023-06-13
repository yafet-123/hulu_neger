import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const DisplayView = ({ jobs }) => {
  const jobsId = jobs.job_id;
  return (
    <Link
      className="flex justify-around items-center mb-5 px-10 py-5 group hover:bg-[#009688]"
      href={`Display/Job/${jobsId}`}
    >
      <div className="flex flex-row w-full">
        <Image
          src={
            jobs.Image == "" || jobs.Image == null
              ? "/images/bgImage1.avif"
              : jobs.Image
          }
          width={100}
          height={100}
          alt="image"
          required
          className="my-5"
        />
        <div className="flex flex-col pt-2 lg:pt-0 ml-2 lg:ml-5">
          <h1 className="text-left font-bold text-sm md:text-lg lg:text-xl text-[#009688] dark:text-white group-hover:text-white">
            {jobs.JobsName}
          </h1>
          <h1 className="text-left font-light text-xs md:text-sm lg:text-lg text-[#009688] dark:text-white group-hover:text-white">
            {jobs.CompanyName}
          </h1>
          <h1 className="font-light text-xs md:text-sm lg:text-lg text-[#009688] dark:text-white text-left group-hover:text-white">
            {moment(jobs.createDate).utc().format("YYYY-MM-DD")}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default DisplayView;
