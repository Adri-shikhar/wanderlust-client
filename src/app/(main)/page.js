import Banner from "@/components/Banner";
import HomeLandingSections from "@/components/home/HomeLandingSections";
import { getTopDestinations } from "./lib/destinations";

export default async function Home() {
  const topDestinations = await getTopDestinations(3);

  return (
    <div>
      <Banner />
      <HomeLandingSections topDestinations={topDestinations} />
    </div>
  );
}
