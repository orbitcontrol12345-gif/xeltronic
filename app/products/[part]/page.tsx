import Link from "next/link";
import { products } from "@/app/data/products";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;

  const product = products.find(
    (item) => item.part.toLowerCase() === part.toLowerCase()
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-[#071018] px-4 pt-36 pb-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-sm font-semibold text-yellow-400 hover:text-yellow-300">
            ← Back to Home
          </Link>
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0c1822] p-8 shadow-2xl shadow-black/20">
            <h1 className="text-3xl font-black sm:text-4xl">Product not found</h1>
            <p className="mt-3 max-w-xl text-gray-400">
              The requested part number is not available in the current catalogue.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const rfqLink = `/rfq?part=${encodeURIComponent(product.part)}`;

  const details = [
    ["Brand", product.brand],
    ["Availability", "Available for RFQ"],
    ["SKU", `XEL-${product.part}`],
    ["Shipping", "DHL / FedEx Worldwide"],
    ["Condition", product.condition],
    ["Datasheet", "Available Upon Request"],
  ];

  const trustItems = [
    ["🛡️", "100% Original", "Genuine industrial parts"],
    ["🌍", "Worldwide Shipping", "DHL / FedEx Express"],
    ["🏅", "Quality Checked", "Tested & verified"],
    ["🎧", "RFQ Support", "Fast sales response"],
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#071018] px-4 pt-32 pb-20 text-white sm:px-6 lg:px-8 lg:pt-36">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,203,5,0.10),transparent_32%),radial-gradient(circle_at_top_right,rgba(30,94,140,0.22),transparent_34%)]" />

      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-sm font-bold text-yellow-400 transition hover:border-yellow-400/60 hover:bg-yellow-400/10"
        >
          ← Back to Home
        </Link>

        <section className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-10">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-white p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-100 p-4 sm:min-h-[390px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[330px] w-full max-w-[560px] object-contain transition duration-300 hover:scale-105"
                />
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-20 items-center justify-center rounded-2xl border border-yellow-400/80 bg-white p-2 shadow-sm sm:h-24"
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} thumbnail ${i}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-white/10 bg-[#0c1822]/95 p-4 shadow-xl shadow-black/20 sm:grid-cols-4 sm:p-5">
              {trustItems.map(([icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center">
                  <div className="text-2xl">{icon}</div>
                  <p className="mt-2 text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-snug text-gray-400">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b1620]/95 p-5 shadow-2xl shadow-black/25 sm:p-7 lg:border-l-yellow-400/30">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-yellow-400">
                {product.brand}
              </span>
              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-bold text-green-400">
                Available for RFQ
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 grid gap-3 text-sm text-gray-300 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">Part Number</p>
                <p className="mt-1 break-words font-black text-white">{product.part}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">Condition</p>
                <p className="mt-1 font-black text-green-400">{product.condition}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">Category</p>
                <p className="mt-1 font-black text-white">{product.category}</p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300">
              {product.name} is available for quotation from Xeltronic Electrical Solution.
              Contact our sales team for price, stock availability, datasheet support and
              worldwide express shipping.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={rfqLink}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-yellow-400 px-7 text-sm font-black text-black shadow-lg shadow-yellow-400/10 transition hover:bg-yellow-300"
              >
                Request a Quote
              </a>
              <a
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-7 text-sm font-black text-white transition hover:border-yellow-400/80 hover:text-yellow-400"
              >
                Contact Sales
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-[#101f2b] p-4 transition hover:border-yellow-400/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
                  <p className={`mt-2 break-words text-sm font-black ${label === "Availability" ? "text-green-400" : "text-white"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black text-white">Need a datasheet?</p>
                <p className="mt-1 text-sm text-gray-400">
                  Send us the part number and we will confirm the official datasheet.
                </p>
              </div>
              <a
                href={rfqLink}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-yellow-400 px-5 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                Request Datasheet
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[28px] border border-white/10 bg-[#0c1822]/95 p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4 text-sm font-bold">
              <span className="rounded-full bg-yellow-400 px-4 py-2 text-black">Description</span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-gray-400">Specifications</span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-gray-400">Shipping & Delivery</span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-gray-400">Warranty</span>
            </div>

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-300">
              <p>
                <strong className="text-white">{product.name}</strong> is supplied for B2B industrial automation and electrical maintenance requirements. We support surplus, obsolete and hard-to-find components for factories, system integrators and resale customers.
              </p>
              <p>
                Every quotation can include price, stock confirmation, lead time, shipping options and packaging details according to your destination.
              </p>

              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  `Part Number: ${product.part}`,
                  `Brand: ${product.brand}`,
                  `Category: ${product.category}`,
                  `Condition: ${product.condition}`,
                  "Worldwide Shipping Available",
                  "RFQ Response Within Hours",
                  "DHL / FedEx Express Delivery",
                  "Secure Industrial Packaging",
                ].map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="text-yellow-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-white/10 bg-[#0c1822]/95 p-6 shadow-xl shadow-black/20">
              <h3 className="text-2xl font-black text-yellow-400">Why Choose Xeltronic?</h3>
              <div className="mt-5 space-y-4 text-sm text-gray-300">
                {[
                  ["100% Genuine Parts", "Original industrial automation components sourced from trusted suppliers."],
                  ["Global Shipping", "Fast worldwide delivery via DHL, FedEx and major logistics partners."],
                  ["Competitive Pricing", "Cost-effective sourcing for obsolete and hard-to-find automation parts."],
                  ["Dedicated Support", "Technical assistance and RFQ support from our experienced team."],
                ].map(([title, text]) => (
                  <div key={title} className="border-l-2 border-yellow-400/60 pl-4">
                    <h4 className="font-black text-white">{title}</h4>
                    <p className="mt-1 text-gray-400">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-yellow-400/20 bg-gradient-to-br from-[#102030] to-[#0c1822] p-6 shadow-xl shadow-black/20">
              <h3 className="text-2xl font-black text-yellow-400">Xeltronic Electrical Solution</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Your trusted partner for industrial automation and electrical components.
              </p>
              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <p>✓ Years of industry experience</p>
                <p>✓ Wide range of in-stock and hard-to-find parts</p>
                <p>✓ Quick RFQ response</p>
                <p>✓ Secure packaging and reliable delivery</p>
              </div>
              <div className="mt-7 border-t border-yellow-400/30 pt-5">
                <p className="font-black text-white">Can’t find what you need?</p>
                <p className="mt-2 text-sm text-gray-400">Our team can help you source it.</p>
                <a href={rfqLink} className="mt-4 inline-flex font-black text-yellow-400 hover:text-yellow-300">
                  Submit an RFQ →
                </a>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
