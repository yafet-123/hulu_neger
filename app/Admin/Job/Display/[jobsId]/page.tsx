import Image from "next/image";
import DisplayAll from "@/components/Admin/Job/DisplayAll";

const fetchJob = async(jobsId : string) => {
  const data = await fetch(process.env.URL + `/api/Job/${jobsId}`,
    {   
      next: {
        revalidate: 60,
      },
    }
  );
  
  return data
}

export default async function JobView({params : {jobsId} }) {
  const job  = await fetchJob(jobsId);
  console.log(jobsId)
  return (
    <section className="w-full h-full lg:pt-24">
      <DisplayAll job={job} />
    </section>
  );
}

export async function generateStaticParams() {
  const jobview = await fetch(process.env.URL + '/api/Job')
  const all = await jobview.json();
  return all.map((html) => ({
    jobsId: html.job_id.toString(),
  }));
}

