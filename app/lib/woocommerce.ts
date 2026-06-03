export type Product = {
  name: string;
  part: string;
  sku: string;
  brand: string;
  condition: string;
  image: string;
  category: string;
  description: string;
};
const baseUrl = process.env.WC_BASE_URL!;
const key = process.env.WC_CONSUMER_KEY!;
const secret = process.env.WC_CONSUMER_SECRET!;

function cleanHtml(html: string = "") {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractCondition(item: any): string {
  const text = `${item.name || ""} ${cleanHtml(item.description || "")}`.toLowerCase();

  if (text.includes("new – open box") || text.includes("new - open box")) return "New – Open box";
  if (text.includes("open box")) return "Open box";
  if (text.includes("used")) return "Used";
  if (text.includes("new")) return "New";

  return "Available";
}

function extractPartNumber(item: any): string {
  const name = item.name || "";

  const brandWords = [
    "SICK", "KOMYO", "HONEYWELL", "ALLEN BRADLEY", "ALLEN-BRADLEY",
    "SIEMENS", "ABB", "SCHNEIDER", "PHILIPS", "PILZ", "OMRON",
    "YOKOGAWA", "PHOENIX CONTACT", "GE"
  ];

  let cleaned = name;

  brandWords.forEach((brand) => {
    cleaned = cleaned.replace(new RegExp("^" + brand + "\\s+", "i"), "");
  });

  const match = cleaned.match(/[A-Z0-9]+[-/][A-Z0-9][A-Z0-9\-/.]*/i);

  return match ? match[0] : item.sku || item.slug || item.id.toString();
}

function mapProduct(item: any): Product {
  const brand =
    item.brands?.[0]?.name ||
    item.categories?.[0]?.name ||
    "Xeltronic";

    return {
    name: item.name || "",
    part: extractPartNumber(item),
    sku: item.sku || item.slug || item.id.toString(),
    brand,
    condition: extractCondition(item),
    image: item.images?.[0]?.src || "/placeholder.png",
    category: item.categories?.[0]?.name || "Industrial Parts",
    description:
      cleanHtml(item.short_description) ||
      cleanHtml(item.description) ||
      "",
  };
}

export async function getWooProducts(): Promise<Product[]> {
  const url =
    `${baseUrl}/wp-json/wc/v3/products?per_page=100&status=publish&consumer_key=${key}&consumer_secret=${secret}`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error("WooCommerce API Error");
    return [];
  }

  const data = await res.json();

  return data.map(mapProduct);
}

export async function getWooProductByPart(
  part: string
): Promise<Product | null> {
  const products = await getWooProducts();
  const search = decodeURIComponent(part).toLowerCase();

  return (
    products.find((item) => {
      const sku = item.sku?.toLowerCase() || "";
      const partNo = item.part?.toLowerCase() || "";
      const name = item.name?.toLowerCase() || "";

      return (
        sku === search ||
        partNo === search ||
        name.includes(search)
      );
    }) || null
  );
}
