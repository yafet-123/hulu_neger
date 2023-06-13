import DisplayAll from "@/components/Admin/Job/DisplayAll";

const fetchJobs = async(jobsId : string) => {
  const response = await fetch(process.env.URL + `/api/Job/${jobsId}`,
    {   
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch job data');
  }

  const data = await response.json();
  return data;
}

export default async function DisplayHomePage({params : {jobsId}}) {
  const job  = await fetchJobs(jobsId);
  console.log(job)
  return (
    <section className="w-full h-full lg:pt-24">
      <DisplayAll job={job} />
    </section>
  );
}

export async function generateStaticParams() {
  const jobview = await fetch(process.env.URL + '/api/Job')
  const all = await jobview.json();
  return all.map((job) => ({
    jobsId: job.job_id.toString(),
  }));
}


