import { useState } from "react";
import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { Catalogue } from "@/components/product/Catalogue";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/fancy-sarees")({
  head: () => ({
    meta: [
      { title: "Fancy Sarees | Ishtaa Fashions" },
      {
        name: "description",
        content:
          "Fancy sarees from Ishtaa Fashions, Coimbatore — matka tussar, organza, linen, batik and kanjivaram kota with published prices.",
      },
    ],
  }),
  component: FancyPage,
});

/* -------------------------------------------------------------------------- */
/* Banner photos (Unsplash, free to use under the Unsplash License)           */
/* -------------------------------------------------------------------------- */

// Tried in order. If one fails to load, the next one is used.
const BANNER_PHOTOS = [
  {
    // Handloom weaving, Pochampally — https://unsplash.com/photos/XCd_6nOdzjo
    src: "https://images.unsplash.com/photo-1640292343595-889db1c8262e?auto=format&fit=crop&w=2000&q=70",
    alt: "Handloom weaving in progress",
  },
  {
    // Silk in afternoon light — https://unsplash.com/photos/YuoaQtYPdqE
    src: "https://images.unsplash.com/photo-1631663026562-1f55f0ecac3e?auto=format&fit=crop&w=2000&q=70",
    alt: "Folds of soft silk",
  },
];

const BANNER_TEXT = {
  eyebrow: "Ishtaa Fashions · Coimbatore",
  heading: "Drape with grace",
  text: "Matka tussar, organza, linen, batik and kanjivaram kota, chosen with care and priced openly.",
};

/* -------------------------------------------------------------------------- */
/* Breadcrumbs                                                                */
/* -------------------------------------------------------------------------- */

type Crumb = {
  label: string;
  /** Leave out `to` for the current page (the last crumb). */
  to?: LinkProps["to"];
};

function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  /** "light" is for use on top of a photo / dark background. */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-1 text-[11px] leading-4 ${
          light ? "text-white/80" : "text-ink-soft"
        }`}
      >
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && (
              <svg
                viewBox="0 0 16 16"
                className={`size-2.5 ${light ? "text-white/70" : "text-gold"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            )}

            {item.to ? (
              <Link
                to={item.to}
                className={`transition-colors ${
                  light ? "hover:text-white" : "hover:text-burgundy"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={light ? "font-medium text-white" : "text-burgundy"}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Banner with breadcrumbs, text and a photo                                  */
/* -------------------------------------------------------------------------- */

function BreadcrumbBanner({ items }: { items: Crumb[] }) {
  // Index of the photo being shown. When it runs past the end of the list,
  // every photo failed and the plain burgundy gradient is shown instead.
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = BANNER_PHOTOS[photoIndex];

  return (
    <section className="relative isolate overflow-hidden bg-burgundy-deep">
      {/* Fallback gradient, visible only if no photo loads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-burgundy to-[#3a0f1c]"
      />

      {photo && (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fetchPriority="high"
          decoding="async"
          onError={() => setPhotoIndex((current) => current + 1)}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      {/* Light shade: the photo stays clearly visible.
          Bottom-up on phones, left-to-right on larger screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-burgundy-deep/85 via-burgundy-deep/40 to-burgundy-deep/5 md:bg-linear-to-r md:from-burgundy-deep/85 md:via-burgundy-deep/40 md:to-transparent"
      />

      <div className="relative z-10 mx-auto flex h-56 max-w-6xl flex-col justify-between px-5 py-6 sm:h-64">
        <Breadcrumbs items={items} tone="light" />

        <div className="max-w-md">
          <p className="text-[10px] tracking-[0.2em] text-gold-soft uppercase">
            {BANNER_TEXT.eyebrow}
          </p>

          <h1 className="mt-1.5 font-serif text-3xl leading-tight text-white sm:text-4xl">
            {BANNER_TEXT.heading}
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/85">
            {BANNER_TEXT.text}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Fancy sarees page                                                          */
/* -------------------------------------------------------------------------- */

function FancyPage() {
  const items = products.filter((item) => item.category === "fancy");

  return (
    <div className="pt-20">
      {/* Banner: Home › Fancy sarees */}
      <BreadcrumbBanner
        items={[{ label: "Home", to: "/" }, { label: "Fancy sarees" }]}
      />

      <Catalogue
        items={items}
        eyebrow="Fancy sarees"
        title="The priced edit"
        lede={`${items.length} sarees as published on the fancy page, including shipping notes. Colour may vary slightly from the photograph.`}
      />
    </div>
  );
}