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
    item.categories?.[0]?.name ||
    "Xeltronic";

  return {
    name: item.name || "",
    part: item.sku || item.slug || item.id.toString(),
    brand,
    condition: "Available",
    image: item.images?.[0]?.src || "/placeholder.png",
    category: item.categories?.[0]?.name || "Industrial Parts",
    description:
      item.short_description ||
      item.description ||
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

  return (
    products.find(
      (item) =>
        item.part.toLowerCase() === part.toLowerCase() ||
        item.name.toLowerCase().includes(part.toLowerCase())
    ) || null
  );
}
