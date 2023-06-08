import Image from "next/image";
import DisplayAll from "@/components/Admin/Courses/DisplayAll";

const fetchCourse = async(courseId : string) => {
  const data = await fetch(process.env.URL + `/api/Javascript/${courseId}`,
    {   
      next: {
        revalidate: 60,
      },
    }
  );
  const course = await data.json();
  return course
}

export default async function JavascriptView({params : {courseId} }) {
  const course  = await fetchCourse(courseId);
  console.log(courseId)
  return (
    <section className="w-full h-full lg:pt-24">
      <DisplayAll course={course} />
    </section>
  );
}

export async function generateStaticParams() {
  const htmlview = await fetch(process.env.URL + '/api/Javascript').then((res) => res.json());
 
  return htmlview.map((html) => ({
    courseId: html.course_id.toString(),
  }));
}

