"use client";

import { useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import {
  IoMdImage,
  IoMdInformationCircle,
  IoMdStats,
  IoMdText,
  IoMdCode,
} from "react-icons/io";
import { PiFloppyDisk } from "react-icons/pi";
import { RiLinksLine } from "react-icons/ri";
import { RxText } from "react-icons/rx";
import { FiUpload, FiCreditCard } from "react-icons/fi";
import { GoImage } from "react-icons/go";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const CMSSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

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
  }: {
    label?: string;
    placeholder?: string;
    value?: string;
    helperText?: string;
  }) => (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-[#D1D5DC] text-sm ">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        className="bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none transition-all"
      />
      {helperText && (
        <p className="text-[#99A1AF] text-xs mt-1">{helperText}</p>
      )}
    </div>
  );

  const ImageUploader = ({
    label,
    helperText,
  }: {
    label?: string;
    helperText?: string;
  }) => (
    <div className="flex flex-col gap-3 w-full max-w-[400px]">
      {label && <label className="text-[#D1D5DC] text-sm ">{label}</label>}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#C27AFF21] border border-[#C27AFF] px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#C27AFF33] transition-all">
          <FiUpload className="text-[#D1D5DC]" size={18} />
          <span className="text-[#D1D5DC] text-sm font-medium">
            Choose File
          </span>
        </div>
        <span className="text-[#6A7282] text-sm">No file chosen</span>
      </div>
      {helperText && <p className="text-[#6A7282] text-sm">{helperText}</p>}
      <div className="w-[180px] h-[180px] bg-[#C27AFF0D] border border-[#C27AFF] rounded-2xl flex items-center justify-center mt-1">
        <GoImage className="text-[#4A5565] text-5xl opacity-40" />
      </div>
    </div>
  );

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
          <button className="px-6 py-2.5 flex gap-2 rounded-lg shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#9810FA] text-white text-sm cursor-pointer whitespace-nowrap">
            <PiFloppyDisk className="text-lg" />
            Save Changes
          </button>
        </div>

        {/* Main Content Container */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          {/* Site Title */}
          <section>
            <SectionHeading icon={RxText} title="Site Title" />
            <InputField label="Site Name" value="Online Casino | Propersix" />
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
              />
              <ImageUploader
                label="Logo"
                helperText="upload a logo of PNG/JPEG"
              />
            </div>
          </section>
        </div>

        {/* Header Menu Bar */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={IoMenu} title="Header Menu Bar" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Menu Text 1" />
              <InputField label="Menu Text 2" />
              <InputField label="Menu Text 3" />
              <InputField label="Menu Text 4" />
              <InputField label="Menu Text 5" />
              <InputField label="Menu Button Text 1" />
              <InputField label="Menu Button Text 2" />
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
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader
                  label="Banner Background Image"
                  helperText="upload a background image of JPG/JPEG"
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
              <InputField label="Winner Section Heading" />
              <InputField label="Winner Table Cell1 Heading" />
              <InputField label="Winner Table Cell2 Heading" />
              <InputField label="Winner Table Cell3 Heading" />
            </div>
          </section>
        </div>

        {/* Table Rows Sections */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <div>
            <SectionHeading icon={IoMdStats} title="Table 1st Row Data" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Row (1) data (1)" value="Peter Depth" />
              <InputField label="Row (1) data (2)" value="28:11" />
              <InputField label="Row (1) data (3)" value="3250 PlayFie" />
            </div>
          </div>
        </div>
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <div>
            <SectionHeading icon={IoMdStats} title="Table 2nd Row Data" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Row (2) data (1)" value="TrottingTimu" />
              <InputField label="Row (2) data (2)" value="13:28" />
              <InputField label="Row (2) data (3)" value="1724 PlayFie" />
            </div>
          </div>
        </div>
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <div>
            <SectionHeading icon={IoMdStats} title="Table 3rd Row Data" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Row (3) data (1)" value="ClownFinale" />
              <InputField label="Row (3) data (2)" value="16:51" />
              <InputField label="Row (3) data (3)" value="1186 PlayFie" />
            </div>
          </div>
        </div>
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <div>
            <SectionHeading icon={IoMdStats} title="Table 4th Row Data" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Row (4) data (1)" value="TrottingTimu" />
              <InputField label="Row (4) data (2)" value="13:51" />
              <InputField label="Row (4) data (3)" value="921 PlayFie" />
            </div>
          </div>
        </div>

        {/* Promotion Top Section */}
        <div className="bg-[#10182800] border border-[#C27AFF21] rounded-[32px] p-8 md:p-12 space-y-16 mb-10">
          <section>
            <SectionHeading icon={IoMdImage} title="Promotion Top Section" />
            <ImageUploader
              label="Promotion Top-Background Image"
              helperText="upload a background image of JPG/JPEG"
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
                <textarea className="bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none min-h-[120px]" />
                <p className="text-[#99A1AF] text-xs">
                  embed paragraph inside p and header inside h - tags
                </p>
              </div>
              <InputField
                label="Header For Subscribe Section"
                value="footer_newsletter_h1"
              />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>

              <InputField label="Input Field Place Holder" />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>
              <InputField label="Subscribe Button Text" />
              <p className="text-[#99A1AF] -mt-4 text-xs">
                embed paragraph inside p and header inside h - tags
              </p>
              <InputField label="Copy Right Statement" />
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
              <InputField
                label="Footer link 1"
                value={
                  '<a href="https://www.propersix.casino/privacy-policy">Privacy Policy</a>'
                }
                helperText="use html a tag to define link"
              />
              <InputField
                label="Footer link 2"
                value={
                  '<a href="https://www.propersix.casino/cookies">Cookies</a>'
                }
                helperText="use html a tag to define link"
              />
              <InputField
                label="Footer link 3"
                value={
                  '<a href="https://www.propersix.casino/terms-and-services">Terms and Services</a>'
                }
                helperText="use html a tag to define link"
              />
              <InputField
                label="Footer link 4"
                value={
                  '<a href="https://www.propersix.casino/support">Support</a>'
                }
                helperText="use html a tag to define link"
              />
              <InputField
                label="Footer link 5"
                helperText="use html a tag to define link"
              />
              <InputField
                label="Footer link 6"
                helperText="use html a tag to define link"
              />
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
                value="ca_http://code.jivosite.com/widget.js"
                label="Chat Script"
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
                value="SG.ywqs1vExVrDhaDpgxX.vr1sanKlHtIBDUblsk9FdBxl-J_fPgs65CcJn74"
                helperText="just enter script link"
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
                onClick={() => setMaintenanceMode(!maintenanceMode)}
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
          <button className="px-6 py-2.5 rounded-lg shadow-[0_10px_15px_-3px_#AD46FF4D] flex items-center gap-2 bg-[#9810FA] text-white text-sm cursor-pointer whitespace-nowrap">
            <PiFloppyDisk className="text-lg" />
            Update Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default CMSSettings;
