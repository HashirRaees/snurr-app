"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiDashboardLine } from "react-icons/ri";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin", icon: RiDashboardLine },
  { name: "CMS", href: "/admin/cms" },
  { name: "Affiliate", href: "/admin/affiliate" },
  { name: "Finances", href: "/admin/finances" },
  { name: "Tickets", href: "/admin/tickets" },
  { name: "FAQ", href: "/admin/faq/categories" },
  { name: "Customer Info", href: "/admin/customer/online" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (href: string) => pathname === href;
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#101828CC] backdrop-blur-md border-b border-[#AD46FF33] sticky top-0 z-50">
      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shadow-[0_0_22.1px_-4px_#AD46FF] rounded-xl bg-[linear-gradient(135deg,#AD46FF_0%,#8200DB_100%)] flex items-center justify-center text-black font-bold text-base">
          PS
        </div>
        <div>
          <h1 className="text-white font-heading text-2xl">PROPERSiX</h1>
          <p className="text-[#C27AFF] text-xs font-medium mt-1">
            Admin Portal
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 font-medium text-sm transition-all ${
              isActive(link.href)
                ? "text-[#C27AFF]"
                : "text-white hover:text-white/60"
            }`}
          >
            {link.icon && <link.icon className="text-lg" />}
            {link.name}
          </Link>
        ))}
      </div>

      {/* Action Icons & Profile */}
      <div className="md:flex hidden items-center gap-6">
        <div className="flex items-center gap-4 text-white/60">
          <button className="hover:text-white transition-all cursor-pointer">
            <IoSearchOutline size={22} />
          </button>
          <div className="relative">
            <button className="hover:text-white transition-all cursor-pointer">
              <IoNotificationsOutline size={22} />
            </button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#AD46FF] rounded-full border border-[#140024]"></span>
          </div>
          <button className="hover:text-white transition-all cursor-pointer">
            <IoSettingsOutline size={22} />
          </button>
        </div>

        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-white font-medium text-sm leading-none mb-1">
              proper admin
            </p>
            <p className="text-[#99A1AF] text-xs font-medium uppercase">
              Super Admin
            </p>
          </div>
          <div className="px-3 py-2 bg-[#1E2939] flex justify-between gap-3 items-center rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#AD46FF_0%,#8200DB_100%)] flex items-center justify-center text-black font-bold cursor-pointer group hover:bg-[#C800DE] transition-all">
              PA
            </div>
            <IoIosArrowDown size={18} className="text-white/60" />
          </div>
        </div>
      </div>
      {/* Mobile Menu Icon */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="lg:hidden text-white/60 hover:text-white transition-all ml-2"
      >
        <IoMenu size={28} />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 h-screen right-0 w-72 bg-[#140024] border-l border-white/5 shadow-2xl transform transition-transform duration-300 ease-in-out z-[100] md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#AD46FF_0%,#8200DB_100%)] flex items-center justify-center text-black font-bold text-sm">
              PS
            </div>
            <div>
              <span className="text-white font-heading text-lg">PROPERSiX</span>
              <p className="text-[#C27AFF] text-xs font-medium">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="text-white/40 hover:text-white transition-all"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive(link.href)
                  ? "text-[#C27AFF] bg-[#C27AFF]/10"
                  : "text-white hover:text-white/60 hover:bg-white/5"
              }`}
            >
              {link.icon && <link.icon className="text-xl" />}
              {link.name}
            </Link>
          ))}

          <div className="h-px bg-white/5 my-6"></div>

          {/* Mobile Action Icons */}
          <div className="flex items-center justify-around py-4 bg-[#1E2939]/40 rounded-2xl">
            <button className="text-white/60 hover:text-white transition-all">
              <IoSearchOutline size={22} />
            </button>
            <button className="text-white/60 hover:text-white transition-all relative">
              <IoNotificationsOutline size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#140024]"></span>
            </button>
            <button className="text-white/60 hover:text-white transition-all">
              <IoSettingsOutline size={22} />
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#AD46FF_0%,#8200DB_100%)] flex items-center justify-center text-black font-bold">
              PA
            </div>
            <div>
              <p className="text-white font-medium text-sm">proper admin</p>
              <p className="text-[#99A1AF] text-[10px] uppercase font-bold">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
