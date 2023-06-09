import Image from "next/image";
import Display from "@/components/Admin/Job/Add/Display";

const fetchJob = async() => {
  const data = await fetch(process.env.URL + `/api/Job`,
    {   
      next: {
        revalidate: 60,
      },
    }
  );
  const jobview = await data.json();
  return jobview
}

export default async function JobDisplayHome() {
  const job  = await fetchJob();
  return (
    <section className="w-full flex-center flex-col pt-24">
      <div className="mt-16 prompt_layout">
        {job.map((data) => (
          <Display key={data.job_id} jobs={data} />
        ))}
      </div>
    </section>
  );
}