import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients/Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[150px] rounded-full" />
      <div className="absolute inset-0 z-1 top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]" />
      {/* Chips/Cards Graphics - Simplified placeholders using gradient circles/divs if no exact assets for floating elements */}
      {/* In a real scenario, we'd use <Image /> with the provided floating asset images */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl mb-6 tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          <span className="block">PLAY. EARN. WIN.</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-2xl max-w-xl mb-10 font-light tracking-wide">
          Experience the ultimate crypto casino with provably fair games and
          instant withdrawals.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/signup"
            className="bg-[linear-gradient(270deg,#C27AFF_0%,#C800DE_50%,#C27AFF_100%)] text-white text-lg px-10 py-4 rounded-full font-heading tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all transform hover:scale-105"
          >
            Start Playing
          </Link>
        </div>

        {/* Stats Preview or Trust Badges could go here */}
      </div>

      {/* Background Image Overlay if needed */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/home-bg.png')] bg-cover bg-center opacity-50"></div>
    </section>
  );
};

export default Hero;
