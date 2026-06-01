"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "./data/products";
export default function Home() {
  const brands = ["SIEMENS", "ABB", "SCHNEIDER", "OMRON", "HONEYWELL", "YOKOGAWA"];


  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const suggestions = products
    .filter((product) =>
      `${product.name} ${product.part} ${product.brand}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 6);

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.part} ${product.brand}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesBrand =
      selectedBrand === "ALL" ||
      product.brand.toUpperCase().includes(selectedBrand) ||
      product.name.toUpperCase().includes(selectedBrand);

    return matchesSearch && matchesBrand;
  });

  return (
    <main className="min-h-screen bg-[#071018] text-white">
      <section className="hero-bg">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-6 flex flex-wrap gap-3">
  <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold text-yellow-300">
    50,000+ Industrial Parts
  </span>

  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-200">
    RFQ Response Within Hours
  </span>

  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-200">
    DHL / FedEx Worldwide
  </span>
</div>

          <h2 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Find PLCs, Drives, HMIs, Sensors & Control Parts Fast.
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Search by part number, brand, or product name. Request a quote
            instantly for new, used, and surplus industrial automation parts.
          </p>

          <div className="relative mt-10 max-w-4xl">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by part number, brand, or product name..."
              className="w-full rounded-[32px] border border-white/10 bg-white/10 px-8 py-6 pr-24 text-2xl text-white outline-none backdrop-blur-md placeholder:text-white/30"
            />

            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl text-white/50">
  🔍
</div>

            {search && (
  <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl">

    {suggestions.length > 0 ? (

      suggestions.map((product) => (
        <Link
          key={product.part}
          href={`/products/${product.part}`}
          onClick={() => setSearch("")}
          className="flex items-center gap-4 border-b border-white/10 px-5 py-4 text-white transition hover:bg-yellow-400 hover:text-black"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-14 w-14 rounded-lg bg-white object-contain p-1"
          />

          <div>
            <div className="font-bold">{product.part}</div>
            <div className="text-sm opacity-70">{product.name}</div>
            <div className="mt-1 text-xs opacity-60">
              {product.brand} • {product.condition}
            </div>
          </div>
        </Link>
      ))

    ) : (

      <a
        href={`/rfq?part=${encodeURIComponent(search)}`}
        className="block px-5 py-5 text-white transition hover:bg-yellow-400 hover:text-black"
      >
        <div className="font-bold">
          No products found
        </div>

        <div className="text-sm opacity-70">
          Submit RFQ for: {search}
        </div>
      </a>

    )}

  </div>
)}
            

          </div>
        </div>
        <div className="absolute left-20 top-[32%] -translate-y-1/2 scale-90">
  <a
  href="/sell"
  className="sell-card hidden md:block"
>
    <div className="sell-icon">⚡</div>

    <h1>SELL SURPLUS</h1>
<h1>AUTOMATION</h1>
<h1>PARTS</h1>
    <div className="sell-features">
      <span>💰 Instant Cash</span>
      <span>🏷 Fair Prices</span>
      <span>⚡ Fast & Easy</span>
    </div>

    <div className="sell-btn">
      GET CASH OFFER → →
    </div>
  </a>
</div>
      </section>

      <section
        id="brands"
        className="sticky top-36 z-40 border-y border-white/10 bg-[#071018]/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto whitespace-nowrap px-6 py-8 md:justify-center">
          <button
            onClick={() => setSelectedBrand("ALL")}
            className={`min-w-[130px] rounded-xl px-6 py-4 text-sm font-bold transition ${
              selectedBrand === "ALL"
                ? "bg-yellow-400 text-black"
                : "border border-white/10 bg-[#0c1822] text-white hover:bg-yellow-400 hover:text-black"
            }`}
          >
            ALL
          </button>

          {brands.map((brand) => (
  <button
    key={brand}
    onClick={() => setSelectedBrand(brand)}
    className={`min-w-[130px] rounded-xl border px-6 py-4 transition ${
      selectedBrand === brand
        ? "border-yellow-400 bg-yellow-400"
        : "border-white/10 bg-[#0c1822] hover:border-yellow-400/50"
    }`}
  >
    <img
      src={`/brands/${brand.toLowerCase()}.png`}
      alt={brand}
      className={`mx-auto h-8 w-28 object-contain transition-all duration-300 ${
        selectedBrand === brand
          ? "opacity-100 brightness-100"
          : "opacity-35 grayscale hover:opacity-100 hover:grayscale-0"
      }`}
    />
  </button>
))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm text-yellow-400">Featured Inventory</p>
            <h3 className="text-3xl font-bold">Popular Products</h3>
            <p className="mt-2 text-sm text-gray-400">
  {filteredProducts.length} Products Found
</p>
          </div>

          <a href="#" className="text-sm text-gray-300 hover:text-yellow-400">
            View all products →
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.part}
              className="rounded-2xl border border-white/10 bg-[#0c1822] p-5 shadow-xl transition hover:-translate-y-1 hover:border-yellow-400/50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-5 h-36 w-full rounded-xl bg-white object-contain p-3"
              />

              <p className="text-xs font-bold text-yellow-400">
                {product.brand}
              </p>

              <h4 className="mt-2 min-h-12 text-lg font-bold">
                {product.name}
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                Part No: {product.part}
              </p>

              <p className="mt-2 text-sm text-green-400">
                Condition: {product.condition}
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  href={`/products/${product.part}`}
                  className="flex-1 rounded-xl border border-white/20 px-5 py-3 text-center font-bold hover:border-yellow-400"
                >
                  Details
                </Link>

                <Link
                  href={`/rfq?part=${product.part}`}
                  className="flex-1 rounded-xl bg-yellow-400 px-5 py-3 text-center font-bold text-black hover:bg-yellow-300"
                >
                  RFQ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-white/10 bg-[#071018] px-6 py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-yellow-400">
              Xeltronic Electrical Solution
            </h3>

            <p className="text-gray-300">
              Global supplier of industrial automation parts, PLCs, HMIs,
              drives, sensors, and control systems.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">WhatsApp</h4>

            <a
              href="https://wa.me/971506154473"
              target="_blank"
              className="text-gray-300 transition hover:text-yellow-400"
            >
              +971 55 483 5199
            </a>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Contact</h4>

            <p className="text-gray-300">info@xeltronic.com</p>

            <p className="mt-2 text-gray-300">+971 6 767 7094</p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Location</h4>

            <p className="text-gray-300">Ajman, UAE</p>

            <a
              href="https://www.google.com/maps/place/Orbit+Control+Electronics+L.L.C/@25.4342586,55.5163404,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f94e997dd043:0x9bf8fc085d24a50e!8m2!3d25.4342586!4d55.5137655!16s%2Fg%2F11j23hkdmv?entry=ttu"
              target="_blank"
              className="mt-3 inline-block text-yellow-400 hover:text-yellow-300"
            >
              View on Map →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
