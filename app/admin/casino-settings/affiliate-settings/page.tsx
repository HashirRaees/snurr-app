"use client";

import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";

const AffiliateRefferalSettings = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Casino Settings</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Casino Settings
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Affiliate Referral Settings
            </span>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 backdrop-blur-md">
          {/* Card Header & List Button */}
          <div className="flex flex-col border-b border-[#1E293980] py-5 md:flex-row items-center justify-between gap-6 mb-4">
            <h3 className="text-white text-2xl">Affiliate Referral Settings</h3>
            <Link href="/admin/casino-settings">
              <button className="px-8 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide">
                Casino General Settings
              </button>
            </Link>
          </div>

          <form className="w-full">
            <div className="space-y-5 py-5 md:px-10 border-b border-[#1E293980]">
              <div>
                <h1 className="md:text-xl">
                  Affiliate Referrals Api's Setting
                </h1>
              </div>
              <div className="flex justify-between mt-12 w-full">
                <h1>Partner Line Api (set ad partner link)</h1>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Mark player as disabled</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Unmask player as disabled</h1>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Mark player as duplicate</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Unmask player as duplicate</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Import or update casino players</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Mark player as self-excluded</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Unmask player as self-excluded</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Sync casino players</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Attempt to import invalid player activities</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

              <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Import player activities</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Attempt to import invalid payout data</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

             <div className="space-y-5 pb-5 md:px-10 border-b border-[#1E293980]">
              <div className="flex justify-between mt-12 w-full">
                <h1>Visits count sync</h1>
               <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

            {/* Update button */}
            <div className="py-10 w-full flex justify-center items-center">
                 <button
                    type="submit"
                    className="px-10  py-4 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    Update
                  </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
export default AffiliateRefferalSettings;
