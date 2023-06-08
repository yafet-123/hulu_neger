"use client";
import Image from "next/image";
import Form from "@/components/Admin/Courses/Form";
import Display from "@/components/Admin/Courses/Display";

const fetchCourse = async(courseId : string) => {
  const data = await fetch(`/api/Html/${courseId}`);
  const course = await data.json();
  return course
}

export default function HtmlView({params : {courseId} }) {
  const course  = await fetchCourse(courseId);
  console.log(courseId)
  return (
    <section className="w-full h-full lg:pt-24">
      
    </section>
  );
}

export async function generateStaticParams() {
  const htmlview = await fetch('/api/Html').then((res) => res.json());
 
  return htmlview.map((html) => ({
    courseId: html.course_id.toString(),
  }));
}

