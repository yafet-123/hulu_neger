import moment from "moment";
import Image from "next/image";
import Link from 'next/link'
import { AiOutlineEye } from "react-icons/ai";

const BottomDisplay = ({ entertainment }) => {
	const entertainmentId = entertainment.Entertainment.entertainment_id
  return (
    <div >
	    <Link 
	       href = 	{`/Display/Entertainment/${entertainmentId}`}
	       id={entertainment.Entertainment.entertainment_id} className="flex flex-col w-full group pt-5"
	     >
	      <div className="w-full !h-52 lg:!h-72 relative">
	        <Image src={entertainment.Entertainment.Image} fill className="!bg-cover w-full !h-full border rounded-xl" alt="latest news image"/>
	     	</div>

	      <h1 className="text-left group-hover:text-[#009688] group-hover:underline text-lg lg:text-xl font-extrabold dark:text-[#009688] text-slate-600 tracking-wide leading-snug">
	        {entertainment.Entertainment.Header}
	      </h1>
	     	<div  className="text-lg group-hover:text-[#009688] bg-transparent text-black dark:!text-white text-left mt-2" dangerouslySetInnerHTML={{ __html: data.Entertainment.ShortDescription }} />
	    </Link>

	    <div className="flex items-center justify-between text-sm"> 
	    	<h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
          {moment(entertainment.CreatedDate).utc().format('MMMM, Do YYYY')}
        </h3>
	     	<p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
	      	<AiOutlineEye size={32} />
	      	<span className="ml-3">{entertainment.Entertainment.view}</span>
	      </p>
	    </div>
	  </div>
  );
};

export default BottomDisplay;
