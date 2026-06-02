export type Product = {
  name: string;
  part: string;
  brand: string;
  condition: string;
  image: string;
  category: string;
  description: string;
};

const baseUrl = process.env.WC_BASE_URL!;
const key = process.env.WC_CONSUMER_KEY!;
const secret = process.env.WC_CONSUMER_SECRET!;

function mapProduct(item: any): Product {
  const brand =
    item.brands?.[0]?.name ||
    item.attributes?.find((a: any) => a.name?.toLowerCase() === "brand")?.options?.[0] ||
    item.categories?.[0]?.name ||
    "Xeltronic";

  const condition =
    item.attributes?.find((a: any) =>
      a.name?.toLowerCase().includes("condition")
    )?.options?.[0] || "Available";

  const part =
    item.attributes?.find((a: any) =>
      a.name?.toLowerCase().includes("part")
    )?.options?.[0] ||
    item.sku ||
    item.slug;

  return {
    name: item.name || "",
    part: part || item.id.toString(),
    brand,
    condition,
    image: item.images?.[0]?.src || "/placeholder.png",
    category: item.categories?.[0]?.name || "Industrial Parts",
    description: item.description || item.short_description || "",
  };
}

export async function getWooProducts(): Promise<Product[]> {
  const url = `${baseUrl}/wp-json/wc/v3/products?per_page=100&status=publish&consumer_key=${key}&consumer_secret=${secret}`;

  const res = await fetch(url, { next: { revalidate: 300 } });

  if (!res.ok) {
    console.error("WooCommerce API Error:", await res.text());
    return [];
  }

  const data = await res.json();
  return data.map(mapProduct);
}

export async function getWooProductByPart(part: string): Promise<Product | null> {
  const products = await getWooProducts();

  return (
    products.find(
      (item) =>
        item.part.toLowerCase() === part.toLowerCase() ||
        item.name.toLowerCase().includes(part.toLowerCase())
    ) || null
  );
}
