import ChooseUs from "@/components/Home/component/choose";
import Heroend from "@/components/Home/component/heroend";
// import PartnersSection from "@/components/Home/component/partner";
import Cities from "@/components/Home/component/Cities";
import FeatureProduct from "@/components/views/FeatureProduct";
import Projects from '@/components/views/FeaturedProjects'
import Hero from "@/components/views/Hero";

export default function Home() {

  console.log("Home Page");
  return (
    <>
    <Hero/>
    <Projects />
    <FeatureProduct/>
    <Heroend/>
    <Cities/>
    <ChooseUs/>
    {/* <PartnersSection/> */}
    </>

  );
}
