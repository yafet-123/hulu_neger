import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment';
import 'react-quill/dist/quill.snow.css';
import { EntertainmentSharing } from './EntertainmentSharing';
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'
import 'react-quill/dist/quill.snow.css';
import BottomDisplayfrom './BottomDisplay'

export function DisplayIndvidualentertainment({entertainment,entertainmentCategory, Allcategoryet,shareUrl,quotes}) {
  	return (
	    <div className="flex flex-col flex-1 pb-20 w-full lg:w-[72%]">
		    <h1 className="text-lg lg:text-4xl font-extrabold dark:text-white text-black tracking-wide leading-snug mb-5 hover:text-[#009688]">
	            {entertainment.Header}
	        </h1>

	        <div className="lg:mr-20 h-80 lg:!h-[30rem] relative ">
	          	<Image
	            	src={entertainment.image == "" || entertainment.image == null ? "/images/logo2.png" : entertainment.image}
	            	fill
	            	className="!bg-cover w-full !h-full border rounded-xl "
	            	alt="latest entertainment image"
	          	/>
	        </div>

	        <div className="w-full flex flex-col my-5">
	            <div className="flex flex-row justify-between lg:mb-5 px-1 lg:px-2 w-full">
	                <h3 className="flex flex-col justify-between w-2/4">
	                  	{ entertainmentCategory.map((data,index)=>(
	                    	<span key={index} className="text-sm lg:text-lg font-bold dark:text-[#009688] text-slate-600 mb-1">
	                      		{data.EntertainmentCategory.CategoryName}
	                    	</span>
	                  	))}
	                </h3>
	                <h3 className="text-left font-normal text-sm lg:text-lg dark:text-[#009688] text-slate-600 w-1/4">
	                	{moment(entertainment.CreatedDate).utc().format('MMMM, Do YYYY')}
	                </h3>
	            </div>
	       
	            <div className="bg-transparent text-black dark:!text-white mt-5 ql-editor ql-snow ql-video" dangerouslySetInnerHTML={{ __html: entertainment.Description }} />
	        </div>

	        <EntertainmentSharing shareUrl={shareUrl} quotes={quotes}/>

	        <div className="flex flex-col">
	        	<h1 className="text-lg lg:text-3xl font-extrabold dark:text-white text-black tracking-wide leading-snug hover:text-[#009688]">Related Topics</h1>
	        	<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
	        		{ Allcategoryet.map((data, index)=>(
	        			<BottomDisplay key={index} entertainment={data} />
	        		))}
	        	</div>
	        </div>
	    </div>
  	);
}
