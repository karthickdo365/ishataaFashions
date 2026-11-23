/** Catalogue mirrored from the public Ishtaa Fashions site.
 * Fancy prices are the figures published on /fancy-sarees/.
 * Silk photographs are published without names or prices — do not invent either.
 * Swap files in public/media when the client supplies new photography.
 */
export type CatalogueCategory = "fancy" | "silk";

export type Product = {
  id: string;
  name: string;
  priceLabel: string | null;
  priceInr: number | null;
  shippingExtra: boolean;
  images: string[];
  category: CatalogueCategory;
  collections: string[];
  swatch: number;
  swatchTotal: number;
  summary: string;
};

export const products: Product[] = [
  {
    id: "f01",
    name: "Handloom Matka Tussar Sarees",
    priceLabel: "₹ 1999+ shipping",
    priceInr: 1999,
    shippingExtra: true,
    images: [
      "/media/catalog/f01-0.jpg",
      "/media/catalog/f01-1.jpg",
      "/media/catalog/f01-2.jpg",
      "/media/catalog/f01-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 2,
    summary: "Handloom Matka Tussar Sarees from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1999+ shipping. Shipping is extra, as published. Colourway 1 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f02",
    name: "Handloom Matka Tussar Sarees",
    priceLabel: "₹ 1999+ shipping",
    priceInr: 1999,
    shippingExtra: true,
    images: [
      "/media/catalog/f02-0.jpg",
      "/media/catalog/f02-1.jpg",
      "/media/catalog/f02-2.jpg",
      "/media/catalog/f02-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 2,
    swatchTotal: 2,
    summary: "Handloom Matka Tussar Sarees from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1999+ shipping. Shipping is extra, as published. Colourway 2 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f03",
    name: "Bagru Cotton Sarees",
    priceLabel: "₹ 999+ shipping",
    priceInr: 999,
    shippingExtra: true,
    images: [
      "/media/catalog/f03-0.jpg",
      "/media/catalog/f03-1.jpg",
      "/media/catalog/f03-2.jpg",
      "/media/catalog/f03-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Bagru Cotton Sarees from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 999+ shipping. Shipping is extra, as published. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f04",
    name: "Semi Linen Sarees",
    priceLabel: "₹ 620+ shipping",
    priceInr: 620,
    shippingExtra: true,
    images: [
      "/media/catalog/f04-0.jpg",
      "/media/catalog/f04-1.jpg",
      "/media/catalog/f04-2.jpg",
      "/media/catalog/f04-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Semi Linen Sarees from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 620+ shipping. Shipping is extra, as published. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f05",
    name: "Printed Tussar Saree",
    priceLabel: "₹ 1900+ shipping",
    priceInr: 1900,
    shippingExtra: true,
    images: [
      "/media/catalog/f05-0.jpg",
      "/media/catalog/f05-1.jpg",
      "/media/catalog/f05-2.jpg",
      "/media/catalog/f05-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Printed Tussar Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1900+ shipping. Shipping is extra, as published. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f06",
    name: "Dupion Silk Saree",
    priceLabel: "₹ 1250+ shipping",
    priceInr: 1250,
    shippingExtra: true,
    images: [
      "/media/catalog/f06-0.jpg",
      "/media/catalog/f06-1.jpg",
      "/media/catalog/f06-2.jpg",
      "/media/catalog/f06-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Dupion Silk Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1250+ shipping. Shipping is extra, as published. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f07",
    name: "Semi Tussar Saree",
    priceLabel: "₹ 1800+ shipping",
    priceInr: 1800,
    shippingExtra: true,
    images: [
      "/media/catalog/f07-0.jpg",
      "/media/catalog/f07-1.jpg",
      "/media/catalog/f07-2.jpg",
      "/media/catalog/f07-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 2,
    summary: "Semi Tussar Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1800+ shipping. Shipping is extra, as published. Colourway 1 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f08",
    name: "Shimmer Tissue Saree",
    priceLabel: "₹ 1120",
    priceInr: 1120,
    shippingExtra: false,
    images: [
      "/media/catalog/f08-0.jpg",
      "/media/catalog/f08-1.jpg",
      "/media/catalog/f08-2.jpg",
      "/media/catalog/f08-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer",
      "festive"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Shimmer Tissue Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1120. Shipping was not listed separately on this piece. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f09",
    name: "Semi Tussar Saree",
    priceLabel: "₹ 1200",
    priceInr: 1200,
    shippingExtra: false,
    images: [
      "/media/catalog/f09-0.jpg",
      "/media/catalog/f09-1.jpg",
      "/media/catalog/f09-2.jpg",
      "/media/catalog/f09-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 2,
    swatchTotal: 2,
    summary: "Semi Tussar Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1200. Shipping was not listed separately on this piece. Colourway 2 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f10",
    name: "Satin Saree",
    priceLabel: "₹ 1250",
    priceInr: 1250,
    shippingExtra: false,
    images: [
      "/media/catalog/f10-0.jpg",
      "/media/catalog/f10-1.jpg",
      "/media/catalog/f10-2.jpg",
      "/media/catalog/f10-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer",
      "festive"
    ],
    swatch: 1,
    swatchTotal: 2,
    summary: "Satin Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1250. Shipping was not listed separately on this piece. Colourway 1 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f11",
    name: "Satin Saree",
    priceLabel: "₹ 1250",
    priceInr: 1250,
    shippingExtra: false,
    images: [
      "/media/catalog/f11-0.jpg",
      "/media/catalog/f11-1.jpg",
      "/media/catalog/f11-2.jpg",
      "/media/catalog/f11-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer",
      "festive"
    ],
    swatch: 2,
    swatchTotal: 2,
    summary: "Satin Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1250. Shipping was not listed separately on this piece. Colourway 2 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f12",
    name: "Tissue Silk Saree",
    priceLabel: "₹ 1500",
    priceInr: 1500,
    shippingExtra: false,
    images: [
      "/media/catalog/f12-0.jpg",
      "/media/catalog/f12-1.jpg",
      "/media/catalog/f12-2.jpg",
      "/media/catalog/f12-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer",
      "festive",
      "bridal"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Tissue Silk Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1500. Shipping was not listed separately on this piece. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f13",
    name: "Linen Saree",
    priceLabel: "₹ 1600",
    priceInr: 1600,
    shippingExtra: false,
    images: [
      "/media/catalog/f13-0.jpg",
      "/media/catalog/f13-1.jpg",
      "/media/catalog/f13-2.jpg",
      "/media/catalog/f13-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 2,
    summary: "Linen Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1600. Shipping was not listed separately on this piece. Colourway 1 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f14",
    name: "Linen Saree",
    priceLabel: "₹ 1600",
    priceInr: 1600,
    shippingExtra: false,
    images: [
      "/media/catalog/f14-0.jpg",
      "/media/catalog/f14-1.jpg",
      "/media/catalog/f14-2.jpg",
      "/media/catalog/f14-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 2,
    swatchTotal: 2,
    summary: "Linen Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1600. Shipping was not listed separately on this piece. Colourway 2 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f15",
    name: "Batik Printed Mulmul Saree",
    priceLabel: "₹ 1900",
    priceInr: 1900,
    shippingExtra: false,
    images: [
      "/media/catalog/f15-0.jpg",
      "/media/catalog/f15-1.jpg",
      "/media/catalog/f15-2.jpg",
      "/media/catalog/f15-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 1,
    swatchTotal: 2,
    summary: "Batik Printed Mulmul Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1900. Shipping was not listed separately on this piece. Colourway 1 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f16",
    name: "Batik Printed Mulmul Saree",
    priceLabel: "₹ 1900",
    priceInr: 1900,
    shippingExtra: false,
    images: [
      "/media/catalog/f16-0.jpg",
      "/media/catalog/f16-1.jpg",
      "/media/catalog/f16-2.jpg",
      "/media/catalog/f16-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "traditional"
    ],
    swatch: 2,
    swatchTotal: 2,
    summary: "Batik Printed Mulmul Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 1900. Shipping was not listed separately on this piece. Colourway 2 of 2. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f17",
    name: "Organza Saree",
    priceLabel: "₹ 2000",
    priceInr: 2000,
    shippingExtra: false,
    images: [
      "/media/catalog/f17-0.jpg",
      "/media/catalog/f17-1.jpg",
      "/media/catalog/f17-2.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer",
      "festive"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Organza Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 2000. Shipping was not listed separately on this piece. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f18",
    name: "Organza Silk Saree",
    priceLabel: "₹ 2000",
    priceInr: 2000,
    shippingExtra: false,
    images: [
      "/media/catalog/f18-0.jpg",
      "/media/catalog/f18-1.jpg",
      "/media/catalog/f18-2.jpg",
      "/media/catalog/f18-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "designer",
      "festive",
      "bridal"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Organza Silk Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 2000. Shipping was not listed separately on this piece. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "f19",
    name: "Kanjivaram Kota Saree",
    priceLabel: "₹ 2200",
    priceInr: 2200,
    shippingExtra: false,
    images: [
      "/media/catalog/f19-0.jpg",
      "/media/catalog/f19-1.jpg",
      "/media/catalog/f19-2.jpg",
      "/media/catalog/f19-3.jpg"
    ],
    category: "fancy",
    collections: [
      "fancy",
      "kanchipuram",
      "festive",
      "bridal"
    ],
    swatch: 1,
    swatchTotal: 1,
    summary: "Kanjivaram Kota Saree from the Ishtaa Fashions fancy saree catalogue in Coimbatore. Published price: ₹ 2200. Shipping was not listed separately on this piece. Actual product colour may vary slightly with photographic lighting or your screen."
  },
  {
    id: "s01",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s01.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 1,
    swatchTotal: 14,
    summary: "Silk saree photograph 1 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s02",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s02.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 2,
    swatchTotal: 14,
    summary: "Silk saree photograph 2 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s03",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s03.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 3,
    swatchTotal: 14,
    summary: "Silk saree photograph 3 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s04",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s04.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 4,
    swatchTotal: 14,
    summary: "Silk saree photograph 4 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s05",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s05.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 5,
    swatchTotal: 14,
    summary: "Silk saree photograph 5 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s06",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s06.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 6,
    swatchTotal: 14,
    summary: "Silk saree photograph 6 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s07",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s07.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 7,
    swatchTotal: 14,
    summary: "Silk saree photograph 7 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s08",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s08.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 8,
    swatchTotal: 14,
    summary: "Silk saree photograph 8 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s09",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s09.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 9,
    swatchTotal: 14,
    summary: "Silk saree photograph 9 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s10",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s10.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 10,
    swatchTotal: 14,
    summary: "Silk saree photograph 10 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s11",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s11.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 11,
    swatchTotal: 14,
    summary: "Silk saree photograph 11 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s12",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s12.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 12,
    swatchTotal: 14,
    summary: "Silk saree photograph 12 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s13",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s13.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 13,
    swatchTotal: 14,
    summary: "Silk saree photograph 13 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  },
  {
    id: "s14",
    name: "Silk Saree",
    priceLabel: null,
    priceInr: null,
    shippingExtra: false,
    images: [
      "/media/silk/s14.jpg"
    ],
    category: "silk",
    collections: [
      "silk"
    ],
    swatch: 14,
    swatchTotal: 14,
    summary: "Silk saree photograph 14 from the Ishtaa silk page. The current website does not publish a name or price for this drape. Ask Ishtaa on WhatsApp for the fabric, border and rate."
  }
];

export const editorial = {
  hero: "/media/editorial/hero.jpg",
  bridal: "/media/editorial/bridal.jpg",
  stack: "/media/editorial/stack.jpg",
  drape: "/media/editorial/drape.jpg",
  portraitA: "/media/editorial/portraitA.jpg",
  portraitB: "/media/editorial/portraitB.jpg",
  wideA: "/media/editorial/wideA.jpg",
  wideB: "/media/editorial/wideB.jpg",
  fold: "/media/editorial/fold.jpg"
};

export function getProduct(id: string): Product | undefined {
  return products.find((item) => item.id === id);
}

export function productsIn(collection: string): Product[] {
  return products.filter((item) => item.collections.includes(collection));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((item) => {
    const hay = [item.name, item.summary, item.category, item.priceLabel ?? "", ...item.collections]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
