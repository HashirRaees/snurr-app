import Link from "next/link";
import Navbar from "../../components/homepage/Navbar";
// import Footer from "../components/Footer";
import { LuMessageCircle } from "react-icons/lu";
import { BsEnvelope, BsTelephone, BsSend } from "react-icons/bs";

export default function SupportPage() {
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
            HOW CAN WE HELP?
          </h1>
          <p className="text-[#E9D4FFB2] text-lg">
            We're here to assist you 24/7
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Live Chat Card */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(89,22,139,0.2)_100%)] shadow-[0_0_26.1px_1px_#AD46FF47] border border-[#C27AFF80] rounded-2xl p-8 text-center group hover:border-[#9810FA]/50 transition-all">
            <div className="w-16 h-16 mx-auto shadow-[0_4px_6px_-4px_#AD46FF80] shadow-[0_10px_15px_-3px_#AD46FF80] shadow-[0_0_0px_2px_#C27AFF66] bg-[#AD46FF4D] rounded-full flex items-center justify-center mb-6 transition-transform">
              <LuMessageCircle className="text-3xl text-[#DAB2FF]" />
            </div>
            <h3 className="text-white text-xl  mb-2">Live Chat</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">Available 24/7</p>
            <button className="w-full py-3 rounded-lg bg-[#9810FA4D] border border-[#C27AFF80] text-[#DAB2FF] hover:bg-[#9810FA]/50 hover:text-white transition-all shadow-[0_0_15px_rgba(152,16,250,0.2)]">
              Start Chat
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(126,42,12,0.2)_100%)]  border border-[#FF890480] shadow-[0_0_40.8px_1px_#FF690075] rounded-2xl p-8 text-center group hover:border-[#FFA500]/50 transition-all">
            <div className="w-16 h-16 mx-auto bg-[#FF69004D] shadow-[0_4px_6px_-4px_#FF690080] shadow-[0_10px_15px_-3px_#FF690080] shadow-[0_0_0px_2px_#FF890466] rounded-full flex items-center justify-center mb-6  transition-transform">
              <BsEnvelope className="text-3xl text-[#FFB86A]" />
            </div>
            <h3 className="text-white text-xl  mb-2">Email</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">Response within 24h</p>
            <Link
              href="mailto:support@snurr.com"
              className="block w-full py-3 text-[#FFB86A]  hover:text-white transition-colors"
            >
              support@snurr.com
            </Link>
          </div>

          {/* Phone Card */}
          <div className="bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(134,16,67,0.2)_100%)] shadow-[0_0_42.3px_1px_#F6339A4D] border border-[#FB64B680] rounded-2xl p-8 text-center group hover:border-[#FF0055]/50 transition-all">
            <div className="w-16 h-16 mx-auto bg-[#F6339A4D] shadow-[0_4px_6px_-4px_#F6339A80] shadow-[0_10px_15px_-3px_#F6339A80] shadow-[0_0_0px_2px_#FB64B666] rounded-full flex items-center justify-center mb-6  transition-transform">
              <BsTelephone className="text-3xl text-[#FDA5D5]" />
            </div>
            <h3 className="text-white text-xl  mb-2">Phone</h3>
            <p className="text-[#E9D4FFB2] text-sm mb-8">
              Mon-Sun 9AM-12AM EST
            </p>
            <Link
              href="tel:+18001234567"
              className="block w-full py-3 text-[#FDA5D5]  hover:text-white transition-colors"
            >
              +1 (800) 123-4567
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(89,22,139,0.2)_100%)] backdrop-blur-md border border-[#C27AFF80] rounded-2xl p-8 md:p-12 shadow-[0_25px_50px_-12px_#9810FA66] shadow-[0_0_0px_1px_#AD46FF4D] relative overflow-hidden">
          {/* Glow effect on form border */}
          <div className="absolute inset-0 border border-[#9810FA]/30 rounded-2xl pointer-events-none glowing-border"></div>

          <div className="text-center mb-10">
            <h2 className="text-white text-2xl  mb-2">Send Us a Message</h2>
            <p className="text-[#E9D4FFB2] text-sm">
              Fill out the form and we'll get back to you soon
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[#F3E8FF] text-xs  ml-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#9810FA] focus:ring-1 focus:ring-[#9810FA] transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#F3E8FF] text-xs  ml-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#9810FA] focus:ring-1 focus:ring-[#9810FA] transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#F3E8FF] text-xs  ml-1">Subject</label>
              <input
                type="text"
                placeholder="What is this regarding?"
                className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#9810FA] focus:ring-1 focus:ring-[#9810FA] transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#F3E8FF] text-xs  ml-1">Message</label>
              <textarea
                rows={6}
                placeholder="Describe your issue or question..."
                className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#9810FA] focus:ring-1 focus:ring-[#9810FA] transition-all text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[linear-gradient(90deg,#9810FA_0%,#AD46FF_50%,#E60076_100%)] hover:from-[#9810FA]/90 hover:to-[#FF007F]/90 text-white  py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(160,32,240,0.4)] text-sm uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <BsSend /> Send Message
            </button>
          </form>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
