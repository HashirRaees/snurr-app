"use client";

import { useState } from "react";
import Navbar from "../../../../components/admin/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const AddMediaTemplate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    template_type: "graphics", // Default first option
    type: "image", // Default first option
    text_content: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const templateTypeOptions = [
    "Graphics",
    "Marketing Template",
    "Marketing Text",
    "Printables",
    "Brand Guidelines",
  ];

  const typeOptions = ["Document", "Text", "Image", "Video"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("template_type", formData.template_type);
      data.append("type", formData.type);

      // Only append text_content if the type involves text or if it's filled
      if (formData.text_content) {
        data.append("text_content", formData.text_content);
      }

      if (file) {
        data.append("file", file);
      }

      // Basic validation
      if (!formData.name) {
        setError("Name is required.");
        setLoading(false);
        return;
      }
      // Status is often required, default to true or active
      data.append("status", "True");

      await axiosInstance.post("/api/affiliates/affiliate-media/", data);

      // Redirect to list on success
      router.push("/admin/affiliate/media-list");
    } catch (err: any) {
      console.error("Error adding media:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to add media template."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Affiliate
          </span>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/media-list">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              MultiMedia
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] font-medium">Add New</span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-8 gap-4 px-1">
          <div>
            <h2 className="text-white text-3xl font-heading">
              Affiliate MultiMedia
            </h2>
            <p className="text-[#99A1AF] text-sm mt-1">
              Add new media template
            </p>
          </div>
          <Link href="/admin/affiliate/media-list">
            <button className="px-6 py-2.5 rounded-xl bg-[#1E2939] text-white text-sm font-medium hover:bg-[#FFFFFF33] transition-all cursor-pointer">
              Back
            </button>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 md:p-10 backdrop-blur-md mx-auto">
          <h3 className="text-white text-xl  font-bold mb-8">
            Add Media Template
          </h3>

          <div className="space-y-6 mx-auto max-w-5xl">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-[#D1D5DC] text-sm md:text-right md:pr-4">
                Name :
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#5D4180] border-none rounded-lg h-10 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#AD46FF]"
              />
            </div>

            {/* Template Type */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-[#D1D5DC] text-sm md:text-right md:pr-4">
                Template Type :
              </label>
              <div className="relative w-full">
                <select
                  name="template_type"
                  value={formData.template_type}
                  onChange={handleInputChange}
                  className="w-full bg-[#5D4180] border-none rounded-lg h-10 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#AD46FF] appearance-none cursor-pointer"
                >
                  {templateTypeOptions.map((opt) => (
                    <option
                      key={opt}
                      value={opt.toLowerCase().replace(/\s+/g, "_")}
                      className="bg-[#3B2C52]"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
                {/* Custom arrow if needed, but simple select works for functionality first */}
              </div>
            </div>

            {/* Type */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-[#D1D5DC] text-sm md:text-right md:pr-4">
                Type :
              </label>
              <div className="relative w-full">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-[#5D4180] border-none rounded-lg h-10 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#AD46FF] appearance-none cursor-pointer"
                >
                  {typeOptions.map((opt) => (
                    <option
                      key={opt}
                      value={opt.toLowerCase().replace(/\s+/g, "_")}
                      className="bg-[#3B2C52]"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Files */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">
              <div className="text-[#D1D5DC] text-sm md:text-right md:pr-4 pt-2">
                <label>Files :</label>
              </div>
              <div>
                <p className="text-[#C27AFF] text-xs mb-2">Upload Your File</p>
                <div className="border border-[#364153] rounded-xl bg-[#1E293B40] h-40 flex flex-col items-center justify-center gap-3 relative border-dashed p-4 hover:bg-[#1E293B60] transition-colors">
                  <button className="px-6 py-2 bg-[#364153] text-[#D1D5DC] text-xs rounded-lg pointer-events-none">
                    Choose Files
                  </button>
                  <p className="text-[#98A2B3] text-xs max-w-full truncate px-4">
                    {fileName}
                  </p>
                  <p className="text-[#00C2FF] text-xs cursor-pointer hover:underline pointer-events-none">
                    Or Drag It Here.
                  </p>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            {/* Text (if any) */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">
              <div className="text-[#D1D5DC] text-sm md:text-right md:pr-4 pt-2">
                <label>Text (if any) :</label>
              </div>
              <div className="w-full">
                {/* Toolbar Placeholder */}
                <div className="bg-[#9B62E0] rounded-t-lg h-9 flex items-center px-3 gap-3">
                  <button className="text-white/80 font-bold hover:text-white text-xs">
                    B
                  </button>
                  <span className="text-white/30 text-xs">/</span>
                  <button className="text-white/80 underline hover:text-white text-xs">
                    U
                  </button>
                  <div className="w-px h-4 bg-white/20 mx-1"></div>
                  <div className="w-12 h-4 bg-[#5D4180] bg-opacity-50 rounded"></div>
                  <div className="w-16 h-4 bg-[#5D4180] bg-opacity-50 rounded"></div>
                  <div className="w-8 h-4 bg-[#5D4180] bg-opacity-50 rounded"></div>
                </div>
                <textarea
                  name="text_content"
                  value={formData.text_content}
                  onChange={handleInputChange}
                  className="w-full bg-[#3B2C52] border-none rounded-b-lg h-40 p-4 text-[#D1D5DC] text-sm focus:outline-none resize-none placeholder:text-[#98A2B3]"
                  placeholder="Enter text content here..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 pt-4">
              <div className="hidden md:block"></div>
              <div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-10 py-2.5 bg-[#00C950] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(0,201,80,0.4)] hover:shadow-[0_0_25px_rgba(0,201,80,0.6)] transition-all cursor-pointer ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMediaTemplate;
