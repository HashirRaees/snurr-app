import Image from "next/image";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";

// Placeholder data for games based on the design image
const GAMES = [
  {
    id: 1,
    title: "Blackjack",
    image: "/assets/game1.png",
    category: "Live Casino",
  },
  {
    id: 2,
    title: "Roulette",
    image: "/assets/game2.png",
    category: "Live Casino",
  },
  { id: 3, title: "Slots", image: "/assets/game3.png", category: "Slots" },
  {
    id: 4,
    title: "Poker",
    image: "/assets/game4.png",
    category: "Table Games",
  },
  {
    id: 5,
    title: "Baccarat",
    image: "/assets/game5.png",
    category: "Live Casino",
  },
  { id: 6, title: "Dice", image: "/assets/game6.png", category: "Originals" },
  { id: 7, title: "Keno", image: "/assets/game7.png", category: "Originals" },
  { id: 8, title: "Mines", image: "/assets/game8.png", category: "Originals" },
];

const CATEGORIES = ["All Games", "Popular", "New", "Live Now"];

const GamesSection = () => {
  return (
    <section id="games" className="py-20 bg-[#000000] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <div className="py-2 px-5 flex items-center rounded-full bg-white/5 border border-white/10">
            <span className="text-sm uppercase tracking-wider text-[#E9D4FF]">
              <HiOutlineSparkles className="text-[#C27AFF] mr-2 text-lg inline" />
              FEATURED GAMES
            </span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            DISCOVER GAMES
          </h2>
          <p className="text-[#E9D4FFB2] text-xl max-w-xl mx-auto font-light">
            Choose from hundreds of provably fair casino games with instant
            payouts and massive jackpots
          </p>
        </div>

        {/* Players Data */}
        <div className="flex items-center gap-4 flex-wrap justify-center mb-12">
          <div className="bg-[#59168B4D] rounded-full border gap-2 border-[#AD46FF4D] py-4 px-6 flex items-center justify-center shadow-lg">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            <span className="text-white text-xl">15,847</span>
            <span className="text-[#DAB2FF] text-base">Players Online</span>
          </div>

          <div className="bg-[#7213784D] rounded-full border gap-2 border-[#E12AFB4D] py-4 px-6 flex items-center justify-center shadow-lg">
            <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2"></span>
            <span className="text-white text-xl">52</span>
            <span className="text-[#F4A8FF] text-base">Live Games</span>
          </div>

          <div className="bg-[#733E0A4D] rounded-full border gap-2 border-[#F0B1004D] py-4 px-6 flex items-center justify-center shadow-lg">
            <HiOutlineSparkles className="text-[#FDC700] text-lg inline" />
            <span className="text-white text-xl">$182K</span>
            <span className="text-[#FDC700] text-base">Jackpot</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center mb-12">
          <div className="flex flex-wrap justify-center bg-[#3C036666] py-1 px-1 rounded-xl border border-[#AD46FF4D] gap-4">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                className={`px-8 py-1 rounded-full text-sm font-bold uppercase tracking-wide transition-all cursor-pointer
                    ${
                      idx === 0
                        ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white"
                        : "bg-transparent text-white hover:gray-400"
                    }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="bg-[#AD46FF1A] rounded-full border gap-2 border-[#AD46FF66] py-3 px-6 flex items-center justify-center shadow-lg cursor-pointer">
            <CiFilter className="text-white text-lg font-bold" />
            <span className="text-white text-sm font-bold uppercase">
              Filters
            </span>
          </div>
        </div>

        {/* Featured Large Card */}
        <div className="mx-auto mb-12 rounded-xl shadow-md shadow-[#AD46FF] overflow-hidden bg-[linear-gradient(135deg,rgba(60,3,102,0.6)_0%,rgba(0,0,0,0.6)_100%)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-64 md:min-h-full">
              <Image
                src="/assets/discover-games.jpg"
                width={400}
                height={0}
                alt="Person playing poker"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute rounded-3xl border top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase px-4 py-2 shadow-md">
                Live Now
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold uppercase mb-2 tracking-wider">
                Texas Hold'em Poker
              </h2>
              <p className="text-white text-base opacity-70 mb-8">
                High stakes poker tournaments
              </p>

              <div className="space-y-4">
                <button
                  className="w-full cursor-pointer text-white font-bold py-3 px-6 rounded-3xl text-lg uppercase transition duration-300 transform hover:scale-[1.02] 
                       bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_50%,#9810FA_100%)] hover:from-fuchsia-500 hover:to-purple-500 shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <FaPlay className="mr-2" />
                    Play Now
                  </span>
                </button>

                <button
                  className="w-full text-white font-bold py-3 px-6 rounded-3xl text-lg uppercase transition duration-300 transform hover:scale-[1.02]
                       bg-purple-800 hover:bg-purple-700 border border-purple-600/50 shadow-lg cursor-pointer"
                >
                  Try Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GAMES.map((game) => (
            <div
              key={game.id}
              className="group relative bg-[#121225] rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(160,32,240,0.2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="px-3 gap-2 md:gap-3 py-4 flex items-center justify-between">
                <button className="bg-[linear-gradient(270deg,#C27AFF_0%,#C800DE_50%,#C27AFF_100%)] text-xs md:text-sm text-white px-4 md:px-16 py-2 rounded-full font-bold uppercase tracking-wide transition-all cursor-pointer">
                  Play
                </button>

                <button
                  className="w-full text-white font-bold py-2 px-2 text-xs md:text-sm rounded-3xl uppercase transition duration-300 transform hover:scale-[1.02]
                       bg-purple-800 hover:bg-purple-700 border border-purple-600/50 shadow-lg cursor-pointer"
                >
                  Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-block bg-[linear-gradient(270deg,#C27AFF_0%,#C800DE_50%,#C27AFF_100%)] text-white px-10 py-4 rounded-full font-bold uppercase tracking-wide transition-all cursor-pointer"
          >
            View All Games
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
