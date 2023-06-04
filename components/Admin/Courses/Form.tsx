"use client";
import Link from "next/link";
import Multiselect from "multiselect-react-dropdown";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React, { useMemo, useRef } from "react"
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(
  async () => {
    const QuillNoSSRWrapper = (await import("react-quill")).default
    function Imagehandle({ forwardedRef, ...rest }){
        return <QuillNoSSRWrapper ref={forwardedRef} {...rest} />
    }
    return Imagehandle
  },
  {
    ssr: false,
  },
)

const Form = ({
  type,
  typeofCategory,
  title,
  settitle,
  content,
  setcontent,
  submitting,
  handleSubmit,
}) => {
  const quillRef = useRef(null)
  const blob = new Blob([entertainment.Image], { type: "image" });
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["link", "image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },

      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  function imageHandler() {
    console.log(quillRef);
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    const value = prompt("Please enter the image URL");
    console.log(value);
    console.log(range);
    console.log(editor);
    if (value && range) {
      editor.insertEmbed(range.index, "image", value, "user");
    }
  }
  return (
    <section className="w-full lg:px-20">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} {typeofCategory}
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} the {typeofCategory} share amazing entertainment with the hulu_neger, and
        help millions of connect with the worlds.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col gap-7 glassmorphism"
      >
        <div className="relative flex-1 my-5">
                        <input  
                            id="title" 
                            type="text" 
                            required
                            className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Title
                        </label>
                    </div>

                    <div className="mb-10 ">
                        <p  
                            className="text-md lg:text-xl text-black dark:text-white mb-5 mx-5"
                        >
                            Content
                        </p>

                        <QuillNoSSRWrapper 
                            forwardedRef={quillRef} 
                            value={content} 
                            onChange={setcontent} 
                            modules={modules} className="!bg-white dark:!bg-white dark:!text-black !mx-2 !my-5" 
                            theme="snow" 
                        />
                    </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/Admin" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
