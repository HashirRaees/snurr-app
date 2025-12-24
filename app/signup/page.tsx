import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import AuthLayout from "../../components/auth/AuthLayout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Ultimate Casino Experience"
    >
      <form className="space-y-4">
        {/* Username Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineUser size={18} />
            </div>
            <input
              type="text"
              placeholder="Choose your username"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineMail size={18} />
            </div>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Date of Birth Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineCalendar size={18} />
            </div>
            <input
              type="date"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm scheme-dark"
            />
          </div>
          <p className="text-[10px] text-gray-600 pl-1">
            You must be 18+ to play
          </p>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineLockClosed size={18} />
            </div>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineLockClosed size={18} />
            </div>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start text-xs pt-2">
          <input
            type="checkbox"
            className="mt-0.5 mr-2 rounded bg-[#0a0a10] border-white/10 focus:ring-primary text-primary cursor-pointer"
          />
          <span className="text-gray-400">
            I agree to the{" "}
            <Link
              href="#"
              className="underline text-[#C27AFFB2] hover:text-white"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline text-[#C27AFFB2] hover:text-white"
            >
              Privacy Policy
            </Link>
          </span>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[linear-gradient(90deg,#9810FA_0%,#AD46FF_50%,#E60076_100%)]  hover:from-primary/90 hover:to-secondary/90 text-white py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(160,32,240,0.4)] text-sm mt-2 cursor-pointer">
          Create Account
        </button>

        {/* Alternative Signup */}
        <div className="text-center pt-2">
          <p className="text-gray-500 text-xs mb-3">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#C27AFFB2] hover:text-white transition-colors font-bold"
            >
              Sign in
            </Link>
          </p>
          <div className="relative mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#12121a] text-gray-600  tracking-widest font-bold text-[10px]">
                Or sign up with
              </span>
            </div>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 py-2.5 rounded-lg transition-all text-xs font-medium cursor-pointer"
          >
            <FaGoogle className="text-white" /> Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 py-2.5 rounded-lg transition-all text-xs font-medium cursor-pointer"
          >
            <FaFacebook className="text-white" /> Facebook
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
