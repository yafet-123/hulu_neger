import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import DisplayView from "@/components/Home/DisplayView";
async function fetchLatestJobs() {
  const response = await fetch(
    // fetch from our code repository
    process.env.URL + "/api/Job/LatestJobs",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const latestjobs = await response.json(); // change file response json file
  return latestjobs;
}

export default async function LatestJobs() {
  const latestjobs = await fetchLatestJobs();
  return (
    <section className="w-full h-[50rem] md:px-10 md:py-10 flex flex-col brightness-100">
      <div className="flex justify-between items-center py-5 px-2 lg:px-10">
        <div className="flex items-center font-bold text-md md:text-2xl lg:text-3xl hover:text-4xl text-[#009688] dark:text-white capitalize">
          <AiOutlineClockCircle size={30} />
          <span className="ml-5">Latest Jobs</span>
        </div>
        <Link href="/Jobs">
          <div className="font-bold text-sm md:text-xl lg:text-2xl hover:text-3xl text-white p-3 lg:p-4 hover:p-5 bg-[#009688] capitalize border rounded-2xl">
            view all jobs
          </div>
        </Link>
      </div>

      <div className="md:max-w-7xl md:mx-auto bg-neutral-100 dark:bg-[#1B2637] w-full h-[40rem] border dark:border-[#000] rounded-lg md:mt-10 shadow-2xl shadow-zinc-900 flex flex-col overflow-y-scroll">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 py-10">
          {latestjobs.map((data, index) => (
            <DisplayView key={data.job_id} jobs={data} />
          ))}
        </div>
      </div>
    </section>
  );
}
