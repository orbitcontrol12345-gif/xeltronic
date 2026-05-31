"use client";

import { useState } from "react";

export default function SellPage() {
  const [status, setStatus] = useState("idle");
const [fileName, setFileName] = useState("");
  return (
    <main className="min-h-screen bg-[#071018] px-6 pt-44 pb-20 text-white">
      <section className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow-400">
            Sell Your Industrial Surplus
          </p>

          <h1 className="text-5xl font-black leading-tight">
            Turn Your Surplus Automation Parts Into Cash.
          </h1>

          <p className="mt-6 max-w-xl text-gray-300">
            We buy new, used, obsolete, and surplus industrial automation parts.
            Send us your inventory list, photos, or part numbers and our team
            will review your items quickly.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0c1822] p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-400">
            Submit Your Inventory
          </h2>

          <form
            className="mt-8 space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();

              const form = e.currentTarget;
              const formData = new FormData(form);
const company = formData.get("company")?.toString().trim();
const contact = formData.get("contact")?.toString().trim();
const email = formData.get("email")?.toString().trim();
const phone = formData.get("phone")?.toString().trim();
const message = formData.get("message")?.toString().trim();

if (!company || !contact || !email || !phone || !message) {
  setStatus("error");
  return;
}
              setStatus("sending");

              const res = await fetch("/api/sell", {
                method: "POST",
                body: formData,
              });

              if (res.ok) {
                setStatus("success");
setFileName("");
form.reset();
              } else {
                setStatus("error");
              }
            }}
          >
            <input
              name="company"
              required
              className="w-full rounded-xl border border-white/10 bg-[#071018] px-5 py-4 outline-none focus:border-yellow-400"
              placeholder="Company Name"
            />

            <input
              name="contact"
              required
              className="w-full rounded-xl border border-white/10 bg-[#071018] px-5 py-4 outline-none focus:border-yellow-400"
              placeholder="Contact Person"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="email"
                required
                className="w-full rounded-xl border border-white/10 bg-[#071018] px-5 py-4 outline-none focus:border-yellow-400"
                placeholder="Email Address"
              />

              <input
                name="phone"
                required
                className="w-full rounded-xl border border-white/10 bg-[#071018] px-5 py-4 outline-none focus:border-yellow-400"
                placeholder="WhatsApp / Phone"
              />
            </div>

            <textarea
              name="message"
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-[#071018] px-5 py-4 outline-none focus:border-yellow-400"
              placeholder="Brand, part numbers, quantity, condition, notes..."
            />

            <label className="block cursor-pointer rounded-xl border border-dashed border-yellow-400/50 bg-yellow-400/5 p-6 text-center hover:bg-yellow-400/10">
              <span className="font-bold text-yellow-400">
                Upload Excel / Photos / PDF
              </span>
              <input
  name="files"
  type="file"
  multiple
  required
  accept=".xls,.xlsx,.csv,.pdf,.jpg,.jpeg,.png"
  className="hidden"
  onChange={(e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setFileName("");
      return;
    }

    if (files.length === 1) {
      setFileName(`📄 ${files[0].name}`);
    } else {
      setFileName(`📄 ${files.length} files selected`);
    }
  }}
/>
            </label>
{fileName && (
  <div className="rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm font-bold text-green-400">
    {fileName} ready to send
  </div>
)}
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full rounded-xl px-8 py-4 font-black transition-all duration-300 ${
                status === "success"
                  ? "bg-green-600 text-white"
                  : status === "error"
                  ? "bg-red-600 text-white"
                  : status === "sending"
                  ? "bg-gray-500 text-white"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
            >
              {status === "sending"
  ? "Sending..."
  : status === "success"
  ? "✓ Submitted Successfully"
  : status === "error"
  ? "✕ Please Complete All Required Fields"
  : "Send Inventory for Review"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}