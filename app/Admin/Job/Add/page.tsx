"use client";
import Image from 'next/image'
import Form from "@/components/Admin/Job/Form";
import Display from "@/components/Admin/Job/Display";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const JobCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((data) => (
        <Display
          key={data._id}
          Job={data}
        />
      ))}
    </div>
  );
};

export default function JobHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allJob, setAllJob] = useState([]);
  const [allJobCategory, setAllJobCategory] = useState([]);
  const [job, setJob] = useState({ CompanyName : "", Image:"", JobsName:"", CareerLevel:"", Salary:"", Descreption:"", shortDescreption:"", LocationId:[], categoryId:[]  });
  const { data: session } = useSession();
  const createJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/Job//Add", {
        method: "POST",
        body: JSON.stringify({
          CompanyName:job.CompanyName,
          Image:job.imageData,
          JobsName:job.JobsName,
          CareerLevel:job.CareerLevel,
          Salary:job.Salary,
          Descreption:job.Description,
          shortDescreption:job.shortDescription,
          DeadLine:job.DeadLine,
          categoryId:job.categoryId,
          LocationId:job.LocationId,
          user_id: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/Admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchJob = async () => {
    const response = await fetch("/api/Job");
    const data = await response.json();

    setAllJob(data);
  };

  const fetchJobCategory = async () => {
    const response = await fetch("/api/Job/Category");
    const data = await response.json();

    setAllJobCategory(data);
  };

  useEffect(() => {
    fetchJob();
    fetchJobCategory();
  }, []);
  return (
    <section className='w-full box-border lg:pt-24'>
      <Form
        type='Create'
        typeof="Job"
        job={job}
        setJob={setJob}
        categories={allJobCategory}
        submitting={submitting}
        handleSubmit={createJob}
      />

      <JobCardList data={allJob} />
    </section>
  )
}
