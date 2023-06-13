import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const DisplayLocation = ({ location }) => {
  const locationId = location.location_id;
  const image = location.Image;
  const howMany = location.count;
  const locationName = location.LocationName;
  console.log(locationName);
  return (
    <Link
      className="w-full flex items-center mb-3 group hover:bg-[#009688] px-2 lg:px-4 py-2"
      type="button"
      href={`Job/Location/${locationId}/${image}/${howMany}/${locationName}`}
    >
      <Image
        src={location.Image == null ? "/images/bgImage1.avif" : location.Image}
        width={50}
        height={50}
        alt="image that will be displayed"
      />
      <div className="flex flex-col ml-5 lg:ml-10">
        <h1 className="text-black dark:text-white font-normal text-xs md:text-lg lg:text-xl capitalize group-hover:text-white mb-5">
          jobs in {location.LocationName}
        </h1>
        <h1 className="text-black dark:text-white text-left text-[#009688] font-bold text-xs md:text-lg lg:text-xl group-hover:text-white group-hover:border-orange-200">
          {location.count}
        </h1>
      </div>
    </Link>
  );
};

export default DisplayLocation;
