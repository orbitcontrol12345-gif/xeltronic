"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

const isActive = (href: string) => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};
  const [headerSearch, setHeaderSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const headerProducts = [
    {
      part: "LV431490",
      name: "Schneider LV431490 Trip Unit Micrologic 5.2 A - 250A",
      image: "/LV431490.jpg",
    },
    {
      part: "48789",
      name: "48789 Schneider Electric AAV65492 Masterpact GetnSet",
      image: "/48789.jpg",
    },
    {
      part: "LV437022",
      name: "Schneider LV437022 Trip Unit Micrologic 3.2",
      image: "/LV437022.jpg",
    },
    {
      part: "TSXDEY32D2K",
      name: "Schneider Electric TSXDEY32D2K Input Module",
      image: "/TSXDEY32D2K.jpg",
    },
  ];

  const headerSuggestions =
    headerSearch.trim() === ""
      ? []
      : headerProducts
          .filter((product) =>
            `${product.part} ${product.name}`
              .toLowerCase()
              .includes(headerSearch.toLowerCase())
          )
          .slice(0, 5);

  const goToProduct = (part: string) => {
    setHeaderSearch("");
    router.push(`/products/${part}`);
  };

  return (
    <header className="fixed left-0 top-0 z-50 h-45 w-full border-b border-white/10 bg-[#071018]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="absolute left-1/2 hidden w-[520px] -translate-x-1/2 lg:block">
          <div className="relative">
  <input
    value={headerSearch}
    onChange={(e) => setHeaderSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && headerSuggestions.length > 0) {
        goToProduct(headerSuggestions[0].part);
      }

      if (e.key === "Escape") {
        setHeaderSearch("");
      }
    }}
    type="text"
    placeholder="Search part number..."
    className="w-full rounded-xl border border-white/10 bg-[#0c1822] px-4 py-2 pr-10 text-sm text-white outline-none"
  />

  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-white/40">
    🔍
  </div>
</div>
          {headerSearch.trim() !== "" && (
            <div className="absolute left-0 top-full z-[9999] mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl">
              {headerSuggestions.map((product) => (
                <button
                  key={product.part}
                  type="button"
                  onClick={() => goToProduct(product.part)}
                  className="flex w-full items-center gap-3 border-b border-white/10 px-3 py-3 text-left transition hover:bg-yellow-400 hover:text-black"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded bg-white object-contain p-1"
                  />

                  <div>
                    <div className="font-bold">{product.part}</div>
                    <div className="text-xs opacity-70">{product.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.png.png"
            alt="Xeltronic"
            className="max-h-60 w-auto object-contain"
          />
        </a>

  <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
  <a
    href="/"
    className={`relative hover:text-yellow-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400 ${
      isActive("/") ? "text-yellow-400 after:w-full" : "text-gray-300 after:w-0"
    }`}
  >
    Home
  </a>

  <a
  href="/#products"
  className={`relative hover:text-yellow-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400 ${
    typeof window !== "undefined" && window.location.hash === "#products"
      ? "text-yellow-400 after:w-full"
      : "text-gray-300 after:w-0"
  }`}
>
  Products
</a>

  <a
    href="/rfq"
    className={`relative hover:text-yellow-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400 ${
      isActive("/rfq") ? "text-yellow-400 after:w-full" : "text-gray-300 after:w-0"
    }`}
  >
    RFQ
  </a>

  <a
    href="/contact"
    className={`relative hover:text-yellow-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400 ${
      isActive("/contact") ? "text-yellow-400 after:w-full" : "text-gray-300 after:w-0"
    }`}
  >
    Contact
  </a>
</nav>

        <button
          className="text-2xl text-white md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </div>

      {mobileMenu && (
        <div className="border-t border-white/10 bg-[#071018]/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4 p-6 text-white">
            <a href="/">Home</a>
            <a href="/#products">Products</a>
            <a href="/rfq">RFQ</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
