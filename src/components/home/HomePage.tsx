import { Link } from "@tanstack/react-router";
import SilkStage from "@/components/three/SilkStage";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { brand, collections, featuredIds, whatsappLink } from "@/data/brand";
import { editorial, getProduct, products } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { priceLine } from "@/lib/money";

/* -------------------------------------------------------------------------- */
/* Images                                                                     */
/* -------------------------------------------------------------------------- */

const ABOUT_IMAGE = editorial.hero;

/**
 * Hero slideshow. The big arch and the small photo box always show the SAME
 * saree, so the two pictures match:
 *
 *  - `detail`: a close-up photo of that same saree (pallu, border, blouse...).
 *  - `focus`:  no close-up photo? Then the small box shows a zoomed-in crop of
 *              the main photo itself. "x% y%" = the part to zoom into
 *              (50% 50% = centre, 50% 85% = lower middle, 20% 30% = top left).
 *
 * Files in /artifacts/ref/ must be inside the `public` folder to load after
 * you deploy:  public/artifacts/ref/full-saree.png  etc.
 * Tip: use portrait (4:5) photographs for the best result.
 */
type HeroSlide = {
  src: string;
  alt: string;
  detail?: string;
  focus?: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/artifacts/ref/full-saree.png",
    alt: "Magenta handloom saree with a wide border and tassels",
    detail: "/artifacts/ref/pallu.png",
  },
  {
    src: editorial.portraitA,
    alt: "Elegant saree portrait from the Ishtaa atelier",
    focus: "50% 80%",
  },
  {
    src: editorial.hero,
    alt: "Silk saree portrait from the Ishtaa atelier",
    focus: "50% 80%",
  },
  {
    src: editorial.bridal,
    alt: "Bridal saree portrait from Ishtaa Fashions",
    focus: "50% 75%",
  },
  {
    src: editorial.drape,
    alt: "Hand-draped saree from the Ishtaa edit",
    focus: "50% 65%",
  },
  {
    src: "/artifacts/ref/hero2.jpg",
    alt: "Colourful silk sarees with zari borders",
    focus: "35% 55%",
  },
];

const HERO_INTERVAL_MS = 3000;

const reasons = [
  { title: "Artisan craft", copy: brand.lines.artisans },
  { title: "Handpicked", copy: brand.lines.bold },
  { title: "Tradition, worn now", copy: brand.lines.elegance },
  { title: "A story you wear", copy: brand.lines.join },
];

const galleryImages = [
  editorial.stack,
  editorial.fold,
  editorial.drape,
  editorial.wideA,
  "/media/silk/s02.jpg",
  "/media/silk/s05.jpg",
  "/media/catalog/f19-0.jpg",
  editorial.wideB,
];

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

const btnBase =
  "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300";

const btnPrimary =
  `${btnBase} bg-[#681C32] text-white hover:bg-[#481222]`;

const btnGhost =
  `${btnBase} border border-[#681C32]/30 text-[#681C32] hover:bg-[#681C32] hover:text-white`;

const btnGold =
  `${btnBase} bg-[#C5A36B] text-[#2A0B14] hover:bg-[#D8B97F]`;

const btnLight =
  `${btnBase} bg-white text-[#34252A] hover:bg-[#F2E9DC]`;

const btnLightGhost =
  `${btnBase} border border-white/50 text-white hover:bg-white hover:text-[#34252A]`;

/* -------------------------------------------------------------------------- */
/* Homepage                                                                   */
/* -------------------------------------------------------------------------- */

export function HomePage() {
  const featured = featuredIds
    .map((id) => getProduct(id))
    .filter((item) => item != null);

  return (
    <main className="overflow-hidden bg-[#F7F3EB] text-[#30252A]">

      <Hero />

      <PromiseBand />

      {/* Collections */}
      <section className="bg-[#F7F3EB] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Chip>Shop by collection</Chip>

              <h2 className="mt-5 font-serif text-4xl tracking-tight text-[#681C32] sm:text-5xl md:text-7xl">
                Six ways to drape
              </h2>
            </div>

            <Link to="/collections" className={btnGhost}>
              All collections <Arrow />
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-52.5 gap-4 sm:grid-cols-2 lg:auto-rows-60 lg:grid-cols-4">
            {collections
              .filter((item) => item.slug !== "silk")
              .map((collection, index) => (
                <div
                  key={collection.slug}
                  className={`rounded-3xl ${
                    index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                >
                  <Link
                    to="/collections/$slug"
                    params={{ slug: collection.slug }}
                    className="group relative block h-full overflow-hidden rounded-3xl bg-[#34252A]"
                  >
                    <img
                      src={collection.image}
                      alt={collection.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                    <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-[#681C32]">
                      <Arrow />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-sm text-white/80">
                        {collection.eyebrow}
                      </p>

                      <h3
                        className={`mt-1 font-serif tracking-tight ${
                          index === 0
                            ? "text-4xl md:text-6xl"
                            : "text-3xl"
                        }`}
                      >
                        {collection.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#F0EAE0] py-20 md:py-28">
        <FeaturedCarousel>
          {featured.map((product) => (
            <div
              key={product.id}
              className="w-[82%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </FeaturedCarousel>
      </section>

      {/* Silk showcase */}
      <SilkShowcase />

      {/* About */}
      <section className="bg-[#F7F3EB] px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div className="mx-auto w-full max-w-md">
            <div className="aspect-4/5 overflow-hidden rounded-t-full rounded-b-3xl shadow-[0_25px_60px_-25px_rgba(60,25,35,.25)]">
              <img
                src={ABOUT_IMAGE}
                alt="Saree portrait from the Ishtaa atelier"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div>
            <Chip>About Ishtaa</Chip>

            <h2 className="mt-5 font-serif text-4xl tracking-tight text-[#681C32] sm:text-5xl md:text-6xl">
              Connecting tradition and empowerment
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#71666A]">
              {brand.founder}
            </p>

            <Link to="/about" className={`${btnPrimary} mt-8`}>
              Discover our story <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-[#F0EAE0] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Chip>What Ishtaa stands for</Chip>

          <h2 className="mt-5 max-w-2xl font-serif text-4xl tracking-tight text-[#681C32] sm:text-5xl md:text-6xl">
            Made by hand, chosen with care
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex min-h-64 flex-col justify-between rounded-3xl border border-[#E5D9CC] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid size-11 place-items-center rounded-full bg-[#681C32] text-white">
                  ✦
                </span>

                <div>
                  <h3 className="font-serif text-2xl text-[#681C32]">
                    {reason.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#71666A]">
                    {reason.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal */}
      <section className="bg-[#F7F3EB] px-5 py-20 md:px-8 md:py-28">
        <div className="relative min-h-[75svh] overflow-hidden rounded-3xl bg-[#481222] text-white">
          <img
            src={editorial.bridal}
            alt="Bridal saree portrait published by Ishtaa Fashions"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#481222]/95 via-[#481222]/70 to-transparent" />

          <div className="relative z-10 flex min-h-[75svh] items-end px-6 py-14 md:px-14 md:py-20">
            <div className="max-w-xl">
              <Chip tone="dark">Bridal collection</Chip>

              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl md:text-7xl">
                For the woman the day gathers around
              </h2>

              <p className="mt-5 text-base leading-8 text-white/85">
                The portrait is from the Ishtaa atelier. Bridal styling is
                arranged personally — the sarees linked here are celebration
                pieces already priced or photographed in the catalogue.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/collections/$slug"
                  params={{ slug: "bridal" }}
                  className={btnLight}
                >
                  View celebration drapes <Arrow />
                </Link>

                <a
                  href={whatsappLink(
                    "Hello Ishtaa Fashions, I would like to enquire about a bridal saree."
                  )}
                  className={btnLightGhost}
                  target="_blank"
                  rel="noreferrer"
                >
                  Plan with WhatsApp <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F7F3EB] px-5 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <Chip>Testimonials</Chip>

          <h2 className="mt-5 max-w-3xl font-serif text-4xl tracking-tight text-[#681C32] sm:text-5xl md:text-6xl">
            Words from the women who drape Ishtaa
          </h2>

          <div className="mt-10 rounded-3xl border border-[#E5D9CC] bg-white p-8 md:p-14">
            <p className="max-w-2xl font-serif text-2xl leading-snug text-[#34252A] md:text-4xl">
              Client notes are not published on the current website. This
              space is ready for them — none are invented here.
            </p>

            <a
              href={whatsappLink(
                "Hello Ishtaa Fashions, I would like to share a note about my saree."
              )}
              className={`${btnPrimary} mt-8`}
              target="_blank"
              rel="noreferrer"
            >
              Share your drape on WhatsApp <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#302329] py-20 text-white md:py-28">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5 px-5">
          <div>
            <Chip tone="dark">Atelier gallery</Chip>

            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl md:text-7xl">
              Follow the drape
            </h2>
          </div>

          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className={btnLightGhost}
          >
            {brand.instagramHandle} <Arrow />
          </a>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
          {galleryImages.map((src, index) => (
            <a
              key={`${src}-${index}`}
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="group block aspect-4/5 overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt="Ishtaa Fashions saree photograph"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#F7F3EB] px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-3xl bg-[#681C32] p-8 text-white md:p-12">
            <div>
              <Chip tone="dark">Contact</Chip>

              <h2 className="mt-5 font-serif text-4xl tracking-tight md:text-6xl">
                Come in, or write on WhatsApp
              </h2>

              <p className="mt-6 text-base leading-8 text-white/80">
                {brand.address}
              </p>

              <p className="mt-3 text-base">
                Call / WhatsApp: {brand.phoneDisplay}
              </p>

              <p className="mt-2 text-base text-white/80">
                {brand.hours}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappLink(
                  "Hello Ishtaa Fashions, I would like to enquire about a saree."
                )}
                className={btnLight}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp <Arrow />
              </a>

              <Link to="/contact" className={btnLightGhost}>
                Contact the boutique <Arrow />
              </Link>
            </div>
          </div>

          <div className="min-h-96 overflow-hidden rounded-3xl">
            <img
              src={editorial.stack}
              alt="Folded silk sarees with zari borders"
              loading="lazy"
              className="h-full min-h-96 w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Arrow                                                                      */
/* -------------------------------------------------------------------------- */

function Arrow() {
  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-current/15">
      <svg
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Chip                                                                       */
/* -------------------------------------------------------------------------- */

function Chip({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm ${
        tone === "light"
          ? "border-[#681C32]/20 bg-white text-[#681C32]"
          : "border-white/30 bg-white/10 text-white"
      }`}
    >
      <span className="size-1.5 rounded-full bg-[#B58B4B]" />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Promise band                                                               */
/* -------------------------------------------------------------------------- */

function PromiseBand() {
  return (
    <div className="border-y border-white/10 bg-[#481222] py-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 font-serif text-xl italic md:text-2xl">
        {reasons.map((item) => (
          <span key={item.title} className="flex items-center gap-8">
            {item.title}
            <span className="text-[#C5A36B] not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Featured carousel                                                          */
/* -------------------------------------------------------------------------- */

function FeaturedCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: number) => {
    const track = trackRef.current;

    if (track) {
      track.scrollBy({
        left: direction * track.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Chip>Featured sarees</Chip>

          <h2 className="mt-5 max-w-xl font-serif text-4xl tracking-tight text-[#681C32] sm:text-5xl md:text-7xl">
            From the published catalogue
          </h2>

          <p className="mt-4 max-w-lg text-base leading-7 text-[#71666A]">
            Prices appear only where Ishtaa has printed them. Nothing here is
            guessed stock.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous sarees"
            className="grid size-12 rotate-180 place-items-center rounded-full border border-[#681C32]/30 text-[#681C32] transition-colors hover:bg-[#681C32] hover:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next sarees"
            className="grid size-12 place-items-center rounded-full bg-[#681C32] text-white transition-colors hover:bg-[#481222]"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small photo box (shows a close-up of the SAME saree as the main arch)       */
/* -------------------------------------------------------------------------- */

function PhotoBox({
  items,
  active,
  className = "",
}: {
  items: { src: string; focus?: string }[];
  active: number;
  className?: string;
}) {
  const current = active % items.length;

  return (
    <div
      aria-hidden="true"
      className={`absolute z-10 aspect-3/4 overflow-hidden rounded-2xl border-[3px] border-[#E8D3A8] bg-[#481222] shadow-[0_20px_45px_-12px_rgba(0,0,0,.65)] ${className}`}
    >
      {items.map((item, index) => {
        const base = item.focus ? 2.2 : 1;
        const isCurrent = index === current;

        return (
          <img
            key={`${item.src}-${index}`}
            src={item.src}
            alt=""
            loading="eager"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1200 ease-in-out ${
              isCurrent ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `scale(${isCurrent ? base : base * 1.08})`,
              transformOrigin: item.focus ?? "50% 50%",
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero visual — spotlighted arch slideshow                                   */
/* -------------------------------------------------------------------------- */

function HeroVisual() {
  const total = HERO_SLIDES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect the visitor's "reduce motion" system setting.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Preload every image so the crossfades never flash blank.
  useEffect(() => {
    HERO_SLIDES.flatMap((slide) =>
      slide.detail ? [slide.src, slide.detail] : [slide.src]
    ).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Advance every 3 seconds. Restarts whenever the slide or pause state changes.
  useEffect(() => {
    if (paused || reducedMotion || total < 2) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % total);
    }, HERO_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion, total]);

  return (
    <div
      className="relative mx-auto w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Ishtaa saree photographs"
    >
      {/* Spotlight behind the picture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[45%] size-full -translate-x-1/2 -translate-y-1/2 scale-110 rounded-full bg-[#E3C48A]/25 blur-3xl"
      />

      {/* Picture: one clean arch with a gold frame */}
      <div className="relative aspect-4/5 overflow-hidden rounded-t-full rounded-b-3xl border-[5px] border-[#E8D3A8] bg-[#481222] shadow-[0_40px_90px_-20px_rgba(0,0,0,.7)]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === active;

          return (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              aria-hidden={!isActive}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-1200 ease-in-out ${
                isActive ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          );
        })}
      </div>

      {/* Slide indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show picture ${index + 1} of ${total}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === active
                ? "w-8 bg-[#E3C48A]"
                : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Small photo box beside the arch, changing with the main picture */}
      <PhotoBox
        items={HERO_SLIDES.map((slide) => ({
          src: slide.detail ?? slide.src,
          // Only zoom-crop when there is no separate close-up photo.
          focus: slide.detail ? undefined : (slide.focus ?? "50% 75%"),
        }))}
        active={active}
        className="-left-3 bottom-20 w-28 sm:-left-14 sm:w-36"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero background                                                            */
/* -------------------------------------------------------------------------- */

const DRIFT_PETALS = [
  { top: 14, size: 16, dur: 19, drop: 90, color: "#F2C6CF" },
  { top: 30, size: 12, dur: 23, drop: 140, color: "#E3C48A" },
  { top: 46, size: 18, dur: 21, drop: 110, color: "#D9798F" },
  { top: 22, size: 11, dur: 26, drop: 160, color: "#F6E4BE" },
  { top: 60, size: 15, dur: 24, drop: 100, color: "#F2C6CF" },
  { top: 38, size: 13, dur: 28, drop: 130, color: "#E3C48A" },
  { top: 72, size: 12, dur: 22, drop: 80, color: "#D9798F" },
];

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <style>{`
        @keyframes petalDrift {
          0% { transform: translate3d(-8vw, 0, 0) rotate(0deg); opacity: 0; }
          8% { opacity: .75; }
          92% { opacity: .75; }
          100% { transform: translate3d(108vw, var(--drop), 0) rotate(540deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .petal-drift { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      {/* One calm burgundy gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-[#4A1226] via-[#3A0F1D] to-[#2A0B14]" />

      {/* Darker top edge so the white navigation stays readable */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/30 to-transparent" />

      {/* Petals drifting in from the left and out on the right */}
      {DRIFT_PETALS.map((petal, index) => (
        <span
          key={index}
          className="petal-drift absolute left-0 block"
          style={
            {
              top: `${petal.top}%`,
              width: petal.size,
              height: petal.size * 1.4,
              animation: `petalDrift ${petal.dur}s linear ${
                -(index * petal.dur) / DRIFT_PETALS.length
              }s infinite`,
              "--drop": `${petal.drop}px`,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 20 28" className="size-full">
            <path
              d="M10 0C18 8 18 20 10 28C2 20 2 8 10 0Z"
              fill={petal.color}
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  const words = brand.tagline.split(" ");
  const half = Math.ceil(words.length / 2);

  const fancyCount = products.filter(
    (item) => item.category === "fancy"
  ).length;

  const silkCount = products.filter(
    (item) => item.category === "silk"
  ).length;

  return (
    /* overflow-hidden: nothing from the hero (silk canvas, petals, glow) can
       spill down into the band below or up under the navigation. */
    <section className="relative overflow-hidden bg-[#2A0B14] text-white">
      <HeroBackground />

      {/* 3D silk: a soft, faded layer that fills the right side of the hero.
          It is clipped to the hero and fades out on every edge, so there is
          no hard rectangle any more. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full opacity-60 lg:w-[68%]"
        style={{
          maskImage:
            "radial-gradient(ellipse at 65% 50%, #000 28%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 65% 50%, #000 28%, transparent 72%)",
        }}
      >
        <SilkStage />
      </div>

      {/* Fits one screen: height = viewport. Scroll down for the rest. */}
      <div className="relative z-10 mx-auto grid min-h-svh w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-10 lg:pt-32">

        {/* Text side */}
        <div className="min-w-0 lg:col-span-5">
          <Chip tone="dark">{brand.grace}</Chip>

          <h1 className="mt-6 max-w-full font-serif text-[clamp(2.2rem,4vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#FBF3E4]">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={index >= half ? "italic text-[#E3C48A]" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            {brand.lines.elegance}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/collections" className={btnGold}>
              Explore collections <Arrow />
            </Link>

            <Link to="/about" className={btnLightGhost}>
              Discover our story <Arrow />
            </Link>
          </div>

          <dl className="mt-10 flex max-w-sm flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-xs">
            <div>
              <dt className="text-white/50">Boutique</dt>
              <dd className="mt-0.5 text-sm text-white">{brand.city}</dd>
            </div>

            <div>
              <dt className="text-white/50">Priced sarees</dt>
              <dd className="mt-0.5 text-sm text-white">{fancyCount}</dd>
            </div>

            <div>
              <dt className="text-white/50">Silk photographs</dt>
              <dd className="mt-0.5 text-sm text-white">{silkCount}</dd>
            </div>
          </dl>
        </div>

        {/* Picture side — the arch is sized from the screen height, so the
            whole slideshow always fits inside one screen. */}
        <div className="min-w-0 px-2 sm:px-8 lg:col-span-7 lg:px-0">
          {/* Width is set with an inline style on purpose: it always works,
              even if Tailwind skips an arbitrary class. */}
          <div
            className="relative mx-auto"
            style={{
              width:
                "min(100%, 32rem, max(15rem, calc((100svh - 15rem) * 0.8)))",
            }}
          >
            <HeroVisual />
          </div>
        </div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Silk showcase                                                              */
/* -------------------------------------------------------------------------- */

function SilkShowcase() {
  return (
    <section className="bg-[#481222] px-5 py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="aspect-4/5 overflow-hidden rounded-3xl">
          <img
            src={editorial.wideA}
            alt="Close view of silk and jewellery from the Ishtaa edit"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <Chip tone="dark">Luxury silk</Chip>

          <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl md:text-6xl">
            Zari, grain, and the hand that wove it
          </h2>

          <p className="mt-6 max-w-lg text-base leading-8 text-white/75">
            Ishtaa’s silk page is a study in texture: tissue that catches
            light, borders with a quiet metal sheen, and drapes photographed
            in the boutique rather than staged as stock that does not exist.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              Silk grain you can almost hear
            </li>

            <li className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              Zari borders from the published fancy edit, including
              Kanjivaram kota at {priceLine(getProduct("f19")!)}
            </li>

            <li className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              Colour may shift slightly from screen to cloth — the boutique
              says so on every fancy saree
            </li>
          </ul>

          <Link to="/silk-sarees" className={`${btnLight} mt-8 w-fit`}>
            Enter the silk edit <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}