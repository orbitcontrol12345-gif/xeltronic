"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const requiredFields = [
      "fullName",
      "company",
      "email",
      "phone",
      "part",
      "quantity",
      "message",
    ];

    const hasEmptyField = requiredFields.some((field) => {
      const value = data.get(field);
      return !value || String(value).trim() === "";
    });

    if (hasEmptyField) {
      setStatus("error");
      setMessage("Please fill in all required fields before sending.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    const formData = new FormData();

    formData.append("name", String(data.get("fullName") || ""));
    formData.append("company", String(data.get("company") || ""));
    formData.append("email", String(data.get("email") || ""));
    formData.append("phone", String(data.get("phone") || ""));
    formData.append("part", String(data.get("part") || ""));
    formData.append("brand", String(data.get("brand") || ""));
    formData.append("quantity", String(data.get("quantity") || ""));
    formData.append("message", String(data.get("message") || ""));

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed");
      }

      setStatus("success");
      setMessage("Message sent successfully. Our sales team will contact you shortly.");
      setFileName("");
      setAttachments([]);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Message sending failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#071018] px-4 pt-32 pb-16 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Xeltronic Electrical Solution
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Contact Our Industrial Sales Team
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Send us your inquiry for PLCs, HMIs, drives, sensors, control systems,
            surplus stock, obsolete parts and industrial automation components.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.25fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0c1822] p-5 shadow-2xl shadow-black/25">
            <h2 className="text-2xl font-black text-yellow-400">Sales Contact</h2>

            <div className="mt-5 grid gap-3">
              <ContactItem icon="✉️" label="Email" value="info@xeltronic.com" />
              <ContactItem icon="🟢" label="WhatsApp" value="+971 55 483 5199" />
              <ContactItem icon="📞" label="Phone" value="+971 6 767 7094" />
              <ContactItem icon="📍" label="Location" value="Ajman, United Arab Emirates" />
              <ContactItem icon="💼" label="Business" value="Industrial automation spare parts supplier" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoCard icon="⚡" title="Fast RFQ Response" text="Send part numbers and quantity. Our team will reply as soon as possible." />
              <InfoCard icon="🌍" title="Worldwide Shipping" text="We arrange delivery via DHL, FedEx and trusted logistics partners." />
              <InfoCard icon="🔎" title="Hard-to-Find Parts" text="We help source obsolete, surplus and discontinued parts." />
              <InfoCard icon="🛡️" title="B2B Support" text="Suitable for factories, resellers, maintenance teams and integrators." />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0c1822] p-5 shadow-2xl shadow-black/30 sm:p-6">
            <h2 className="text-2xl font-black">Send Message</h2>

            <p className="mt-2 text-sm text-gray-400">
              Fill the form below and our team will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="fullName" placeholder="Full Name *" />
                <Input name="company" placeholder="Company Name *" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="email" type="email" placeholder="Email Address *" />
                <Input name="phone" placeholder="Phone / WhatsApp *" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Input name="part" placeholder="Part Number *" />
                <Input name="brand" placeholder="Brand" />
                <Input name="quantity" placeholder="Quantity *" />
              </div>

              <textarea
                name="message"
                placeholder="Message / Requirements *"
                rows={12}
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#071018] px-5 py-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
              />

              <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4 transition hover:border-yellow-400/60 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-black text-white">Upload File / Image / PDF</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Optional: upload product photo, datasheet, PDF, Excel or document files.
                  </p>
                </div>

                <span className="rounded-xl border border-white/15 px-5 py-3 text-sm font-black text-white">
                  Choose File
                </span>

                <input
                  type="file"
                  name="attachments"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setAttachments(files);
                    setFileName(files.map((file) => file.name).join(", "));
                  }}
                  className="hidden"
                />
              </label>

              {fileName && (
                <div className="rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm font-bold text-green-400">
                  ✅ Files selected: {fileName}
                </div>
              )}

              {message && (
                <div
                  className={`rounded-2xl border px-5 py-4 text-sm font-bold ${
                    status === "success"
                      ? "border-green-400/30 bg-green-400/10 text-green-400"
                      : "border-red-400/30 bg-red-400/10 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-2xl px-6 py-4 text-sm font-black text-black transition ${
                  status === "success"
                    ? "bg-green-400 hover:bg-green-300"
                    : loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-yellow-400 hover:bg-yellow-300"
                }`}
              >
                {status === "success"
                  ? "Message Sent Successfully"
                  : loading
                  ? "Sending Message..."
                  : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-[28px] border border-white/10 bg-[#0c1822] p-5 shadow-xl shadow-black/20 sm:grid-cols-4">
          <TrustItem icon="🛡️" title="100% Genuine" text="Industrial components" />
          <TrustItem icon="🚚" title="DHL / FedEx" text="Worldwide shipping" />
          <TrustItem icon="📦" title="Secure Packaging" text="Export ready" />
          <TrustItem icon="🎧" title="RFQ Support" text="Fast response" />
        </div>
      </section>
    </main>
  );
}

function ContactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-yellow-400/25 bg-yellow-400/10 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-yellow-400">{label}</p>
        <p className="mt-1 text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-2xl text-yellow-400">{icon}</div>
      <h3 className="mt-3 font-black text-white">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-gray-400">{text}</p>
    </div>
  );
}

function Input({
  placeholder,
  name,
  type = "text",
}: {
  placeholder: string;
  name: string;
  type?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-[#071018] px-5 py-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
    />
  );
}

function TrustItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
      <div className="text-2xl text-yellow-400">{icon}</div>
      <div>
        <p className="font-black text-yellow-400">{title}</p>
        <p className="mt-1 text-xs text-gray-400">{text}</p>
      </div>
    </div>
  );
}