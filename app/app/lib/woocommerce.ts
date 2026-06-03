export async function getWooProducts(): Promise<Product[]> {
  let allProducts: Product[] = [];
  let page = 1;

  while (page <= 10) {
    const url =
      `${baseUrl}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish&consumer_key=${key}&consumer_secret=${secret}`;

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error("WooCommerce API Error");
      break;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    allProducts = [...allProducts, ...data.map(mapProduct)];
    page++;
  }

  return allProducts;
}
