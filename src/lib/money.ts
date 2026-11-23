import type { Product } from "@/data/catalog";
import { getProduct } from "@/data/catalog";
import { brand, whatsappLink } from "@/data/brand";

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function priceLine(product: Product) {
  if (product.priceInr == null || !product.priceLabel) return "Price on request";
  return product.shippingExtra ? `${formatInr(product.priceInr)} + shipping` : formatInr(product.priceInr);
}

export function productEnquiry(product: Product) {
  return whatsappLink(
    `Hello Ishtaa Fashions, I would like to enquire about ${product.name} (${product.id.toUpperCase()}). ${priceLine(product)}. Please confirm availability.`,
  );
}

export function bagEnquiry(lines: { id: string; qty: number }[]) {
  const rows = lines
    .map((line, index) => {
      const product = getProduct(line.id);
      if (!product) return null;
      return `${index + 1}. ${product.name} (${product.id.toUpperCase()}) × ${line.qty} — ${priceLine(product)}`;
    })
    .filter(Boolean);
  const known = lines.reduce((sum, line) => {
    const product = getProduct(line.id);
    if (!product?.priceInr) return sum;
    return sum + product.priceInr * line.qty;
  }, 0);
  const text = [
    "Hello Ishtaa Fashions, I would like to enquire about:",
    ...rows,
    known > 0 ? `Listed subtotal of priced pieces: ${formatInr(known)}. Shipping extra where noted.` : "",
    "Please confirm availability. I understand payment is arranged with the boutique, not on this website.",
  ]
    .filter(Boolean)
    .join("\n");
  return { href: whatsappLink(text), subtotal: known };
}

export function contactEnquiry(input: { name: string; phone: string; message: string }) {
  return whatsappLink(
    `Hello Ishtaa Fashions, this is ${input.name}${input.phone ? ` (${input.phone})` : ""}.\n${input.message}\nSent from the website contact form.`,
  );
}

export const phoneHref = `tel:+${brand.phoneE164}`;
