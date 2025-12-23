import Link from "next/link";
import { FaGem, FaGift, FaArrowRight, FaCrown, FaBolt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoGiftOutline } from "react-icons/io5";
import { LuCoins, LuCrown } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiLightning } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";

const RewardsSection = () => {
  return (
    <section id="rewards" className="py-20 bg-[#000000] relative">
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col text-center gap-4 items-center mb-16">
          <div className="py-2 px-5 flex items-center rounded-full bg-white/5 border border-white/10">
            <span className="text-sm uppercase tracking-wider text-[#E9D4FF]">
              <HiOutlineSparkles className="text-[#FDC700] mr-2 text-lg inline" />
              EXCLUSIVE OFFERS
            </span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl text-white">
            EXCLUSIVE REWARDS
          </h2>
          <p className="text-[#E9D4FFB2] max-w-2xl text-center md:text-xl font-light">
            Unlock premium bonuses, VIP perks, and special offers designed
            exclusively for winners
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3 cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 col-span-3 md:col-span-5 gap-6">
            {/* --- Card 1: Total Rewards Paid (Yellow/Gold Icon) --- */}
            <div className="flex items-center p-6 rounded-2xl bg-[linear-gradient(135deg,rgba(60,3,102,0.4)_0%,rgba(60,3,102,0.41)_100%)] shadow-xl border border-[#AD46FF4D]">
              {/* Icon Container (Yellow/Gold Gradient) */}
              <div className="w-16 h-16 mr-6 rounded-xl bg-[linear-gradient(90deg,#D08700_0%,#B68F00_100%)] flex items-center justify-center shadow-lg">
                {/* Replace with your actual SVG or Icon Component */}
                <LuCoins className="text-3xl" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <p className="text-[#DAB2FF] text-base opacity-70 mb-1">
                  Total Rewards Paid
                </p>
                <p className="text-white text-3xl font-bold">$12.5M+</p>
              </div>
            </div>

            {/* --- Card 2: Active Promotions (Purple Icon) --- */}
            <div className="flex items-center p-6 rounded-2xl bg-[linear-gradient(135deg,rgba(60,3,102,0.4)_0%,rgba(60,3,102,0.41)_100%)] shadow-xl border border-[#AD46FF4D]">
              {/* Icon Container (Violet/Purple Gradient) */}
              <div className="w-16 h-16 mr-6 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,rgba(0,0,0,0)_100%)] flex items-center justify-center shadow-lg">
                {/* Replace with your actual SVG or Icon Component */}
                <FaArrowTrendUp className="text-3xl" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <p className="text-[#DAB2FF] text-base opacity-70 mb-1">
                  Active Promotions
                </p>
                <p className="text-white text-3xl font-bold">25+</p>
              </div>
            </div>

            {/* --- Card 3: Average Bonus (Pink/Fuchsia Icon) --- */}
            <div className="flex items-center p-6 rounded-2xl bg-[linear-gradient(135deg,rgba(60,3,102,0.4)_0%,rgba(60,3,102,0.41)_100%)] shadow-xl border border-[#AD46FF4D]">
              {/* Icon Container (Fuchsia/Pink Gradient) */}
              <div className="w-16 h-16 mr-6 rounded-xl bg-[linear-gradient(90deg,#C800DE_0%,rgba(0,0,0,0)_100%)] flex items-center justify-center shadow-lg">
                {/* Replace with your actual SVG or Icon Component */}
                <p className="text-white text-3xl font-bold">%</p>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <p className="text-[#DAB2FF] text-base opacity-70 mb-1">
                  Average Bonus
                </p>
                <p className="text-white text-3xl font-bold">200%</p>
              </div>
            </div>
          </div>
          {/* Main Large Reward Card */}
          <div className="md:col-span-2 col-span-3  bg-[linear-gradient(135deg,rgba(60,3,102,0.9)_0%,rgba(75,0,79,0.5)_100%)] rounded-3xl p-10 border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-all">
            {/* Content Wrapper */}
            <div className="z-10 text-white flex flex-col items-start">
              {/* Top Left: Limited Time Offer Badge */}
              <div className="flex items-center w-full justify-between mb-10">
                <div
                  className="bg-[linear-gradient(90deg,#F0B100_0%,#FF6900_50%,#FB2C36_100%)] text-white text-xs font-bold uppercase px-4 py-2 rounded-full shadow-lg tracking-wider"
                >
                  <span className="mr-1">🔥</span> LIMITED TIME OFFER
                </div>

                {/* Top Right: Gift Icon (Present Icon) */}
                <div className="w-16 h-16 bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_50%,#9810FA_100%)] rounded-xl flex items-center justify-center p-3 shadow-2xl">
                  <IoGiftOutline className="text-5xl" />
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-4xl md:text-5xl font-extrabold uppercase mb-6 tracking-wide">
                WELCOME MEGA BONUS
              </h1>

              {/* Bonus Badge */}
              <div className="bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_50%,#9810FA_100%)] text-white text-xl md:text-2xl font-extrabold px-8 py-4 rounded-full shadow-2xl mb-10">
                <div className="flex gap-3 items-center">
                  <HiOutlineSparkles className="text-2xl inline" />
                  <h1>500% + 100 FREE SPINS</h1>
                </div>
              </div>

              {/* Description Text */}
              <p className="text-[#E9D4FF] md:text-xl text-base mb-12 max-w-2xl">
                Get up to $5,000 bonus on your first deposit plus exclusive VIP
                perks and instant rewards
              </p>

              {/* Features List (Two Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-12 w-full max-w-2xl">
                <div className="text-white text-base opacity-90">
                  <span className="mr-2 text-fuchsia-400">●</span> Instant
                  deposit bonus
                </div>
                <div className="text-white text-base opacity-90">
                  <span className="mr-2 text-fuchsia-400">●</span> 100 Free
                  spins on slots
                </div>
                <div className="text-white text-base opacity-90">
                  <span className="mr-2 text-fuchsia-400">●</span> VIP status
                  for 30 days
                </div>
                <div className="text-white text-base opacity-90">
                  <span className="mr-2 text-fuchsia-400">●</span> Exclusive
                  tournament access
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                {/* Primary Button: Claim Bonus Now */}
                <button
                  className="flex-1 text-[#000000] font-bold py-8 px-8 rounded-full text-lg uppercase transition duration-300 transform hover:scale-[1.03] 
                       bg-[linear-gradient(90deg,#C27AFF_0%,#E500FF_50%,#C27AFF_100%)] shadow-2xl"
                >
                  <span className="flex items-center justify-center">
                    CLAIM BONUS NOW
                    <FaArrowRight className="ml-3" />
                  </span>
                </button>

                {/* Secondary Button: View Terms */}
                <button
                  className="flex-1 text-[#000000] font-bold py-8 px-8 rounded-full text-lg uppercase transition duration-300 transform hover:scale-[1.03]
                       bg-[linear-gradient(90deg,#C27AFF_0%,#E500FF_50%,#C27AFF_100%)] shadow-xl"
                >
                  VIEW TERMS
                </button>
              </div>
            </div>
          </div>

          {/* Smaller Reward Cards Column */}
          <div className="grid col-span-3 gap-6 grid-cols-1">
            {/* --- Card 1: Daily Rewards --- */}
            <div className="relative p-6 rounded-xl shadow-xl bg-[linear-gradient(135deg,rgba(60,3,102,0.4)_0%,rgba(60,3,102,0.41)_100%)] overflow-hidden">
              <div className="h-3 absolute top-0 left-0 w-full bg-[linear-gradient(90deg,#C800DE_0%,#E60076_100%)]"></div>
              {/* icon and heading */}
              <div className="flex mt-2 w-full justify-between items-center">
                <h3 className="text-white text-xl mb-4">Daily Rewards</h3>
                <div className="w-12 h-12 rounded-lg bg-[linear-gradient(90deg,#C800DE_0%,#E60076_100%)] flex items-center justify-center shadow-lg">
                  {/* Lightning/Flash Icon */}
                  <PiLightning className="text-3xl" />
                </div>
              </div>

              {/* Action Badge */}
              <span className="inline-block text-white text-sm font-bold uppercase px-3 py-1 rounded-full bg-[linear-gradient(90deg,#C800DE_0%,#E60076_100%)] mb-4">
                FREE SPINS
              </span>

              <p className="text-[#DAB2FF]  mb-2">Claim daily bonuses</p>
              <p className="text-white text-xl mb-6">Up to 50 spins</p>

              {/* Learn More Link */}
              <a
                href="#"
                className="flex items-center text-[#C27AFF] text-sm hover:opacity-100 transition duration-150"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </div>

            {/* --- Card 2: VIP Elite Club --- */}
            <div className="relative p-6 rounded-xl shadow-xl bg-[linear-gradient(135deg,rgba(60,3,102,0.4)_0%,rgba(60,3,102,0.41)_100%)] overflow-hidden">
              <div className="h-3 absolute top-0 left-0 w-full bg-[linear-gradient(90deg,#7F22FE_0%,#9810FA_100%)]"></div>
              <div className="flex mt-2 w-full justify-between items-center">
                <h3 className="text-white text-xl mb-4">VIP Elite Club</h3>
                <div className="w-12 h-12 rounded-lg bg-[linear-gradient(90deg,#7F22FE_0%,#9810FA_100%)] flex items-center justify-center shadow-lg">
                  {/* Crown Icon */}
                  <LuCrown className="text-3xl" />
                </div>
              </div>

              {/* Action Badge */}
              <span className="inline-block text-white text-sm font-bold uppercase px-3 py-1 rounded-full bg-[linear-gradient(90deg,#7F22FE_0%,#9810FA_100%)] mb-4">
                PREMIUM ACCESS
              </span>

              <p className="text-[#DAB2FF]  mb-2">Exclusive benefits</p>
              <p className="text-white text-xl mb-6">10% Cashback</p>

              {/* Learn More Link */}
              <a
                href="#"
                className="flex items-center text-[#C27AFF] text-sm hover:opacity-100 transition duration-150"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </div>

            {/* --- Card 3: Weekend Bonus --- */}
            <div className="relative p-6 rounded-xl shadow-xl bg-[linear-gradient(135deg,rgba(60,3,102,0.4)_0%,rgba(60,3,102,0.41)_100%)] overflow-hidden">
              <div className="h-3 absolute top-0 left-0 w-full bg-[linear-gradient(90deg,#E60076_0%,#EC003F_100%)]"></div>
              <div className="flex mt-2 w-full justify-between items-center">
                <h3 className="text-white text-xl mb-4">Weekend Bonus</h3>
                <div className="w-12 h-12 rounded-lg bg-[linear-gradient(90deg,#E60076_0%,#EC003F_100%)] flex items-center justify-center shadow-lg">
                  {/* Star Icon */}
                  <FaRegStar className="text-3xl" />
                </div>
              </div>

              {/* Action Badge */}
              <span className="inline-block text-white text-sm font-bold uppercase px-3 py-1 rounded-full bg-[linear-gradient(90deg,#E60076_0%,#EC003F_100%)] mb-4">
                200% MATCH
              </span>

              <p className="text-[#DAB2FF] mb-2">Every weekend</p>
              <p className="text-white text-xl mb-6">Max $2,000</p>

              {/* Learn More Link */}
              <a
                href="#"
                className="flex items-center text-[#C27AFF] text-sm hover:opacity-100 transition duration-150"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Container */}
      <div className="w-[90%] md:max-w-2xl bg-[#0A0118] mt-20 rounded-3xl mx-auto px-4 py-5 flex flex-col items-center justify-center shadow-[0_0_20.2px_0_#C27AFF]">
        <HiOutlineSparkles className="text-3xl text-[#FDC700] mb-4" />
        <p className="text-base text-[#E9D4FF] text-center max-w-md ">
          Don't miss out on exclusive rewards • Join today and unlock instant
          access to 25+ active promotions
        </p>
        <button className="bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] mt-4 cursor-pointer uppercase font-semibold text-base rounded-full px-10 py-5">
          View all promotions
        </button>
      </div>
    </section>
  );
};

export default RewardsSection;
