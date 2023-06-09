"use client";
import Image from "next/image";
import Form from "@/components/Admin/Location/Form";
import Display from "@/components/Admin/Location/Display";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
interface Location {
  LocationName: String;
  Image: String;
}

const LocationCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((location) => (
        <Display key={location.location_id} location={location} />
      ))}
    </div>
  );
};

export default function LocationCategoryHome() {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [allLocation, setAllLocation] = useState([]);
  const [location, setLocation] = useState({
    LocationName: "",
    Image: "",
  });
  const { data: session } = useSession();
  console.log(location)
  async function imageUploadData() {
    const formData = new FormData();
    formData.append("file", location.Image);

    const response = await fetch('/api/Job/Location/ImageUpload', {
      method: 'POST',
      body: formData,
    });

    
  }

  const createLocation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageData = await imageUploadData()
    
    try {
      const response = await fetch("/api/Job/Location/Add", {
        method: "POST",
        body: JSON.stringify({
          LocationName: location.LocationName,
          Image: imageData,
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
    const response = await fetch("/api/Job/Location");
    const data = await response.json();

    setAllLocation(data);
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  return (
    <section className="w-full box-border lg:pt-24">
      <Form
        type="Create"
        typeofCategory="Location"
        location={location}
        setLocation={setLocation}
        submitting={submitting}
        handleSubmit={createLocation}
      />

      <LocationCardList data={allLocation} />
    </section>
  );
}
