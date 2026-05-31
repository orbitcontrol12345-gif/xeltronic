"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function RFQPageContent() {
  const searchParams = useSearchParams();
const [fileName, setFileName] = useState("");
  const [part, setPart] = useState(searchParams.get("part") || "");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);  
const [attachments, setAttachments] = useState<File[]>([]);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("");
    setNotice("");

    const requiredFields = [
      { value: name, label: "Full Name" },
      { value: email, label: "Email Address" },
      { value: phone, label: "WhatsApp / Phone" },
      { value: part, label: "Part Number" },
      { value: quantity, label: "Quantity" },
      { value: message, label: "Message / Requirements" },
    ];

    const emptyField = requiredFields.find((field) => !field.value.trim());

    if (emptyField) {
      setStatus("error");
      setNotice(`Please enter ${emptyField.label}.`);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

formData.append("name", name);
formData.append("company", company);
formData.append("email", email);
formData.append("phone", phone);
formData.append("part", part);
formData.append("quantity", quantity);
formData.append("country", country);
formData.append("message", message);

attachments.forEach((file) => {
  formData.append("attachments", file);
});

const response = await fetch("/api/rfq", {
  method: "POST",
  body: formData,
});

const data = await response.json();

      if (data.success) {
        setStatus("success");
        setNotice("RFQ sent successfully. Our sales team will contact you shortly.");

        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setPart("");
        setQuantity("");
        setCountry("");
        setMessage("");
      } else {
        setStatus("error");
        setNotice("Failed to send RFQ. Please try again or contact us by WhatsApp.");
      }
    } catch {
      setStatus("error");
      setNotice("Failed to send RFQ. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-[#071018] px-4 pt-28 pb-20 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <a
          href="/"
          className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-sm font-bold text-yellow-400 transition hover:border-yellow-400/60 hover:bg-yellow-400/10"
        >
          ← Back to Home
        </a>

        <div className="mt-6 text-center lg:text-left">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Xeltronic Electrical Solution
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Request an Industrial Quote
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Send your part number, quantity and delivery details. Our sales team will confirm
            price, availability and worldwide shipping options.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-7 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[30px] border border-white/10 bg-[#0c1822] p-6 shadow-2xl shadow-black/25 sm:p-7">
            <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5">
              <p className="text-sm font-black uppercase tracking-widest text-yellow-400">
                RFQ Response Time
              </p>
              <h2 className="mt-3 text-4xl font-black text-white">
                Within Hours
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                Fast quotation turnaround for industrial automation, electrical spare parts,
                surplus stock and obsolete components.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <BenefitItem title="RFQ Response Within Hours" text="Quick response for urgent maintenance and resale requirements." />
              <BenefitItem title="DHL / FedEx Worldwide" text="Export-ready packing and international delivery support." />
              <BenefitItem title="New, Used & Obsolete Parts" text="Support for discontinued and hard-to-find automation components." />
              <BenefitItem title="50,000+ Industrial Parts" text="PLCs, HMIs, drives, sensors, control boards and electrical components." />
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-[#071018] p-5">
              <h3 className="font-black text-yellow-400">Supported Brands</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                ABB • Siemens • Schneider Electric • Honeywell • Omron • Yokogawa • GE •
                Phoenix Contact • Allen-Bradley
              </p>
            </div>
          </aside>

          <section className="rounded-[30px] border border-white/10 bg-[#0c1822] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
                  Quote Request Form
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Send Your RFQ
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
                  Add the exact part number and quantity. Photos, datasheets or extra notes can be
                  described in the message field.
                </p>
              </div>

              <div className="rounded-2xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm font-black text-green-400">
                Available for RFQ
              </div>
            </div>

            <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  required
                  value={name}
                  onChange={setName}
                  placeholder="Full Name *"
                />
                <FormInput
                  value={company}
                  onChange={setCompany}
                  placeholder="Company Name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Email Address *"
                />
                <FormInput
                  required
                  value={phone}
                  onChange={setPhone}
                  placeholder="WhatsApp / Phone *"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <FormInput
                  required
                  value={part}
                  onChange={setPart}
                  placeholder="Part Number *"
                />
                <FormInput
                  required
                  value={quantity}
                  onChange={setQuantity}
                  placeholder="Quantity *"
                />
                <FormInput
                  value={country}
                  onChange={setCountry}
                  placeholder="Ship To Country"
                />
              </div>

              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="min-h-[190px] rounded-2xl border border-white/10 bg-[#071018] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400"
                placeholder="Message / Requirements *"
              />

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-gray-400">
                Tip: Include brand, model, condition needed, delivery country and any deadline.
                Example: “Siemens 6ES7..., 2 pcs, new or used acceptable, ship to UAE.”
              </div>
              
<label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4 transition hover:border-yellow-400/60 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="font-black text-white">Upload File / Image / PDF</p>
    <p className="mt-1 text-xs text-gray-400">
      Optional: upload product photo, datasheet, PDF or BOM file.
    </p>
  </div>

  <span className="rounded-xl border border-yellow-400/40 px-5 py-3 text-sm font-black text-yellow-400">
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
  <p className="rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm font-bold text-green-400">
    ✅ File selected: {fileName}
  </p>
)}
              {notice && (
                <div
                  className={`rounded-2xl border px-5 py-4 text-center text-sm font-bold ${
                    status === "success"
                      ? "border-green-400/30 bg-green-400/10 text-green-400"
                      : "border-red-400/30 bg-red-400/10 text-red-400"
                  }`}
                >
                  {status === "success" ? "✅ " : "❌ "}
                  {notice}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-2xl px-8 py-4 text-sm font-black transition-all duration-300 ${
                  status === "success"
                    ? "bg-green-500 text-white shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                    : loading
                    ? "cursor-not-allowed bg-gray-400 text-black"
                    : "bg-yellow-400 text-black hover:scale-[1.02] hover:bg-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.25)] active:scale-95"
                }`}
              >
                {status === "success"
                  ? "RFQ Sent Successfully"
                  : loading
                  ? "Sending RFQ..."
                  : "Submit Request"}
              </button>

              <div className="grid gap-3 pt-2 text-xs text-gray-400 sm:grid-cols-3">
                <p>✓ Response Within Hours</p>
                <p>✓ Worldwide DHL / FedEx</p>
                <p>✓ Secure Industrial Packaging</p>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      required={required}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-2xl border border-white/10 bg-[#071018] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400"
      placeholder={placeholder}
    />
  );
}

function BenefitItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-black text-white">✓ {title}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">{text}</p>
    </div>
  );
}


export default function RFQPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#071018] text-white" />}>
      <RFQPageContent />
    </Suspense>
  );
}
