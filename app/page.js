import Hero from "./sections/Hero";
import Navbar from "./components/Navbar/Navbar";
import DeferredHomepageSection from "./components/DeferredHomepageSection";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main>
        <Hero />
        <DeferredHomepageSection section="experience" minHeightClass="min-h-[32rem] md:min-h-[70rem]" />
        <DeferredHomepageSection section="projects" minHeightClass="min-h-[32rem] md:min-h-[44rem]" />
        <DeferredHomepageSection section="expertise" minHeightClass="min-h-[20rem] md:min-h-[28rem]" />
        <DeferredHomepageSection section="contact" minHeightClass="min-h-[24rem] md:min-h-[30rem]" />
      </main>
      <DeferredHomepageSection section="footer" minHeightClass="min-h-[10rem]" />
    </div>
  );
}
