"use client";
import Image from 'next/image'
import Form from "@/components/Admin/Location/Form";
import Display from "@/components/Admin/Location/Display";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
interface Location {
  LocationName:string;
  Image:string;
}

const LocationCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((location) => (
        <Display
          key={location.category_id}
          location={location}
        />
      ))}
    </div>
  );
};


export default function LocationCategoryHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allLocation, setAllLocation] = useState([]);
  const [location, setLocation] = useState<Location>({ LocationName: "", Image:"" });
  const { data: session } = useSession();
  const createLocation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/Location/Add", {
        method: "POST",
        body: JSON.stringify({
          LocationName: location.LocationName,
          Image:location.Image
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

  const fetchLocation = async () => {
    const response = await fetch("/api/Location");
    const data = await response.json();

    setAllLocation(data);
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  return (
    <section className='w-full box-border lg:pt-24'>
      <Form
        type='Create'
        typeofCategory="Location"
        location={location}
        setLocation={setLocation}
        submitting={submitting}
        handleSubmit={createLocation}
      />

      <LocationCardList data={allLocation} />
    </section>
  )
}
