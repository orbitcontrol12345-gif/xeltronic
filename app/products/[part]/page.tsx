import Link from "next/link";
import { getWooProductByPart } from "@/app/lib/woocommerce";

export default async function ProductPage({
  params,
}: {
  params: { part: string };
}) {
  const product = await getWooProductByPart(decodeURIComponent(params.part));

  if (!product) {
    return (
      <main className="min-h-screen bg-[#071018] px-8 py-32 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
          <h1 className="text-5xl font-bold">Product not found</h1>
          <p className="mt-6 text-xl text-gray-300">
            The requested product is not available in the current catalogue.
          </p>
          <Link href="/#products" className="mt-8 inline-block text-yellow-400">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071018] px-8 py-32 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full object-contain"
          />
        </div>

        <div>
          <div className="text-sm font-bold text-yellow-400">
            {product.brand}
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="mt-6 space-y-3 text-lg text-gray-300">
            <p>
              <b className="text-white">Part No:</b> {product.part}
            </p>
            <p>
              <b className="text-white">Condition:</b> {product.condition}
            </p>
            <p>
              <b className="text-white">Category:</b> {product.category}
            </p>
          </div>

          <p className="mt-8 text-gray-300">{product.description}</p>

          <div className="mt-10 flex gap-4">
            <Link
              href={`/rfq?part=${encodeURIComponent(product.part)}`}
              className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black"
            >
              Request Quote
            </Link>

            <Link
              href="/#products"
              className="rounded-xl border border-white/20 px-8 py-4 font-bold text-white"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
