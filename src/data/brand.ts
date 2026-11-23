import { editorial, getProduct } from "@/data/catalog";

export const brand = {
  name: "Ishtaa Fashions",
  mark: "Ishtaa",
  tagline: "Discover The Art Of Elegance",
  grace: "Drape with Grace",
  description:
    "Ishtaa Fashions is an exclusive online saree boutique offering a curated collection of elegant sarees for every occasion. Discover elegant, handcrafted designs, vibrant colors, and exquisite fabrics, all delivered to your doorstep.",
  phoneDisplay: "8610775593",
  phoneE164: "918610775593",
  hours: "10 AM to 8 PM",
  instagram: "https://www.instagram.com/ishtaafashionscbe",
  instagramHandle: "@ishtaafashionscbe",
  address:
    "Shri Brindavan Gardens, Near Alankar Thottam, Vellakinar Pirivu, G.N. Mills Post, Coimbatore, Tamil Nadu 641029",
  city: "Coimbatore",
  maps: "https://maps.google.com/maps?q=Shri%20Brindavan%20Gardens%2C%20Near%20Alankar%20Thottam%2C%20Vellakinar%20Pirivu%2C%20G.N%20Mills%20Post%2C%20Coimbatore%2C%20Tamil%20Nadu%20641029&z=14",
  mapsEmbed:
    "https://maps.google.com/maps?q=Shri%20Brindavan%20Gardens%2C%20Near%20Alankar%20Thottam%2C%20Vellakinar%20Pirivu%2C%20G.N%20Mills%20Post%2C%20Coimbatore%2C%20Tamil%20Nadu%20641029&z=14&output=embed",
  founder:
    "With a graduation in Apparel Design and Fashion Arts, Poorni has ventured Ishtaa Fashions, an exclusive boutique for Elegant Sarees. At Ishtaa Boutique, we believe a saree is not just a garment; it’s a statement of grace, culture, and beauty. Each piece in our collection is thoughtfully curated to reflect the rich heritage of Indian craftsmanship, while offering a modern twist that suits today’s woman.",
  lines: {
    elegance:
      "Our sarees celebrate the timeless beauty and strength of women, weaving tradition into modern style.",
    bold: "Each saree in our curated collection is handpicked to celebrate your unique style.",
    artisans:
      "We are connecting tradition & empowerment. Our sarees are sourced directly from talented artisans, ensuring their craft thrives.",
    join: "When you wear our sarees, you wear a story of empowerment, supporting artisans and celebrating their artistry.",
  },
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${brand.phoneE164}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export type CollectionInfo = {
  slug: string;
  title: string;
  eyebrow: string;
  blurb: string;
  image: string;
  note?: string;
};

const productImage = (id: string, fallback: string) => getProduct(id)?.images[0] ?? fallback;

export const collections: CollectionInfo[] = [
  {
    slug: "kanchipuram",
    title: "Kanchipuram Silk Sarees",
    eyebrow: "Temple borders",
    blurb: "Kanjivaram and kota drapes from the published catalogue, with zari that holds a celebration.",
    image: productImage("f19", editorial.hero),
  },
  {
    slug: "bridal",
    title: "Bridal Sarees",
    eyebrow: "For the ceremony",
    blurb:
      "Celebration silks already in the catalogue. A full bridal trousseau is arranged with Poorni — there is no separate unpublished price list.",
    image: editorial.bridal,
    note: "Enquire for bridal styling. Pieces shown are real catalogue drapes, not a fictional bridal inventory.",
  },
  {
    slug: "fancy",
    title: "Fancy Sarees",
    eyebrow: "The priced edit",
    blurb: "Every fancy saree currently published, with the price and shipping note exactly as listed.",
    image: productImage("f01", editorial.drape),
  },
  {
    slug: "designer",
    title: "Designer Sarees",
    eyebrow: "Tissue, organza, satin",
    blurb: "Shimmer tissue, organza, dupion, satin and silk weaves chosen from the fancy catalogue.",
    image: productImage("f18", editorial.portraitA),
  },
  {
    slug: "traditional",
    title: "Traditional Sarees",
    eyebrow: "Handloom & craft",
    blurb: "Matka tussar, bagru, batik mulmul, linen and cotton — the handloom side of the boutique.",
    image: productImage("f03", editorial.stack),
  },
  {
    slug: "festive",
    title: "Festive Collections",
    eyebrow: "Light on gold",
    blurb: "Tissue, organza, satin and kanjivaram colourways for weddings, pujas and evening gatherings.",
    image: productImage("f08", editorial.fold),
  },
  {
    slug: "silk",
    title: "Silk Sarees",
    eyebrow: "The silk page",
    blurb:
      "Photographs from the silk edit. Names and prices were not published with these images, so nothing is invented here.",
    image: "/media/silk/s01.jpg",
    note: "Price on request.",
  },
];

export function getCollection(slug: string) {
  return collections.find((item) => item.slug === slug);
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/fancy-sarees", label: "Fancy Sarees" },
  { href: "/silk-sarees", label: "Silk Sarees" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const featuredIds = ["f19", "f01", "f08", "f18", "f06", "f15"] as const;
