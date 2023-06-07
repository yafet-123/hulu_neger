"use client";
import Image from "next/image";
import Form from "@/components/Admin/Job/Add/Form";
import Display from "@/components/Admin/Job/Add/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const JobsCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((data) => (
        <Display key={data.job_id} jobs={data} />
      ))}
    </div>
  );
};


export default function JobHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allJob, setAllJob] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [categoryId,setCategoryId] = useState([])
  const [LocationId, setLocationId] = useState([])
  const [typechange , settypechange] = useState(true)
  const [Description , setDescription] = useState("")
  const [allJobCategory, setAllJobCategory] = useState([]);
  const [job, setJob] = useState({
    CompanyName: "",
    Image: "",
    JobsName: "",
    CareerLevel: "",
    Salary: "",
    shortDescreption: "",
    DeadLine:"",
  });
  const { data: session } = useSession();

  async function imageUploadData() {
    const formData = new FormData();
    let imagesecureUrl = "";
    formData.append("file", job.Image);

    formData.append("upload_preset", "my_upload");

    const imageUpload = await fetch(
      `https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    imagesecureUrl = imageUpload.secure_url;
    return imagesecureUrl;
  }

  const createJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageData = await imageUploadData()
    try {
      const response = await fetch("/api/Job//Add", {
        method: "POST",
        body: JSON.stringify({
          CompanyName: job.CompanyName,
          Image: imageData,
          JobsName: job.JobsName,
          CareerLevel: job.CareerLevel,
          Salary: job.Salary,
          Descreption: job.Description,
          shortDescreption: job.shortDescription,
          DeadLine: job.DeadLine,
          categoryId: categoryId,
          LocationId: LocationId,
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

  const fetchLocation = async () => {
    const response = await fetch("/api/Job/Location");
    const data = await response.json();

    setAllLocation(data);
  };

  useEffect(() => {
    fetchJob();
    fetchJobCategory();
    fetchLocation();
  }, []);
  return (
    <section className="w-full box-border lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Job"
        job={job}
        setJob={setJob}
        locations={allLocation}
        categoryId={categoryId}
        typechange={typechange}
        settypechange={settypechange}
        setCategoryId={setCategoryId}
        LocationId={LocationId}
        setLocationId={setLocationId}
        Description={Description}
        setDescription={setDescription}
        categories={allJobCategory}
        submitting={submitting}
        handleSubmit={createJob}
      />

      <JobsCardList data={allJob} />
    </section>
  );
}
