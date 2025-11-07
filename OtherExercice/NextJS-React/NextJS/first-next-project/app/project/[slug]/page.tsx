export default async function projects({params}: {params: Readonly<{slug: string}>}) {
  const {slug} = await params;
  return (
    <div>
      <p>Project Title for {slug}</p>
      <p>Project Description for {slug}</p>
      <p>Projects Page for {slug}</p>
    </div>
  );
}