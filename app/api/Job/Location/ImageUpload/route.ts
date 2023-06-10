import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { formData } = await req.json();
    console.log(formData)
    const cloudName = process.env.CLOUDNAME;
    const apiKey = process.env.CLOUDAPIKEY;
    const apiSecret = process.env.CLOUDINARYSECRET;
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    
    const imageUpload = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
        },
        body: formData,
      },
      
    ).then((r) => r.json());

    console.log(imageUpload)
    return new Response(JSON.stringify(imageUpload), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify("failed to fetch the images"), { status: 500 });
  }

}