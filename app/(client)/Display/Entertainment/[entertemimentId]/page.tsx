import DisplayAll from "@/components/Admin/Job/DisplayAll";

const fetchEntertemiment = async(entertemimentId : string) => {
  const response = await fetch(process.env.URL + `/api/Entertainment/${entertemimentId}`,
    {   
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch job data');
  }

  const data = await response.json();
  return data;
}

export default async function DisplayEntertainmentviewPage({params : {entertemimentId}}) {
  const entertainment  = await fetchEntertemiment(entertemimentId);
  return (
    <section className="w-full h-full lg:pt-24">
      <DisplayAll entertainment={entertainment} />
    </section>
  );
}

export async function generateStaticParams() {
  const entertainmentview = await fetch(process.env.URL + '/api/Entertainment')
  const all = await entertainmentview.json();
  return all.map((entertainment) => ({
    entertemimentId: entertainment.entertainment_id.toString(),
  }));
}


