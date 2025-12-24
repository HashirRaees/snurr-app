"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Games", href: "/games" },
    { label: "Live Bet", href: "/live-bet" },
    { label: "Support", href: "/support" },
    { label: "Promotion", href: "/promotion" },
    { label: "Info", href: "/info" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050511]/80 backdrop-blur-md border-b border-white/10">
      <div className="px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-3xl tracking-wider text-white">
              SNURR
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-12">
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden sm:block">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] hidden sm:block hover:bg-primary/90 text-white px-7 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(160,32,240,0.5)] text-lg font-bold uppercase tracking-wide cursor-pointer"
              >
                Get Started
              </Link>

              {/* Mobile Menu Icon */}
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="block md:hidden text-white cursor-pointer"
              >
                <IoMenu className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#0a0a10] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out z-99 h-screen flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <span className="font-heading text-2xl text-white">MENU</span>
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <IoClose size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={toggleMenu}
              className="block text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-base font-medium uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10 my-4" />
          <Link
            href="/login"
            onClick={toggleMenu}
            className="block text-center text-white border border-white/20 py-3 rounded-full hover:bg-white/5 transition-all font-bold uppercase tracking-wide mb-3"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={toggleMenu}
            className="block mt-2 text-center bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white py-3 rounded-full shadow-[0_0_15px_rgba(160,32,240,0.5)] font-bold uppercase tracking-wide"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 h-screen backdrop-blur-sm z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
