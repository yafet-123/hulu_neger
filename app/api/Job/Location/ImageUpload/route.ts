import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import formidable from 'formidable';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const cloudName = process.env.CLOUDNAME;
  const apiKey = process.env.CLOUDAPIKEY;
  const apiSecret = process.env.CLOUDINARYSECRET;
  const url = process.env.CLOUDINARYURL
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const file = req.body.file;
  console.log(file)
   try{
    
    // const formData = new FormData();
    // formData.append("file", location.Image);
    // formData.append("upload_preset", "my_upload");
    // console.log(formData)
    // const imageUpload = await fetch(
    //    `https://api.cloudinary.com/v1_1/df7hlpjcj/image/upload`,
    //      {
    //        method: "POST",
           
    //        body: file,
    //      },  
    //  ).then((r) => r.json())
    // console.log(imageUpload)
    return new Response(JSON.stringify(imageUpload), { status: 201 });
    }catch (error) {
      return new Response(JSON.stringify("failed to fetch the images"), { status: 500 });
    }
}