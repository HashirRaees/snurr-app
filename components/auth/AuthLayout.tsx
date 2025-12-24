import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen py-7 relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Image/Gradient */}
      {/* Assuming we use home-bg or similar, overlaying a purple gradient as per design */}
      <div className="absolute inset-0 z-0 bg-[#050511]">
        <div className="absolute inset-0 bg-[url('/assets/discover-games.jpg')] bg-cover bg-center opacity-30 "></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(126,42,12,0.2)_0%,rgba(0,0,0,0)_50%,rgba(89,22,139,0.4)_100%)]"></div>

        {/* Glow Spheres */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="mb-8 group">
          <span className="font-heading text-5xl tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(160,32,240,0.6)] transition-all">
            SNURR
          </span>
        </Link>
        <p className="text-[#E9D4FFCC] text-sm font-medium uppercase tracking-widest mb-8 text-center opacity-80">
          {subtitle}
        </p>

        {/* Card */}
        <div className="w-full bg-[#12121A] backdrop-blur-xl shadow-[0_3px_62.8px_-12px_#59168BDB] shadow-[0_0_0px_1px_#AD46FF33] border border-[#C27AFF4D] p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <h2 className="text-white text-center text-xl font-medium mb-2">
            {title}
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            {title === "Welcome Back"
              ? "Sign in to your account to continue playing"
              : "Sign up to start your winning journey"}
          </p>

          {children}
        </div>

        <div className="mt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Snurr Casino. Play responsibly. 18+
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
