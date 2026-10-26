import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/coming-soon";
import { getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return {
    title: `${product?.name ?? "Produk"} — Coming Soon — Tatsuo Beef`,
    description:
      "Detail produk sedang kami siapkan. Hubungi Tatsuo untuk informasi produk dan ketersediaan.",
    robots: { index: false, follow: true },
    ...(product
      ? { alternates: { canonical: `/produk/${product.slug}` } }
      : {}),
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ComingSoon label={product.name} />;
}
