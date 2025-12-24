"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { GoHome } from "react-icons/go";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-[#050511] font-sans flex flex-col items-center justify-center relative overflow-hidden p-4"
      style={{
        backgroundImage: "url('/assets/home-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#050511]/40 z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* 404 Text */}
        <h1 className="font-heading text-8xl md:text-9xl bg-[linear-gradient(135deg,#C27AFF_0%,#AD46FF_50%,#9810FA_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))] text-transparent bg-clip-text mb-8 tracking-widest">
          404
        </h1>

        {/* Icon */}
        <div className="w-20 h-20 border border-[#AD46FF33] shadow-[0_25px_50px_-12px_#59168B80] bg-[linear-gradient(135deg,rgba(89,22,139,0.5)_0%,rgba(60,3,102,0.5)_100%)] rounded-full flex items-center justify-center mb-8 mx-auto">
          <IoSearchOutline className="text-4xl text-[#C27AFF]" />
        </div>

        {/* Text Content */}
        <h2 className="text-white text-xl font-medium mb-4">Page Not Found</h2>
        <p className="text-[#99A1AF] text-sm md:text-base mb-10 leading-relaxed px-4">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="px-8 py-3 rounded-3xl bg-[linear-gradient(90deg,#9810FA_0%,#8200DB_100%)] text-white font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all cursor-pointer"
          >
            <GoHome className="text-lg" />
            Go Home
          </Link>

          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-3xl bg-[#3C036680] border border-[#AD46FF4D] text-[#DAB2FF] font-medium flex items-center justify-center gap-2 hover:bg-[#AD46FF33] hover:text-white transition-all cursor-pointer"
          >
            <FaArrowLeft className="text-sm" />
            Go Back
          </button>
        </div>

        {/* Error Code Footer */}
        <div className="mt-12 text-[#C27AFF] text-sm">
          Error Code: 404 • Page Not Found
        </div>
      </div>
    </div>
  );
}
