import ChooseUs from "@/components/Home/component/choose";
import Heroend from "@/components/Home/component/heroend";
import Cities from "@/components/Home/component/Cities";
import FeatureProduct from "@/components/views/FeatureProduct";
import Hero from "@/components/views/Hero";
import PropertyCounters from "@/components/views/PropertyCounter";

export default function Home() {

  const counts = {
    sellProperties: "150+",
    rentProperties: "142+",
    projects: "15+",
    agents: "100+",
    agencies: "20+"
  };

  return (
    <>
    <Hero/>
    <FeatureProduct/>
    <Heroend/>
    <PropertyCounters initialCounts={counts} />
    <Cities/>
    <ChooseUs/>
    {/* <PartnersSection/> */}
    </>

  );
}
