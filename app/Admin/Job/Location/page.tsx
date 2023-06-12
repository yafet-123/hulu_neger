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
  
  async function imageUploadData() {
    const cloudName = process.env.CLOUDNAME;
    const apiKey = process.env.CLOUDAPIKEY;
    const apiSecret = process.env.CLOUDINARYSECRET;
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const formData = new FormData();
    console.log(location.Image)
    let imagesecureUrl = "";
    formData.append("file", location.Image);
    formData.append("upload_preset", "my_upload");

    // const response = await fetch('/api/Job/Location/ImageUpload', {
    //   method: 'POST',
    //   body: formData,
    // });

    const imageUpload = await fetch(
      `https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,
        {
          method: "POST",
          
          body: formData,
        },  
    ).then((r) => r.json());
    imagesecureUrl = imageUpload.secure_url;
    return imagesecureUrl;
  }

  const createLocation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageData = await imageUploadData()
    setIsSubmitting(false);
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
        router.push("/Admin/Job/Location");
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
