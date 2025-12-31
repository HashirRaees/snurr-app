"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "@/components/inputField/input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setError("");
      await login(data);
      router.push("/admin");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Join the Ultimate Casino Experience"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1">
          <Input
            type="email"
            label="Email"
            placeholder="player@example.com"
            icon={HiOutlineMail}
            name="email"
            register={register}
            errors={errors}
            validation={{
              required: "Email Address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Input
            type="password"
            label="Password"
            placeholder="........"
            icon={HiOutlineLockClosed}
            name="password"
            register={register}
            errors={errors}
            validation={{
              required: "Password is required",
            }}
          />
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
        <button
          disabled={isSubmitting}
          className="w-full py-3 bg-[linear-gradient(90deg,#9810FA_0%,#AD46FF_50%,#E60076_100%)] text-white transition-all shadow-[0_0_15px_rgba(160,32,240,0.4)] text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
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
