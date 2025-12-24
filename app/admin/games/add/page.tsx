"use client";

import React, { useState } from "react";
import Navbar from "@/components/admin/Navbar";
import { FiUpload } from "react-icons/fi";

const AddGamePage = () => {
  const [formData, setFormData] = useState({
    gameTitle: "",
    gameDescription: "",
    gameMeta: "",
    gameCategory: "",
    gameMode: "",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl font-normal">Games Management</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Games Management
            </span>
            <span className="text-white/20">/</span>
            <span className="capitalize">Add Game</span>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 md:p-12 backdrop-blur-md">
          <h3 className="text-white text-xl md:text-2xl font-semibold mb-10 pb-6 border-b border-[#1E293980]">
            Add Game
          </h3>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Game Title */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">
                Game Title :
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full bg-[#1E293980] border border-[#364153] rounded-lg h-11 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  value={formData.gameTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, gameTitle: e.target.value })
                  }
                />
                <p className="text-[#2D7FFF] text-xs">
                  Game title must be unique
                </p>
              </div>
            </div>

            {/* Game Description */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">
                Game Description :
              </label>
              <textarea
                className="w-full bg-[#1E293980] border border-[#364153] rounded-lg h-32 p-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all resize-none"
                value={formData.gameDescription}
                onChange={(e) =>
                  setFormData({ ...formData, gameDescription: e.target.value })
                }
              />
            </div>

            {/* Game Meta */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">Game Meta :</label>
              <textarea
                className="w-full bg-[#1E293980] border border-[#364153] rounded-lg h-24 p-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all resize-none"
                value={formData.gameMeta}
                onChange={(e) =>
                  setFormData({ ...formData, gameMeta: e.target.value })
                }
              />
            </div>

            {/* Banner Image */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">
                Banner Image :
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-md text-white text-xs cursor-pointer hover:bg-[#1E293B] transition-all">
                    Choose File
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-[#99A1AF] text-xs font-normal">
                    No file chosen
                  </span>
                </div>
                <p className="text-[#2D7FFF] text-xs">
                  Upload only .png, .jpg, .jpg file
                </p>

                {/* Upload Placeholder */}
                <div className="w-48 h-32 bg-[#1E293980] border border-[#364153] rounded-lg flex items-center justify-center cursor-pointer hover:border-[#AD46FF] transition-all group">
                  <FiUpload className="text-[#99A1AF] text-3xl group-hover:text-[#AD46FF] transition-all" />
                </div>
              </div>
            </div>

            {/* Game Category */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">
                Game Category :
              </label>
              <input
                type="text"
                className="w-full bg-[#1E293980] border border-[#364153] rounded-lg h-11 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                value={formData.gameCategory}
                onChange={(e) =>
                  setFormData({ ...formData, gameCategory: e.target.value })
                }
              />
            </div>

            {/* Game Mode */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">Game Mode :</label>
              <input
                type="text"
                className="w-full bg-[#1E293980] border border-[#364153] rounded-lg h-11 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                value={formData.gameMode}
                onChange={(e) =>
                  setFormData({ ...formData, gameMode: e.target.value })
                }
              />
            </div>

            {/* Game Files */}
            <div className="grid md:grid-cols-[200px_1fr] items-start gap-4">
              <label className="text-[#99A1AF] text-sm pt-2">
                Game Files :
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-md text-white text-xs cursor-pointer hover:bg-[#1E293B] transition-all">
                    Choose File
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-[#99A1AF] text-xs font-normal">
                    No file chosen
                  </span>
                </div>
                <p className="text-[#2D7FFF] text-xs">
                  Upload only .zip file here
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-10">
              <button className="px-16 py-3 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
                Add
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddGamePage;
