import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
    </div>
  );
}
