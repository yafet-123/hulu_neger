import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import formidable from 'formidable';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const cloudName = process.env.CLOUDNAME;
  const apiKey = process.env.CLOUDAPIKEY;
  const apiSecret = process.env.CLOUDINARYSECRET;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const form = new formidable.IncomingForm();

  form.parse(req, async  (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while parsing the form data.' });
    } else {
      try{
        const { formData } = files;
        console.log(formData)
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
      }catch (error) {
        return new Response(JSON.stringify("failed to fetch the images"), { status: 500 });
      }
    } 
  })
}