import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/homepage/Navbar";
// import Footer from "../components/Footer";
import Container from "../../components/info/Container";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiCreditCard, FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";

export default function Info() {
  return (
    <>
      <div className="min-h-screen bg-[#050511] font-sans selection:bg-primary/30">
        <Navbar />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full -z-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -z-10"></div>

          {/* Header */}
          <div className="text-center flex flex-col items-center gap-2 mb-16">
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Welcome to Snurr Casino
            </h1>
            <p className="text-[#E9D4FFB2] max-w-3xl text-center text-lg">
              Licensed, secure, and trusted by thousands of players worldwide.
              Experience premium gaming with complete peace of mind.
            </p>
          </div>

          {/* single container */}
          <Container>
            <div className="mx-auto pb-4 gap-3 md:gap-2 flex flex-wrap justify-center items-center py-1 px-3">
              <div className="flex items-center md:flex-row flex-col md:border-r border-[#C27AFF33]">
                <Image
                  src={"/assets/lock2.png"}
                  className=""
                  alt=""
                  width={100}
                  height={100}
                />
                <div className="text-center px-5">
                  <h4 className="text-white text-thin text-2xl">100% Secure</h4>
                  <p className="text-[#E9D4FF99] text-base">
                    End-to-End Encrypted
                  </p>
                </div>
                {/* <p className="text-4xl">🔐</p> */}
              </div>

              <div className="flex items-center md:flex-row flex-col md:border-r border-[#C27AFF33]">
                <Image
                  src={"/assets/cup.png"}
                  className=""
                  alt=""
                  width={100}
                  height={100}
                />
                <div className="text-center px-5">
                  <h4 className="text-white text-thin text-2xl">100% Secure</h4>
                  <p className="text-[#E9D4FF99] text-base">
                    End-to-End Encrypted
                  </p>
                </div>
                {/* <p className="text-4xl">🔐</p> */}
              </div>

              <div className="flex items-center md:flex-row flex-col">
                <Image
                  src={"/assets/bolt.png"}
                  className=""
                  alt=""
                  width={100}
                  height={100}
                />
                <div className="text-center px-5">
                  <h4 className="text-white text-thin text-2xl">100% Secure</h4>
                  <p className="text-[#E9D4FF99] text-base">
                    End-to-End Encrypted
                  </p>
                </div>
                {/* <p className="text-4xl">🔐</p> */}
              </div>
            </div>
          </Container>
        </main>

        {/* three cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4">
          {/* Company Card */}
          <div className="bg-[#12121ACC] flex flex-col justify-center gap-2 border border-[#C27AFF4D] rounded-2xl p-8 text-center group hover:border-[#9810FA]/50 transition-all">
            <div className="w-18 h-18 mx-auto shadow-[0_4px_6px_-4px_#AD46FF80] shadow-[0_10px_15px_-3px_#AD46FF80] shadow-[0_0_0px_2px_#C27AFF66] bg-[linear-gradient(135deg,rgba(173,70,255,0.2)_0%,rgba(152,16,250,0.2)_100%)] rounded-full flex items-center justify-center mb-6 transition-transform">
              <Image
                src={"/assets/company.png"}
                className=""
                alt=""
                width={110}
                height={100}
              />
            </div>
            <div>
              <p className="text-[#DAB2FF80] text-base mb-1">COMPANY</p>
              <p className="text-white text-base mb-1">SNURR OÜ</p>
              <p className="text-[#E9D4FF99] text-sm mb-2">ORG 14982444</p>
              <p className="text-sm text-[#E9D4FF99]">Tallinn, Estonia</p>
            </div>
          </div>

          {/* License Card */}
          <div className="bg-[#12121ACC] flex flex-col justify-center border border-[#FF89044D] rounded-2xl p-8 text-center group hover:border-[#FFA500]/50 transition-all">
            <div className="w-18 h-18 mx-auto bg-[linear-gradient(135deg,rgba(255,105,0,0.2)_0%,rgba(245,73,0,0.2)_100%)] shadow-[0_4px_6px_-4px_#FF690080] shadow-[0_10px_15px_-3px_#FF690080] shadow-[0_0_0px_2px_#FF890466] rounded-full flex items-center justify-center mb-6  transition-transform">
              <Image
                src={"/assets/liscense.png"}
                className=""
                alt=""
                width={110}
                height={100}
              />
            </div>
            <div>
              <p className="text-[#FFD6A799] text-base mb-1">LICENSE</p>
              <p className="text-white text-base mb-1">SOFTHUB N.V</p>
              <p className="text-[#FFD6A799] text-sm mb-2">REG NO: 149481</p>
              <p className="text-sm text-[#FFD6A799]">Curaçao</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-[#12121ACC] flex flex-col justify-center border border-[#FB64B64D] rounded-2xl p-8 text-center group hover:border-[#FF0055]/50 transition-all">
            <div className="w-18 h-18 mx-auto bg-[linear-gradient(135deg,rgba(246,51,154,0.2)_0%,rgba(230,0,118,0.2)_100%)] shadow-[0_4px_6px_-4px_#F6339A80] shadow-[0_10px_15px_-3px_#F6339A80] shadow-[0_0_0px_2px_#FB64B666] rounded-full flex items-center justify-center mb-6  transition-transform">
              <Image
                src={"/assets/gaming-license.png"}
                className=""
                alt=""
                width={110}
                height={100}
              />
            </div>
            <div>
              <p className="text-[#FDA5D580] text-base mb-1">GAMING LICENSE</p>
              <p className="text-white text-base mb-1">365/JAZ</p>
              <p className="text-[#FDA5D580] text-sm mb-2">SUB-LICENSE</p>
              <p className="text-sm text-[#FDA5D580]">GLH-OCCHKTW0703282019</p>
            </div>
          </div>
        </div>

        {/* Payment and Security */}
        <div className="max-w-7xl mx-auto py-2 px-3">
          {/* Grid Container */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* --- Card 1: Security --- */}
            <div
              className="relative p-8 rounded-xl shadow-2xl overflow-hidden min-h-[300px] 
                    bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(89,22,139,0.2)_100%)] backdrop-blur-lg border border-white/10"
            >
              {/* Title & Icon */}
              <div className="flex items-center text-xl font-bold mb-6">
                <div className="flex gap-4 items-center -ml-4">
                  {/* Lock Icon */}
                  <div className="h-16 w-16 bg-[#AD46FF33] rounded-full flex justify-center items-center text-purple-400">
                    <IoLockClosedOutline className="text-2xl text-[#C27AFF]" />
                  </div>
                  <h3 className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#C27AFF_0%,#FB64B6_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))] text-2xl font-semibold">
                    Security
                  </h3>
                </div>
              </div>

              {/* Security Features List */}
              <ul className="space-y-2">
                <li className="flex items-center -ml-3 text-[#E9D4FFCC] text-lg">
                  {/* Small Lock Icon */}
                  <Image
                    src={"/assets/lock2.png"}
                    height={30}
                    width={40}
                    alt=""
                  />
                  256-bit SSL Encryption
                </li>
                <li className="flex items-center -ml-3 text-[#E9D4FFCC] text-lg">
                  {/* Card Icon */}
                  <Image
                    src={"/assets/card.png"}
                    height={30}
                    width={40}
                    alt=""
                  />
                  End-to-End Payment Security
                </li>
                <li className="flex items-center -ml-3 text-[#E9D4FFCC] text-lg">
                  {/* Checkmark Icon */}
                  <Image
                    src={"/assets/checkmark.png"}
                    height={30}
                    width={40}
                    alt=""
                  />
                  PCI DSS Compliant
                </li>
                <li className="flex items-center -ml-3 text-[#E9D4FFCC] text-lg">
                  {/* Checkmark Icon */}
                  <Image
                    src={"/assets/shield.png"}
                    height={30}
                    width={40}
                    alt=""
                  />
                  Two-Factor Authentication
                </li>
              </ul>
            </div>

            {/* --- Card 2: Payments --- */}
            <div
              className="relative p-8 rounded-xl shadow-2xl overflow-hidden min-h-[300px]
                    bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(126,42,12,0.1)_100%)] shadow-[0_4px_6px_-4px_#0000001A] shadow-[0_10px_15px_-3px_#0000001A] shadow-[0_0_0px_1px_#FF690033] backdrop-blur-lg border border-[#FF89044D]"
            >
              {/* Title & Icon */}
              <div className="flex items-center text-xl font-bold mb-6">
                <div className="flex gap-4 items-center -ml-4">
                  {/* Lock Icon */}
                  <div className="h-16 w-16 bg-[#FF690033] rounded-full flex justify-center items-center">
                    <FiCreditCard className="text-2xl text-[#FF8904]" />
                  </div>
                  <h3 className="text-[#FF8904] text-2xl font-semibold">
                    Payments
                  </h3>
                </div>
              </div>

              {/* Payment Options Grid */}
              <div className="grid md:grid-cols-4 gap-4 w-full">
                {/* Payment Option: Bitcoin */}
                <div
                  className="flex flex-col items-center justify-center p-4 rounded-xl 
                         bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(126,42,12,0.1)_100%)] border border-[#FF89044D]  "
                >
                  <div className="w-16 h-20 flex items-center justify-center mb-1">
                    <Image
                      src={"/assets/bitcoin.png"}
                      height={30}
                      width={60}
                      alt=""
                    />
                  </div>
                  <p className="text-[#FFD6A7B2] text-xs">Bitcoin</p>
                </div>

                {/* Payment Option: Ethereum */}
                <div
                  className="flex flex-col items-center justify-center p-4 rounded-xl 
                        bg-[linear-gradient(135deg,rgba(173,70,255,0.1)_0%,rgba(43,127,255,0.1)_100%)] border border-[#C27AFF4D]  "
                >
                  <div className="w-16 h-20 flex items-center justify-center mb-1">
                    <Image
                      src={"/assets/ethereum.png"}
                      height={30}
                      width={60}
                      alt=""
                    />
                  </div>
                  <p className="text-[#FCCEE8B2] text-xs">Ethereum</p>
                </div>

                {/* Payment Option: Cards */}
                <div
                  className="flex flex-col items-center justify-center p-4 rounded-xl 
                        bg-[linear-gradient(135deg,rgba(246,51,154,0.1)_0%,rgba(230,0,118,0.1)_100%)] border border-[#FB64B64D]"
                >
                  <div className="w-16 h-20 flex items-center justify-center mb-1">
                    <Image
                      src={"/assets/cards.png"}
                      height={30}
                      width={60}
                      alt=""
                    />
                  </div>
                  <p className="text-[#FCCEE8B2] text-xs">Cards</p>
                </div>

                {/* Payment Option: E-Wallets */}
                <div
                  className="flex flex-col items-center justify-center p-4 rounded-xl 
                        bg-[linear-gradient(135deg,rgba(173,70,255,0.1)_0%,rgba(152,16,250,0.1)_100%)] border border-[#C27AFF4D]  "
                >
                  <div className="w-16 h-20 flex items-center justify-center mb-1">
                    <Image
                      src={"/assets/e-wallets.png"}
                      height={30}
                      width={60}
                      alt=""
                    />
                    {/* Placeholder */}
                  </div>
                  <p className="text-[#FCCEE8B2] text-xs">E-Wallets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* licensed and certified */}
        <div className="mb-20 mt-20 px-3">
          <Container>
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full flex justify-center items-center bg-[linear-gradient(135deg,rgba(255,105,0,0.2)_0%,rgba(246,51,154,0.2)_100%)]">
                  <Image
                    src={"/assets/medal.png"}
                    height={30}
                    width={30}
                    alt=""
                  />
                </div>
                <h3 className="text-transparent text-2xl bg-clip-text bg-[linear-gradient(90deg,#FF8904_0%,#C27AFF_50%,#FB64B6_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))]">
                  Licensed & Certified
                </h3>
              </div>

              {/* four inner cards */}
              <div className="px-2 py-2 grid gap-4 md:grid-cols-4 grid-cols-1">
                <div className="bg-[#12121A99] flex gap-3 items-center py-2 px-8 border border-[#C27AFF33] rounded-2xl">
                  <Image
                    src={"/assets/cup.png"}
                    height={30}
                    width={50}
                    alt=""
                  />
                  <h2 className="text-[#E9D4FFB2] text-sm">
                    Malta Gaming Authority
                  </h2>
                </div>

                <div className="bg-[#12121A99] flex gap-3 items-center py-2 px-8 border border-[#C27AFF33] rounded-2xl">
                  <Image
                    src={"/assets/check.png"}
                    height={30}
                    width={50}
                    alt=""
                  />
                  <h2 className="text-[#E9D4FFB2] text-sm">
                    Malta Gaming Authority
                  </h2>
                </div>

                <div className="bg-[#12121A99] flex gap-3 items-center py-2 px-8 border border-[#C27AFF33] rounded-2xl">
                  <Image
                    src={"/assets/bolt.png"}
                    height={30}
                    width={50}
                    alt=""
                  />
                  <h2 className="text-[#E9D4FFB2] text-sm">
                    Malta Gaming Authority
                  </h2>
                </div>

                <div className="bg-[#12121A99] flex gap-3 items-center py-2 px-8 border border-[#C27AFF33] rounded-2xl">
                  <Image
                    src={"/assets/padlock.png"}
                    height={30}
                    width={50}
                    alt=""
                  />
                  <h2 className="text-[#E9D4FFB2] text-sm">
                    Malta Gaming Authority
                  </h2>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Help container */}
        <div className="px-3 mb-20 mt-20">
          <Container>
            <div className="flex md:flex-row flex-col py-2 px-4 gap-8 md:gap-0 md:justify-between">
              {/* Need help */}
              <div className="space-y-3">
                <h2 className="text-[#C27AFF] text-2xl">Need Help?</h2>

                {/* mail */}
                <div className="flex gap-3 items-center">
                  <GoMail className="text-lg text-[#C27AFF]" />
                  <p className="text-[#E9D4FFB2] text-sm">
                    support@snurrcasino.com
                  </p>
                </div>
                {/* phone */}
                <div className="flex gap-3 items-center">
                  <FiPhone className="text-lg text-[#FB64B6]" />
                  <p className="text-[#E9D4FFB2] text-sm">+372 69 91 430</p>
                </div>
              </div>

              {/* text and button */}
              <div className="flex flex-col md:w-[50%] justify-center gap-3 text-left">
                <p className="text-[#E9D4FF99] text-sm">
                  Our support team is available 24/7 to assist you with any
                  questions.
                </p>
                <button className="bg-[linear-gradient(90deg,#FF8904_0%,#C27AFF_50%,#FB64B6_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))] rounded-xl px-3 py-2 text-white cursor-pointer ">
                  Contact Support
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* play responsibly */}
        <div className="px-4 mt-20 mb-20">
          <Container>
            <div className="px-3 py-3 flex md:flex-row flex-col justify-center gap-4 items-center">
              <div className="w-16 h-16 rounded-full bg-[#AD46FF4D] flex items-center justify-center text-black">
                <h2 className="text-2xl font-medium">18+</h2>
              </div>
              <div className="space-y-1 text-center">
                <h1 className="text-2xl">PLAY RESPONSIBLY</h1>
                <p className="text-[#E9D4FF99] text-sm">
                  Gambling should be entertaining, not a way to make money
                </p>
              </div>
            </div>
          </Container>
        </div>
        {/* <Footer /> */}

        {/* footer */}
        <footer className="bg-[#12121A99] flex justify-center items-center py-2 h-20">
          <h2 className="text-[#E9D4FF80] text-sm text-center">
            © 2025 Snurr Casino. Licensed & Regulated. Play responsibly. 18+
          </h2>
        </footer>
      </div>
    </>
  );
}
