import Navbar from "../components/homepage/Navbar";
import Hero from "../components/homepage/Hero";
import GamesSection from "../components/homepage/GamesSection";
import RewardsSection from "../components/homepage/RewardsSection";
import HowToPlaySection from "../components/homepage/HowToPlaySection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050511] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="relative">
        {/* Shared background noise/grain or global gradients could go here */}
        <div className="absolute top-0 left-0 w-full h-[1500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

        <GamesSection />
        <RewardsSection />
        <HowToPlaySection />
      </div>
      <Footer />
    </main>
  );
}
