import Link from "next/link";
import Multiselect from 'multiselect-react-dropdown';
import { ServiceData } from '@/data/AiSearch/data'

const Form = ({ type, typeofCategory, categories , aiSearch, setaiSearch, submitting, handleSubmit }) => {
  return (
    <section className='w-full lg:px-20'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} {typeofCategory}</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} the {typeofCategory} that are used to search the ai that are used in different fields
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full flex flex-col gap-7 glassmorphism'
      >
        <div className="flex flex-col my-10 w-full px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5 px-2">
            <div className="relative flex-1">
                <input 
                  id="Header" 
                  type="text" 
                  required
                  className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  value={aiSearch.Header}
                  onChange={(e) => setaiSearch({ ...aiSearch, Header: e.target.value })}
                />
                <label 
                    htmlFor="floating_outlined" 
                    className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                    Header
                </label>
            </div>

            <div className="relative flex-1">
              <input 
                id="Link" 
                type="text" 
                required
                className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                value={aiSearch.link}
                onChange={(e) => setaiSearch({ ...aiSearch, link: e.target.value })}
              />
              <label 
                htmlFor="floating_outlined" 
                className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Link
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5 px-2">
            <div className="mb-10 ">
              <Multiselect
                displayValue="title"
                placeholder = "Services"
                className="z-40 w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={(e)=>{
                  e.map((data,index)=>(
                      setaiSearch({ ...aiSearch, service: data.title })
                  ))
                }}
                options={ServiceData}
              />
            </div>

            <div className="mb-10 ">
              <Multiselect
                displayValue="CategoryName"
                placeholder = "Category"
                className="z-30 w-full px-0 lg:px-3 text-md lg:text-xl !text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={(e)=>{
                    e.map((data,index)=>(
                        setaiSearch({ ...aiSearch, categoryId: data.category_id })
                    ))
                }}
                options={categories}
              />
            </div>
          </div>

          <div className="relative flex-1">
            <textarea 
              id="description" 
              rows="7" 
              cols="50"
              required
              className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
              value={aiSearch.description}
              onChange={(e) => setaiSearch({ ...aiSearch, description: e.target.value })}
            />
            <label 
              htmlFor="floating_outlined" 
              className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[10%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Description
            </label>
          </div>
        </div>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/Admin' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
