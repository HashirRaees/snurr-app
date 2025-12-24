import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import AuthLayout from "../../components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Join the Ultimate Casino Experience"
    >
      <form className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineMail size={20} />
            </div>
            <input
              type="email"
              placeholder="player@example.com"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineLockClosed size={20} />
            </div>
            <input
              type="password"
              placeholder="........"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              className="mr-2 rounded bg-[#0a0a10] border-white/10 focus:ring-primary text-primary cursor-pointer"
            />
            Remember me
          </label>
          <Link
            href="#"
            className="text-primary hover:text-secondary transition-colors font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button className="w-full py-3 bg-[linear-gradient(90deg,#9810FA_0%,#AD46FF_50%,#E60076_100%)] text-white transition-all shadow-[0_0_15px_rgba(160,32,240,0.4)] text-sm rounded-md cursor-pointer">
          Sign In
        </button>

        {/* Divider */}
        <div className="text-center">
          <p className="text-gray-500 text-xs mb-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#C27AFFB2] hover:text-white transition-colors font-bold"
            >
              Sign up now
            </Link>
          </p>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#12121a] text-gray-600 tracking-widest font-bold">
                Or continue with
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
