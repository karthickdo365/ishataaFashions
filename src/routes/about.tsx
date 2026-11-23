import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { useState } from "react";
import { brand } from "@/data/brand";
import { editorial } from "@/data/catalog";

/**
 * Header background: a handloom weaving photograph from Unsplash
 * (free to use under the Unsplash License).
 * Photo by Akhil Pawar — https://unsplash.com/photos/XCd_6nOdzjo
 */
const ABOUT_BG =
  "https://images.unsplash.com/photo-1640292343595-889db1c8262e?auto=format&fit=crop&w=2000&q=70";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Ishtaa Fashions" },
      {
        name: "description",
        content:
          "Poorni founded Ishtaa Fashions in Coimbatore — an exclusive boutique for elegant sarees, artisan craft and the modern Indian drape.",
      },
    ],
  }),
  component: AboutPage,
});

/* -------------------------------------------------------------------------- */
/* Breadcrumbs                                                                */
/* -------------------------------------------------------------------------- */

type Crumb = {
  label: string;
  /** Leave out `to` for the current page (the last crumb). */
  to?: LinkProps["to"];
};

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[11px] leading-4 text-ivory/75">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && (
              <svg
                viewBox="0 0 16 16"
                className="size-2.5 text-gold-soft"
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
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
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
/* About page                                                                 */
/* -------------------------------------------------------------------------- */

function AboutPage() {
  // If the Unsplash photo cannot load, fall back to a photo from the catalogue.
  const [headerImage, setHeaderImage] = useState(ABOUT_BG);

  return (
    <article>
      {/* Header with background image (compact) */}
      <header className="relative min-h-56 overflow-hidden bg-burgundy-deep text-ivory md:min-h-64">
        <img
          src={headerImage}
          alt="Handloom weaver at work, Pochampally"
          fetchPriority="high"
          decoding="async"
          onError={() => setHeaderImage(editorial.stack)}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Light burgundy shade: the photo stays clearly visible.
            Bottom-up on phones, left-to-right on larger screens. */}
        <div className="absolute inset-0 bg-linear-to-t from-burgundy-deep/90 via-burgundy-deep/50 to-burgundy-deep/10 md:bg-linear-to-r md:from-burgundy-deep/90 md:via-burgundy-deep/45 md:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-8 pt-28 md:pb-10 md:pt-28">
          <Breadcrumbs
            items={[{ label: "Home", to: "/" }, { label: "About us" }]}
          />

          <h1 className="mt-3 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
            The woman, the weave, the boutique
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-ivory/85">
            {brand.lines.elegance}
          </p>
        </div>

        <a
          href="https://unsplash.com/photos/XCd_6nOdzjo"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-2 right-4 z-10 text-[10px] text-white/60 transition-colors hover:text-white"
        >
          Photo: Akhil Pawar / Unsplash
        </a>
      </header>

      {/* Story */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={editorial.portraitB}
            alt="Saree portrait from the Ishtaa Fashions edit"
            className="w-full object-cover"
          />

          <p className="mt-3 text-xs text-ink-soft">
            Photograph published by Ishtaa Fashions. Not a portrait labelled as
            the founder.
          </p>
        </div>

        <div className="md:col-span-7">
          <p className="text-xs tracking-widest text-gold uppercase">Poorni</p>

          <h2 className="mt-3 font-serif text-4xl">
            Apparel design, then a boutique of her own
          </h2>

          <p className="mt-5 text-base leading-8 text-ink-soft">
            {brand.founder}
          </p>

          <p className="mt-5 text-base leading-8 text-ink-soft">
            {brand.lines.artisans}
          </p>

          <p className="mt-5 text-base leading-8 text-ink-soft">
            {brand.lines.join}
          </p>

          <p className="mt-5 text-base leading-8 text-ink-soft">
            The boutique is in {brand.city}. Hours are {brand.hours}. Reach
            Poorni’s team on WhatsApp at {brand.phoneDisplay}. No customer
            counts, awards or certifications are claimed here, because none are
            published on the current site.
          </p>

          <Link
            to="/fancy-sarees"
            className="mt-8 inline-block bg-burgundy px-5 py-3 text-xs tracking-widest text-ivory uppercase"
          >
            Browse the fancy catalogue
          </Link>
        </div>
      </div>

      {/* Photo pair */}
      <div className="grid md:grid-cols-2">
        <img
          src={editorial.drape}
          alt="Folded saree with a broad border"
          className="h-80 w-full object-cover md:h-112"
        />

        <img
          src={editorial.fold}
          alt="Stack of colourful silk sarees"
          className="h-80 w-full object-cover md:h-112"
        />
      </div>
    </article>
  );
}