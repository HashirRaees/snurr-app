"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiGift, FiPlus } from "react-icons/fi";

const AddBonusPage = () => {
  const labelClasses = "text-[#D1D5DC] text-sm font-medium min-w-[150px]";
  const inputContainerClasses =
    "flex flex-col md:flex-row md:items-center  gap-2 mb-6";
  const inputClasses =
    "flex-1 bg-[#1E293B40] w-full border border-[#364153] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all";
  const helperTextClasses = "text-[#00C950] text-xs mt-2 block";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Bonuses
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Add Bonus
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FiGift size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl tracking-tight">Add Bonus</h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Create new bonus offer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/bonuses/list">
              <button className="px-6 py-3 rounded-xl bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] shadow-[0_0_15px_rgba(45,127,255,0.4)] text-white text-sm flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer whitespace-nowrap">
                Bonus list
              </button>
            </Link>
            <Link href="/admin/bonuses/snurr">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#9810FA] text-white text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
                Snurr Bonus
              </button>
            </Link>
          </div>
        </div>

        {/* Select Bonus Type Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 mb-10 backdrop-blur-md">
          <h3 className="text-white text-lg font-medium mb-8">
            Select Bonus Type
          </h3>

          <div className={inputContainerClasses}>
            <label className={labelClasses}>Bonus Type</label>
            <div className="flex-1">
              <input type="text" placeholder="" className={inputClasses} />
              <span className={helperTextClasses}>
                select bonus type from drop down before adding and submit to
                show realevant form
              </span>
            </div>
          </div>

          <div className="flex justify-start md:ml-[166px]">
            <button className="px-10 py-3 rounded-xl bg-[#2D7FFF] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#2D7FFFEE] transition-all cursor-pointer shadow-[0_0_15px_rgba(45,127,255,0.3)]">
              Submit
            </button>
          </div>
        </div>

        {/* Add Registration Bonus Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 backdrop-blur-md">
          <h3 className="text-white text-lg font-medium mb-8">
            Add Registration Bonus
          </h3>

          {/* Bonus Name */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Bonus Name</label>
            <input
              type="text"
              placeholder="enter bonus title"
              className={inputClasses}
            />
          </div>

          {/* Free Tokens */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Free Tokens</label>
            <input
              type="text"
              placeholder="enter number of free tokens"
              className={inputClasses}
            />
          </div>

          {/* Free Spins */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Free Spins</label>
            <input
              type="text"
              placeholder="enter number of free spins"
              className={inputClasses}
            />
          </div>

          {/* Bonus Time Category */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Bonus Time Category</label>
            <div className="flex-1">
              <input type="text" placeholder="" className={inputClasses} />
              <span className={helperTextClasses}>
                in case of specific date leave select 'Specific Date'... in case
                of start and end date select 'From Till'... in case of recurring
                bonus select 'Recurring'
              </span>
            </div>
          </div>

          {/* Specific Day */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Specific Day</label>
            <div className="flex-1">
              <input type="text" placeholder="" className={inputClasses} />
              <span className={helperTextClasses}>select specific date</span>
            </div>
          </div>

          {/* Excluded countries */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Excluded countries</label>
            <div className="flex-1">
              <input type="text" placeholder="" className={inputClasses} />
              <span className={helperTextClasses}>
                select excluded countries from bonus
              </span>
            </div>
          </div>

          {/* Affiliate source */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Affiliate source</label>
            <input type="text" placeholder="" className={inputClasses} />
          </div>

          {/* Status */}
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Status</label>
            <div className="flex-1">
              <input type="text" placeholder="" className={inputClasses} />
              <span className={helperTextClasses}>select bonus status</span>
            </div>
          </div>

          <div className="flex flex-col items-start md:ml-[166px] mt-4">
            <button className="px-10 py-3 rounded-xl bg-[#2D7FFF] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#2D7FFFEE] transition-all cursor-pointer shadow-[0_0_15px_rgba(45,127,255,0.3)]">
              <FiPlus size={18} /> Add
            </button>
            <span className="text-white/40 text-[10px] mt-3">
              click on 'Add' button to save bonus
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBonusPage;
