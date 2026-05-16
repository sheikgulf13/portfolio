import About from "@/components/portfolio/About";
import Capabilities from "@/components/portfolio/Capabilities";
import Contact from "@/components/portfolio/Contact";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Navigation from "@/components/portfolio/Navigation";
import NoiseOverlay from "@/components/portfolio/NoiseOverlay";
import PortfolioEffects from "@/components/portfolio/PortfolioEffects";
import Process from "@/components/portfolio/Process";
import StackMarquee from "@/components/portfolio/StackMarquee";
import Testimonial from "@/components/portfolio/Testimonial";

export default function Home() {
  return (
    <>
      <NoiseOverlay />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        {/* <Work /> */}
        <StackMarquee />
        <Capabilities />
        <Testimonial />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <PortfolioEffects />
    </>
  );
}