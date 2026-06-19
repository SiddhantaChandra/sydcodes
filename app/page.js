import dynamic from "next/dynamic";

import Hero from "./sections/Hero";
import Navbar from "./components/Navbar/Navbar";

const Experience = dynamic(() => import("./sections/Experience"));
const Projects = dynamic(() => import("./sections/Projects"));
const TechnicalExpertise = dynamic(() => import("./sections/TechnicalExpertise"));
const ContactMe = dynamic(() => import("./sections/ContactMe"));
const Footer = dynamic(() => import("./sections/Footer"));

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <TechnicalExpertise />
        <ContactMe />
      </main>
      <Footer />
    </div>
  );
}
