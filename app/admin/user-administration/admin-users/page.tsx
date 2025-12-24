"use client";

import React from "react";
import Navbar from "@/components/admin/Navbar";
import UserAdminTabs from "@/components/admin/UserAdminTabs";

const AdminUsersPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />
      <main className="mx-auto px-5 md:px-20 py-8">
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl font-normal">
            User Administration
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              User Management
            </span>
            <span className="text-white/20">/</span>
            <span className="capitalize text-white">Admin Users</span>
          </div>
        </div>
        <UserAdminTabs />
      </main>
    </div>
  );
};

export default AdminUsersPage;
