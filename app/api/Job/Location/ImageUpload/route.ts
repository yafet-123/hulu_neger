import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export const POST = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
  });
  const { formData } = await req.json();
  const stream = Readable.from(formData.buffer);
  const uploadResponse = await cloudinary.uploader.upload(stream, {
    upload_preset: 'Location',
  });
  console.log(uploadResponse.secure_url)
  res.status(200).json({ url: uploadResponse.secure_url });
}