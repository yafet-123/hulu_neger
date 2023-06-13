"use client";

import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Display = ({ location, handleEdit }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const locationId = location.location_id;
  const handleCopy = () => {
    setCopied(location.LocationName);
    navigator.clipboard.writeText(location.LocationName);
    setTimeout(() => setCopied(false), 3000);
  };

  async function imageDeleteData() {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/${location.Image}`;
    const apiKey = process.env.CLOUDAPIKEY;
    const apiSecret = process.env.CLOUDINARYSECRET;

    try {
      const res = await fetch(cloudinaryUrl, {});
      if (response.status === 200) {
        router.push("/Admin/Job/Location");
      } else {
        res.status(response.status).json({ error: "Failed to delete image" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this Location for Jobs?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/Job/Location/${locationId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          imageDeleteData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="prompt_card lg:px-20">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-between items-center gap-3 cursor-pointer">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {location.location_id}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {moment(location.ModifiedDate).utc().format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === location.LocationName
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === location.LocationName ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center my-5">
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {location.LocationName}
        </p>
        <Image
          src={
            location.Image == "" || location.Image == null
              ? "/images/logo2.png"
              : location.Image
          }
          alt="location Image"
          width={100}
          height={100}
        />
      </div>
      {session?.user.email === location.email && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Display;
