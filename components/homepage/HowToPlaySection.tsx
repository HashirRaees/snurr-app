import { HiOutlineSparkles } from "react-icons/hi";
import { GoTrophy } from "react-icons/go";
import { LuMedal,LuGamepad2  } from "react-icons/lu";
import { LiaCrownSolid } from "react-icons/lia";
import { FiUserPlus } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const STEPS = [
  {
    id: 1,
    title: "Create Account",
    desc: "Sign up in 30 seconds with email or social login. No verification delays, instant access.",
    icon: FiUserPlus,
  },
  {
    id: 2,
    title: "Add Funds",
    desc: "Deposit using crypto, cards, or e-wallets. Instant processing with zero fees guaranteed.",
    icon: BsWallet2,
  },
  {
    id: 3,
    title: "Choose Your Game",
    desc: "Browse 500+ provably fair games across all categories. Find your favorite and start playing.",
    icon: LuGamepad2 ,
  },
  {
    id: 4,
    title: "Win & Withdraw",
    desc: "Compete, win big prizes, and cash out instantly. Lightning-fast withdrawals with no hidden fees.",
    icon: GoTrophy,
  },
];

const STATS = [
  { label: "TOTAL WINNINGS", value: "$182M+", icon: GoTrophy },
  { label: "WINNERS TODAY", value: "45.2K+", icon: LiaCrownSolid },
  { label: "BIGGEST WIN", value: "$45.2K", icon: LuMedal },
  { label: "AVG PAYOUT TIME", value: "<2MIN", icon: HiOutlineSparkles }, // Using diamond as placeholder sparkle
];

const HowToPlaySection = () => {
  return (
    <section
      id="how-to-start"
      className="py-24 relative overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#3C0366]/40 border border-[#AD46FF]/30 text-[10px] font-bold uppercase tracking-widest text-[#DAB2FF] mb-6">
            <IoMdCheckmarkCircleOutline className="text-base text-[#C27AFF]" />{" "}
            Quick Start Guide
          </div>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-6 tracking-wide">
            HOW TO GET STARTED
          </h2>
          <p className="text-[#E9D4FFB2] font-light max-w-2xl mx-auto text-lg leading-relaxed">
            Your journey to winning begins here. Four simple steps to start
            playing and earning.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mb-32">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#AD46FF]/50 to-transparent -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-7 md:space-y-10">
            {STEPS.map((step, idx) => {
              const isEven = (idx + 1) % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 relative`}
                >
                  {/* Left Side (Content for Odd, Empty for Even) */}
                  <div
                    className={`w-full md:w-1/2 flex ${
                      isEven ? "justify-start" : "justify-end"
                    } order-2 md:order-1 px-4 md:px-12`}
                  >
                    {!isEven && (
                      <div
                        className="bg-[linear-gradient(135deg,rgba(60,3,102,0.6)_0%,rgba(60,3,102,0.2)_100%)]
 border border-white/5 p-8 rounded-2xl w-full max-w-lg relative group hover:border-[#AD46FF]/50 transition-all shadow-lg hover:shadow-[#AD46FF]/20"
                      >
                        <h3 className="font-heading text-3xl text-white mb-3 tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-[#E9D4FFB2] text-sm font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Icon Node */}
                  <div className="relative z-10 order-1 md:order-2">
                    <div
                      className="w-20 h-20 rounded-full border-2 border-white bg-[linear-gradient(90deg,#9810FA_0%,rgba(0,0,0,0)_100%)]
 flex items-center justify-center shadow-[0_0_20px_rgba(173,70,255,0.4)] relative"
                    >
                      <step.icon className="text-3xl text-white" />
                      {/* Step Number Badge */}
                      <div className="absolute -top-1 -right-1 w-7 h-7 border border-black rounded-full bg-[#D026FF] flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {step.id}
                      </div>
                    </div>
                    {/* Glow behind node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#AD46FF]/20 blur-3xl -z-10 rounded-full"></div>
                  </div>

                  {/* Right Side (Content for Even, Empty for Odd) */}
                  <div
                    className={`w-full md:w-1/2 flex ${
                      isEven ? "justify-start" : "justify-end"
                    } order-3 px-4 md:px-12`}
                  >
                    {isEven && (
                      <div
                        className="bg-[linear-gradient(135deg,rgba(60,3,102,0.6)_0%,rgba(60,3,102,0.2)_100%)]
 border border-white/5 p-8 rounded-2xl w-full max-w-lg relative group hover:border-[#AD46FF]/50 transition-all shadow-lg hover:shadow-[#AD46FF]/20"
                      >
                        <h3 className="font-heading text-3xl text-white mb-3 tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-[#E9D4FFB2] text-sm font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative shadow-[0_0_60.8px_13px_#C27AFF] rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9d00ff] to-[#d600d6]"></div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-8 text-center group hover:bg-white/5 transition-colors"
              >
                <stat.icon className="w-8 h-8 mx-auto text-white mb-4 opacity-80" />
                <div className="font-heading text-4xl text-white mb-2 shadow-black drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToPlaySection;
