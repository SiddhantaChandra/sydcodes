import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import TechnicalExpertise from "./sections/TechnicalExpertise";
import ContactMe from "./sections/ContactMe";
import Footer from "./sections/Footer";
import Navbar from "./components/Navbar/Navbar";

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
