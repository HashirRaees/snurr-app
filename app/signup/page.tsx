"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "@/components/inputField/input";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (data.password !== data["confirm password"]) {
        setError("Passwords do not match");
        return;
      }

      setError("");
      await signup(data);
      router.push("/admin");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Ultimate Casino Experience"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Username Field */}
        <div className="">
          <Input
            type="text"
            label="User Name"
            placeholder="Choose your username"
            icon={HiOutlineUser}
            name="UserName"
            register={register}
            errors={errors}
            validation={{ required: "User name is required" }}
          />
        </div>
        {/* <div className="">
          <label className="text-gray-400 text-xs font-medium ml-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
              <HiOutlineUser size={18} />
            </div>
            <input
              {...register("UserName", { required: true })}
              type="text"
              placeholder="Choose your username"
              className="w-full bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
          {errors.UserName && (
            <span className="text-red-400 text-xs">This field is required</span>
          )}
        </div> */}

        {/* Email Field */}
        <div className="">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
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

        {/* Date of Birth Field */}
        <div className="">
          <Input
            type="date"
            label="Date of Birth"
            placeholder="Date of birth"
            icon={HiOutlineCalendar}
            name="date"
            register={register}
            errors={errors}
            validation={{
              required: "Date is required",
            }}
          />
        </div>

        {/* Password Field */}
        <div className="">
          <Input
            type="password"
            label="Password"
            placeholder="Create a strong password"
            icon={HiOutlineLockClosed}
            name="password"
            register={register}
            errors={errors}
            validation={{
              required: "Password is required",
            }}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="">
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={HiOutlineLockClosed}
            name="confirm password"
            register={register}
            errors={errors}
            validation={{
              required: "This field is required",
            }}
          />
        </div>

        {/* Terms */}
        <div className="flex items-start text-xs pt-2">
          <input
            {...register("Agreement", { required: true })}
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
        {errors.Checkbox && (
          <span className="text-red-400 text-xs">Please check the box</span>
        )}

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          className="w-full bg-[linear-gradient(90deg,#9810FA_0%,#AD46FF_50%,#E60076_100%)]  hover:from-primary/90 hover:to-secondary/90 text-white py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(160,32,240,0.4)] text-sm mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
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
