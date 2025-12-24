import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaTelegram, FaInstagram, FaDiscord } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";

const PAYMENTS = [
  "Bitcoin",
  "Ethereum",
  "USDT",
  "Visa",
  "Mastercard",
  "PayPal",
];

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 border-b border-white/5 pb-10">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 pr-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              {/* Gamepad Icon from assets */}
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/Icon.png"
                  alt="Snurr Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(173,70,255,0.6)]"
                />
              </div>
              <span className="font-heading bg-[linear-gradient(90deg,#C27AFF_0%,#ED6AFF_50%,#C27AFF_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))] text-4xl tracking-wider text-transparent bg-clip-text group-hover:drop-shadow-[0_0_10px_rgba(173,70,255,0.5)] transition-all">
                SNURR
              </span>
            </Link>
            <p className="text-[#DAB2FF] text-sm mb-8 leading-relaxed max-w-sm font-light">
              The next generation crypto casino platform. Experience provably
              {/* fair games, instant withdrawals, and join a global community of */}
              winners.
            </p>
            <div className="flex gap-4">
              {[FaTwitter, BsSendFill, FaDiscord, FaInstagram].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#1A0B2E] border border-[#AD46FF33] flex items-center justify-center text-[#DAB2FF] hover:bg-[#AD46FF] hover:text-white hover:border-[#AD46FF] hover:shadow-[0_0_15px_rgba(173,70,255,0.5)] transition-all duration-300 cursor-pointer"
                  >
                    <Icon size={16} />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 tracking-wide">
              Platform
            </h4>
            <ul className="space-y-4 text-sm text-[#DAB2FF]">
              {[
                "Browse Games",
                "Tournaments",
                "Leaderboard",
                "Rewards",
                "VIP Program",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white hover:translate-x-1 transition-all inline-block cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 tracking-wide">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-[#DAB2FF]">
              {[
                "Help Center",
                "Contact Us",
                "FAQ",
                "Report Issue",
                "Status",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white hover:translate-x-1 transition-all inline-block cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-4 text-sm text-[#DAB2FF]">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Fair Play",
                "Responsible Gaming",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white hover:translate-x-1 transition-all inline-block cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center mb-16 border-b border-white/5 pb-10">
          <h4 className="font-heading text-xl text-white mb-8 tracking-wide">
            Accepted Payment Methods
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {PAYMENTS.map((method) => (
              <div
                key={method}
                className="px-6 py-2 rounded-xl bg-[#1A0B2E] border border-[#AD46FF33] text-[#DAB2FF] text-xs font-bold uppercase tracking-wider hover:bg-[#AD46FF33] hover:border-[#AD46FF66] hover:text-white transition-all cursor-pointer"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[#AD46FF] font-bold text-sm mb-4">
            &copy; {new Date().getFullYear()} Snurr Gaming Platform. All rights
            reserved.
          </p>
          <p className="text-[#E9D4FF66] text-xs max-w-3xl mx-auto leading-relaxed">
            Play responsibly. You must be 18+ to participate. If you or someone
            you know has a gaming problem, please seek help. This site uses
            cookies to enhance your experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
