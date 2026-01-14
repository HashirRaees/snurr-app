"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/admin/Navbar";
import {
  IoMdImage,
  IoMdInformationCircle,
  IoMdStats,
  IoMdText,
  IoMdCode,
} from "react-icons/io";
import { PiFloppyDisk, PiTrash } from "react-icons/pi";
import { RiLinksLine } from "react-icons/ri";
import { RxText } from "react-icons/rx";
import { FiUpload, FiCreditCard } from "react-icons/fi";
import { GoImage } from "react-icons/go";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import axiosInstance from "@/lib/axios";

// --- Types ---
interface CMSData {
  [key: string]: any;
}

// --- Helper Components ---

const SectionHeading = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center py-2 border-b border-[#C27AFF21] gap-3 mb-6">
    <Icon className="text-[#C27AFF] text-2xl" />
    <h3 className="text-white font-sans text-xl">{title}</h3>
  </div>
);

const InputField = ({
  label,
  placeholder,
  value,
  helperText,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  value?: string | number | null;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-[#D1D5DC] text-sm ">{label}</label>}
    <input
      type="text"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      className="bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none transition-all"
    />
    {helperText && <p className="text-[#99A1AF] text-xs mt-1">{helperText}</p>}
  </div>
);

const ImageUploader = ({
  label,
  helperText,
  imageUrl,
  fieldName,
  onFileSelect,
  onRemove,
}: {
  label?: string;
  helperText?: string;
  imageUrl?: string | null;
  fieldName: string;
  onFileSelect: (field: string, file: File) => void;
  onRemove: (field: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(fieldName, e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-[400px]">
      {label && <label className="text-[#D1D5DC] text-sm ">{label}</label>}
      <div className="flex items-center gap-4">
        <div
          onClick={handleClick}
          className="flex items-center gap-2 bg-[#C27AFF21] border border-[#C27AFF] px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#C27AFF33] transition-all"
        >
          <FiUpload className="text-[#D1D5DC]" size={18} />
          <span className="text-[#D1D5DC] text-sm font-medium">
            Choose File
          </span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFile}
        />
        <span className="text-[#6A7282] text-sm">
          {imageUrl ? "File selected" : "No file chosen"}
        </span>
        {imageUrl && (
          <button
            onClick={() => onRemove(fieldName)}
            className="p-2 cursor-pointer bg-red-500/10 border border-red-500/50 rounded-lg hover:bg-red-500/20 transition-all text-red-500"
            title="Remove Image"
          >
            <PiTrash size={18} />
          </button>
        )}
      </div>
      {helperText && <p className="text-[#6A7282] text-sm">{helperText}</p>}
      <div className="w-[180px] h-[180px] bg-[#C27AFF0D] border border-[#C27AFF] rounded-2xl flex items-center justify-center mt-1 overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <GoImage className="text-[#4A5565] text-5xl opacity-40" />
        )}
      </div>
    </div>
  );
};

// --- Main Component ---

const CMSSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [cmsData, setCmsData] = useState<CMSData>({});
  const [originalCmsData, setOriginalCmsData] = useState<CMSData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>(
    {}
  );
  const [blobUrls, setBlobUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const response = await axiosInstance.get("/api/settings/cms/");
        if (response.data) {
          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          setCmsData(data);
          setOriginalCmsData(data); // Store original data for restoration

          if (data.stripe_form === true || data.stripe_form === "true") {
            setMaintenanceMode(true);
          }
        }
      } catch (error) {
        console.error("Error fetching CMS settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(blobUrls).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [blobUrls]);

  // Helper function to get CMS ID
  const getCmsId = (): number | null => {
    return cmsData?.id || null;
  };

  const handleInputChange = (key: string, value: string) => {
    setCmsData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (field: string, file: File) => {
    // Clean up previous blob URL if exists
    if (blobUrls[field]) {
      URL.revokeObjectURL(blobUrls[field]);
    }
    
    const previewUrl = URL.createObjectURL(file);
    setBlobUrls((prev) => ({ ...prev, [field]: previewUrl }));
    setCmsData((prev) => ({ ...prev, [field]: previewUrl }));
    setSelectedFiles((prev) => ({ ...prev, [field]: file }));
  };

  // Helper function to check if a value is a URL (existing image)
  const isImageUrl = (value: any): boolean => {
    if (!value || typeof value !== "string") return false;
    return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
  };

  const handleRemoveImage = async (field: string) => {
    try {
      // If it's a newly selected file (not yet saved), just remove it from local state
      if (selectedFiles[field]) {
        // Clean up blob URL
        if (blobUrls[field]) {
          URL.revokeObjectURL(blobUrls[field]);
          const newBlobUrls = { ...blobUrls };
          delete newBlobUrls[field];
          setBlobUrls(newBlobUrls);
        }
        
        const newFiles = { ...selectedFiles };
        delete newFiles[field];
        setSelectedFiles(newFiles);
        
        // Restore the original value from the server if it exists
        const originalValue = originalCmsData[field];
        setCmsData((prev) => ({ ...prev, [field]: originalValue || null }));
        return;
      }

      // If it's an existing image from the server, call the API to remove it
      const response = await axiosInstance.post(
        "/api/settings/cms/remove-image/",
        {
          field_name: field,
        }
      );
      if (response.status === 200 || response.status === 204) {
        setCmsData((prev) => ({ ...prev, [field]: null }));
        setOriginalCmsData((prev) => ({ ...prev, [field]: null }));
        alert("Image removed successfully!");
      }
    } catch (error: any) {
      console.error("Error removing image:", error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to remove image. Please try again.";
      alert(msg);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const cmsId = getCmsId();
      
      if (!cmsId) {
        alert("CMS ID not found. Please refresh the page and try again.");
        return;
      }

      const formData = new FormData();

      // Fields to exclude from the payload
      const excludedFields = ["id", "created_at", "updated_at"];

      Object.keys(cmsData).forEach((key) => {
        if (excludedFields.includes(key)) return;

        // If it's a new file, append the file
        if (selectedFiles[key]) {
          formData.append(key, selectedFiles[key]);
        } else {
          const value = cmsData[key];
          // Skip null/undefined
          if (value === null || value === undefined) return;

          // Check if value is an existing image URL (string starting with http/https or /)
          // AND it looks like an image field based on its name.
          // We generally don't want to send back the URL as the new value for a FileField.

          // Improved Regex to catch: _img, _img1, _icon, _icon1, _bg, logo, _image
          const isImageField = /(_img\d*|_icon\d*|_bg|logo|image)/i.test(key);

          if (
            isImageField &&
            typeof value === "string" &&
            (value.startsWith("http") || value.startsWith("/"))
          ) {
            // Skip existing image URLs (both absolute and relative)
            return;
          }

          // Specifically handle boolean values as strings "true"/"false" if backend expects it
          formData.append(key, String(value));
        }
      });

      // Ensure stripe_form matches maintenanceMode state visually if user toggled it
      if (formData.has("stripe_form")) {
        formData.set("stripe_form", String(maintenanceMode));
      } else {
        formData.append("stripe_form", String(maintenanceMode));
      }

      // Use PATCH with the CMS ID
      await axiosInstance.patch(`/api/settings/cms/${cmsId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Settings saved successfully!");
      
      // Clean up all blob URLs after successful save
      Object.values(blobUrls).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      setBlobUrls({});
      setSelectedFiles({});
      
      // Re-fetch the updated data to get the latest image URLs
      const response = await axiosInstance.get(`/api/settings/cms/${cmsId}/`);
      if (response.data) {
        setCmsData(response.data);
        setOriginalCmsData(response.data); // Update original data
      }
    } catch (error: any) {
      console.error("Error saving settings:", error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        "Failed to save settings.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#22003B] flex items-center justify-center">
        <div className="text-white">Loading Settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors">
            CMS
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] font-medium">Site Content</span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-white text-3xl font-heading tracking-wide">
              Site Settings
            </h2>
            <p className="text-[#99A1AF] text-sm mt-1">
              Manage your website content and settings
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 flex gap-2 rounded-lg shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#9810FA] text-white text-sm cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PiFloppyDisk className="text-lg" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* --- Sections --- */}

        {/* Site Title */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={RxText} title="Site Title" />
            <InputField
              label="Site Name"
              value={cmsData.site_title}
              onChange={(e) => handleInputChange("site_title", e.target.value)}
            />
          </section>
        </div>

        {/* Branding */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={GoImage} title="Branding" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUploader
                label="Site Icon"
                helperText="upload an icon of PNG/JPEG"
                imageUrl={cmsData.site_icon}
                fieldName="site_icon"
                onFileSelect={handleFileChange}
                onRemove={handleRemoveImage}
              />
              <ImageUploader
                label="Logo"
                helperText="upload a logo of PNG/JPEG"
                imageUrl={cmsData.logo}
                fieldName="logo"
                onFileSelect={handleFileChange}
                onRemove={handleRemoveImage}
              />
            </div>
          </section>
        </div>

        {/* Header Menu Bar */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={IoMenu} title="Header Menu Bar" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <InputField
                  key={`menu_text${num}`}
                  label={`Menu Text ${num}`}
                  value={cmsData[`menu_text${num}`]}
                  onChange={(e) =>
                    handleInputChange(`menu_text${num}`, e.target.value)
                  }
                />
              ))}
              {[1, 2].map((num) => (
                <InputField
                  key={`menu_btn${num}`}
                  label={`Menu Button Text ${num}`}
                  value={cmsData[`menu_btn${num}`]}
                  onChange={(e) =>
                    handleInputChange(`menu_btn${num}`, e.target.value)
                  }
                />
              ))}
            </div>
          </section>
        </div>

        {/* Main Banner Slider */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={GoImage} title="Main Banner/Slider" />
            <div className="space-y-8">
              <ImageUploader
                label="Banner Slide Image"
                helperText="upload a slide image of JPG/JPEG"
                imageUrl={cmsData.banner_side_img}
                fieldName="banner_side_img"
                onFileSelect={handleFileChange}
                onRemove={handleRemoveImage}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader
                  label="Banner Background Image"
                  helperText="upload a background image of JPG/JPEG"
                  imageUrl={cmsData.banner_bg_img}
                  fieldName="banner_bg_img"
                  onFileSelect={handleFileChange}
                  onRemove={handleRemoveImage}
                />
                {/* Potentially other banner inputs */}
                <InputField
                  label="Banner Heading"
                  value={cmsData.banner_heading}
                  onChange={(e) =>
                    handleInputChange("banner_heading", e.target.value)
                  }
                />
                <InputField
                  label="Banner Text"
                  value={cmsData.banner_text}
                  onChange={(e) =>
                    handleInputChange("banner_text", e.target.value)
                  }
                />
              </div>
            </div>
          </section>
        </div>

        {/* Content Sections */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading
              icon={IoMdInformationCircle}
              title="Winner Section Heading/Text"
            />
            <div className="space-y-6">
              <InputField
                label="Winner Section Heading"
                value={cmsData.winner_heading}
                onChange={(e) =>
                  handleInputChange("winner_heading", e.target.value)
                }
              />
              {[1, 2, 3].map((num) => (
                <InputField
                  key={`winner_theading${num}`}
                  label={`Winner Table Cell${num} Heading`}
                  value={cmsData[`winner_theading${num}`]}
                  onChange={(e) =>
                    handleInputChange(`winner_theading${num}`, e.target.value)
                  }
                />
              ))}
            </div>
          </section>
        </div>

        {/* Table Rows Sections */}
        {[1, 2, 3, 4].map((rowNum) => (
          <div
            key={`row-${rowNum}`}
            className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10"
          >
            <div>
              <SectionHeading
                icon={IoMdStats}
                title={`Table ${
                  rowNum === 1
                    ? "1st"
                    : rowNum === 2
                    ? "2nd"
                    : rowNum === 3
                    ? "3rd"
                    : "4th"
                } Row Data`}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((colNum) => {
                  const dataIndex = (rowNum - 1) * 3 + colNum;
                  return (
                    <InputField
                      key={`winner_tdata${dataIndex}`}
                      label={`Row (${rowNum}) data (${colNum})`}
                      value={cmsData[`winner_tdata${dataIndex}`]}
                      onChange={(e) =>
                        handleInputChange(
                          `winner_tdata${dataIndex}`,
                          e.target.value
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Promotion Top Section */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={IoMdImage} title="Promotion Top Section" />
            <ImageUploader
              label="Promotion Top-Background Image"
              helperText="upload a background image of JPG/JPEG"
              imageUrl={cmsData.promotion_bg}
              fieldName="promotion_bg"
              onFileSelect={handleFileChange}
              onRemove={handleRemoveImage}
            />
          </section>
        </div>

        {/* Footer Bottom Content */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={IoMdText} title="Footer Bottom" />
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#D1D5DC] text-sm ">
                  Client Promo Statement
                </label>
                <textarea
                  className="bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none min-h-[120px]"
                  value={cmsData.client_promo_statement || ""}
                  onChange={(e) =>
                    handleInputChange("client_promo_statement", e.target.value)
                  }
                />
                <p className="text-[#99A1AF] text-xs">
                  embed paragraph inside p and header inside h - tags
                </p>
              </div>
              <InputField
                label="Header For Subscribe Section"
                value={cmsData.subscribe_header}
                onChange={(e) =>
                  handleInputChange("subscribe_header", e.target.value)
                }
              />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>

              <InputField
                label="Input Field Place Holder"
                value={cmsData.subscribe_input_text}
                onChange={(e) =>
                  handleInputChange("subscribe_input_text", e.target.value)
                }
              />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>
              <InputField
                label="Subscribe Button Text"
                value={cmsData.subscribe_btn}
                onChange={(e) =>
                  handleInputChange("subscribe_btn", e.target.value)
                }
              />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>
              <InputField
                label="Copy Right Statement"
                value={cmsData.copy_right_statement}
                onChange={(e) =>
                  handleInputChange("copy_right_statement", e.target.value)
                }
              />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>
            </div>
          </section>
        </div>

        {/* Footer Social Links */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={RiLinksLine} title="Footer Links" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <InputField
                  key={`footer_link${num === 1 ? "" : num}`}
                  label={`Footer link ${num}`}
                  value={cmsData[`footer_link${num === 1 ? "" : num}`]}
                  helperText="use html a tag to define link"
                  onChange={(e) =>
                    handleInputChange(
                      `footer_link${num === 1 ? "" : num}`,
                      e.target.value
                    )
                  }
                />
              ))}
            </div>
          </section>
        </div>

        {/* End Page Script */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={IoMdCode} title="Chat Plugin Script" />
            <div className="flex flex-col gap-2">
              <InputField
                helperText="just enter script link"
                value={cmsData.chat_script}
                label="Chat Script"
                onChange={(e) =>
                  handleInputChange("chat_script", e.target.value)
                }
              />
            </div>
          </section>
        </div>

        {/* Invite And Marketing */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading
              icon={MdOutlineMailOutline}
              title="SendGrid Email Marketing"
            />
            <div className="space-y-6">
              <InputField
                label="SendGrid API Key"
                value={cmsData.sendgrid_secret}
                helperText="just enter script link"
                onChange={(e) =>
                  handleInputChange("sendgrid_secret", e.target.value)
                }
              />
            </div>
          </section>
        </div>

        {/* Maintenance Mode Setting */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading
              icon={FiCreditCard}
              title="Stripe Payment Form Setting"
            />
            <div className="flex items-center justify-between px-5 py-3 bg-[#1E29394D] rounded-2xl border border-[#C27AFF10]">
              <div>
                <p className="text-white font-medium">
                  Enable/Disable Stripe Form
                </p>
              </div>
              <button
                onClick={() => {
                  setMaintenanceMode(!maintenanceMode);
                  handleInputChange("stripe_form", String(!maintenanceMode));
                }}
                className={`w-14 h-7 rounded-full transition-all relative flex items-center px-1 cursor-pointer ${
                  maintenanceMode ? "bg-[#101828]" : "bg-[#C27AFF]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform ${
                    maintenanceMode ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </section>
        </div>
        {/* Final Button */}
        <div className="flex justify-end pt-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg shadow-[0_10px_15px_-3px_#AD46FF4D] flex items-center gap-2 bg-[#9810FA] text-white text-sm cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PiFloppyDisk className="text-lg" />
            {saving ? "Saving..." : "Update Changes"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default CMSSettings;
