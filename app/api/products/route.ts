import { getWooProducts } from "@/app/lib/woocommerce";

export async function GET() {
  const products = await getWooProducts();
  return Response.json(products);
}
