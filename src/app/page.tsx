import Cities from "@/components/Home/component/Cities";
import FeatureProduct from "@/components/FeatureProduct";
import Hero from "@/components/Home/component/Hero";
import Heroend from "@/components/Home/component/heroend";
import ChooseUs from "@/components/Home/component/choose";
import PartnersSection from "@/components/Home/component/partner";
export default function Home() {
  return (
    <>
    <Hero/>
    <FeatureProduct/>
    <Heroend/>
    <Cities/>
    <ChooseUs/>
    <PartnersSection/>
    </>

  );
}
