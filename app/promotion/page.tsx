import Link from "next/link";
import Navbar from "../../components/homepage/Navbar";
// import Footer from "../components/Footer";
import { GoGift } from "react-icons/go";
import { PiLightning } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuCrown, LuCalendar } from "react-icons/lu";

export default function PromotionPage() {
  return (
    <div className="min-h-screen bg-[#050511] font-sans selection:bg-primary/30">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -z-10"></div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Exclusive Promotions
          </h1>
          <p className="text-[#E9D4FFB2] text-lg">
            Maximize your winnings with our amazing bonus offers
          </p>
        </div>

        {/* Promotion cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* card 1 */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(89,22,139,0.2)_100%)] shadow-[0_0_26.1px_1px_#AD46FF47] border border-[#C27AFF80] rounded-2xl py-5 px-5 group hover:border-[#9810FA]/50 transition-all">
            <div className="flex justify-between w-full">
              <div className="w-16 h-16 shadow-[0_0_26.6px_2px_#DAB2FF] bg-[#AD46FF4D] rounded-full flex items-center justify-center mb-6 transition-transform">
                <GoGift className="text-3xl text-[#DAB2FF]" />
              </div>
              <div className="bg-[#AD46FF33] border border-[#C27AFF80] h-7 items-center rounded-2xl px-2 py-1 flex">
                <p className="text-[#DAB2FF] text-xs uppercase">New players</p>
              </div>
            </div>
            <h3 className="text-white text-xl mb-2">Welcome Bonus</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              Get 100% match on your first deposit up to $500
            </p>
            <div className="border-t border-[#FFFFFF1A] py-3">
              <p className="text-[#DAB2FF80] text-xs">
                Min deposit $20 • Wagering 35x
              </p>
            </div>
            <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-[#9810FA4D] border border-[#C27AFF80] text-[#DAB2FF] hover:bg-[#9810FA]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Claim Now <IoIosArrowForward />
            </button>
          </div>

          {/* card2 */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(126,42,12,0.2)_100%)]  border border-[#FF890480] shadow-[0_0_40.8px_1px_#FF690075] rounded-2xl py-5 px-5 group hover:border-[#FFA500]/50 transition-all">
            <div className="flex justify-between w-full">
              <div className="w-16 h-16 shadow-[0_0_22.4px_2px_#FFAA4A] bg-[#FF69004D] rounded-full flex items-center justify-center mb-6 transition-transform">
                <FaArrowTrendUp className="text-3xl text-[#FFB86A]" />
              </div>
              <div className="bg-[#FF690033] border border-[#FF890480] h-7 items-center rounded-2xl px-2 py-1 flex">
                <p className="text-[#FFB86A] text-xs uppercase">Daily</p>
              </div>
            </div>
            <h3 className="text-white text-xl mb-2">Daily Cashback</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              Earn up to 20% cashback on all your losses every day
            </p>
            <div className="border-t border-[#FFFFFF1A] py-3">
              <p className="text-[#DAB2FF80] text-xs">
                No wagering • Auto credited
              </p>
            </div>
            <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-[#F549004D] border border-[#FF890480] text-[#FFB86A] hover:bg-[#FFA500]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Claim Now <IoIosArrowForward />
            </button>
          </div>

          {/* card 3 */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(134,16,67,0.2)_100%)] shadow-[0_0_42.3px_1px_#F6339A4D] border border-[#FB64B680] rounded-2xl py-5 px-5 group hover:border-[#FF0055]/50 transition-all">
            <div className="flex justify-between w-full">
              <div className="w-16 h-16 shadow-[0_0_24.9px_2px_#FB64B6] bg-[#F6339A4D] rounded-full flex items-center justify-center mb-6 transition-transform">
                <PiLightning className="text-3xl text-[#FDA5D5]" />
              </div>
              <div className="bg-[#F6339A33] border border-[#FB64B680] h-7 items-center rounded-2xl px-2 py-1 flex">
                <p className="text-[#FDA5D5] text-xs uppercase">WEEKLY</p>
              </div>
            </div>
            <h3 className="text-white text-xl mb-2">Free Spins Friday</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              50 free spins on selected slots every Friday
            </p>
            <div className="border-t border-[#FFFFFF1A] py-3">
              <p className="text-[#DAB2FF80] text-xs">
                Min deposit $30 • Wagering 40x
              </p>
            </div>
            <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-[#F6339A4D] border border-[#FB64B680] text-[#FDA5D5] hover:bg-[#FF0055]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Claim Now <IoIosArrowForward />
            </button>
          </div>

          {/* card 4 */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(89,22,139,0.2)_100%)] shadow-[0_0_26.1px_1px_#AD46FF47] border border-[#C27AFF80] rounded-2xl py-5 px-5 group hover:border-[#9810FA]/50 transition-all">
            <div className="flex justify-between w-full">
              <div className="w-16 h-16 shadow-[0_0_26.6px_2px_#DAB2FF] bg-[#AD46FF4D] rounded-full flex items-center justify-center mb-6 transition-transform">
                <LuCrown className="text-3xl text-[#DAB2FF]" />
              </div>
              <div className="bg-[#AD46FF33] border border-[#C27AFF80] h-7 items-center rounded-2xl px-2 py-1 flex">
                <p className="text-[#DAB2FF] text-xs uppercase">VIP ONLY</p>
              </div>
            </div>
            <h3 className="text-white text-xl mb-2">VIP Rewards</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              Exclusive bonuses and personalized offers for VIP members
            </p>
            <div className="border-t border-[#FFFFFF1A] py-3">
              <p className="text-[#DAB2FF80] text-xs">By invitation only</p>
            </div>
            <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-[#9810FA4D] border border-[#C27AFF80] text-[#DAB2FF] hover:bg-[#9810FA]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Claim Now <IoIosArrowForward />
            </button>
          </div>

          {/* card 5 */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(126,42,12,0.2)_100%)]  border border-[#FF890480] shadow-[0_0_40.8px_1px_#FF690075] rounded-2xl py-5 px-5 group hover:border-[#FFA500]/50 transition-all">
            <div className="flex justify-between w-full">
              <div className="w-16 h-16 shadow-[0_0_22.4px_2px_#FFAA4A] bg-[#FF69004D] rounded-full flex items-center justify-center mb-6 transition-transform">
                <LuCalendar className="text-3xl text-[#FFB86A]" />
              </div>
              <div className="bg-[#FF690033] border border-[#FF890480] h-7 items-center rounded-2xl px-2 py-1 flex">
                <p className="text-[#FFB86A] text-xs uppercase">WEEKENDS</p>
              </div>
            </div>
            <h3 className="text-white text-xl mb-2">Weekend Reload</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              50% reload bonus up to $200 on weekends
            </p>
            <div className="border-t border-[#FFFFFF1A] py-3">
              <p className="text-[#DAB2FF80] text-xs">
                Min deposit $25 • Wagering 30x
              </p>
            </div>
            <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-[#F549004D] border border-[#FF890480] text-[#FFB86A] hover:bg-[#FFA500]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Claim Now <IoIosArrowForward />
            </button>
          </div>

          {/* card 6 */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(134,16,67,0.2)_100%)] shadow-[0_0_42.3px_1px_#F6339A4D] border border-[#FB64B680] rounded-2xl py-5 px-5 group hover:border-[#FF0055]/50 transition-all">
            <div className="flex justify-between w-full">
              <div className="w-16 h-16 shadow-[0_0_24.9px_2px_#FB64B6] bg-[#F6339A4D] rounded-full flex items-center justify-center mb-6 transition-transform">
                <FaArrowTrendUp className="text-3xl text-[#FDA5D5]" />
              </div>
              <div className="bg-[#F6339A33] border border-[#FB64B680] h-7 items-center rounded-2xl px-2 py-1 flex">
                <p className="text-[#FDA5D5] text-xs uppercase">HIGH STAKES</p>
              </div>
            </div>
            <h3 className="text-white text-xl mb-2">High Roller Bonus</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              Deposit $1000+ and get 75% match bonus
            </p>
            <div className="border-t border-[#FFFFFF1A] py-3">
              <p className="text-[#DAB2FF80] text-xs">
                Min deposit $30 • Wagering 40x
              </p>
            </div>
            <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-[#F6339A4D] border border-[#FB64B680] text-[#FDA5D5] hover:bg-[#FF0055]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Claim Now <IoIosArrowForward />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
