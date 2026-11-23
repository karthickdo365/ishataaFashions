import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  ZoomIn,
} from "lucide-react";

import { getProduct, products } from "@/data/catalog";
import { priceLine, productEnquiry } from "@/lib/money";
import { useBoutique } from "@/stores/boutique";

/*
 * Local images for the featured saree (f01).
 * Files live in  <project root>/artifacts/ref/
 * This route file is at  src/routes/sarees.$id.tsx, hence "../../".
 * If you move this file, adjust the number of "../" accordingly.
 */
import palluImg from "../../artifacts/ref/pallu.png";
import bodyImg from "../../artifacts/ref/sareeBody.png";
import borderImg from "../../artifacts/ref/Border.png";
import blouseImg from "../../artifacts/ref/blouse.png";
import completeImg from "../../artifacts/ref/full-saree.png";

type SareeSection = "pallu" | "body" | "border" | "blouse" | "complete";

const sareeSections: {
  id: SareeSection;
  label: string;
  description: string;
  image: string;
}[] = [
  {
    id: "pallu",
    label: "Pallu",
    description: "The decorative end of the saree, draped over the shoulder.",
    image: palluImg,
  },
  {
    id: "body",
    label: "Body",
    description: "The main field of the saree, shown up close for its weave and texture.",
    image: bodyImg,
  },
  {
    id: "border",
    label: "Border",
    description: "The woven edge that frames the drape.",
    image: borderImg,
  },
  {
    id: "blouse",
    label: "Blouse",
    description: "The matching blouse fabric, shown separately.",
    image: blouseImg,
  },
  {
    id: "complete",
    label: "Complete Saree",
    description: "The complete saree, as it appears when draped.",
    image: completeImg,
  },
];

const nextSection = (current: SareeSection, step: number): SareeSection => {
  const index = sareeSections.findIndex((section) => section.id === current);
  const total = sareeSections.length;
  return sareeSections[(index + step + total) % total].id;
};

export const Route = createFileRoute("/sarees/$id")({
  head: ({ params }) => {
    const product = getProduct(params.id);

    return {
      meta: [
        {
          title: product
            ? `${product.name} | Ishtaa Fashions`
            : "Saree | Ishtaa Fashions",
        },
        {
          name: "description",
          content:
            product?.summary ??
            "Discover sarees from Ishtaa Fashions, Coimbatore.",
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);

  const addToBag = useBoutique((state) => state.addToBag);
  const toggleWish = useBoutique((state) => state.toggleWish);
  const wished = useBoutique((state) => state.wishlist.includes(id));

  const [activeSection, setActiveSection] =
    useState<SareeSection>("complete");
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  // The interactive five-section experience is enabled only for f01.
  const isFeaturedSaree = id === "f01";

  // Left / right arrow keys switch sections on the featured saree.
  useEffect(() => {
    if (!isFeaturedSaree) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      setActiveSection((current) =>
        nextSection(current, event.key === "ArrowRight" ? 1 : -1),
      );
      setZoom(false);
      setOrigin("50% 50%");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFeaturedSaree]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20">
        <h1 className="font-serif text-5xl">
          This saree is not in the catalogue
        </h1>

        <Link
          to="/fancy-sarees"
          className="mt-6 inline-block text-xs tracking-widest text-burgundy uppercase"
        >
          Return to fancy sarees
        </Link>
      </div>
    );
  }

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.collections.some((slug) =>
          product.collections.includes(slug),
        ),
    )
    .slice(0, 3);

  const activeIndex = sareeSections.findIndex(
    (section) => section.id === activeSection,
  );
  const selectedSection = sareeSections[activeIndex];

  // f01 -> local section images; all other products -> their own images.
  const image = isFeaturedSaree
    ? selectedSection.image
    : (product.images[activeImage] ?? product.images[0]);

  const changeSection = (section: SareeSection) => {
    setActiveSection(section);
    setZoom(false);
    setOrigin("50% 50%");
  };

  const stepSection = (step: number) =>
    changeSection(nextSection(activeSection, step));

  const trackZoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!zoom) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setOrigin(`${x}% ${y}%`);
  };

  return (
    <article className="mx-auto max-w-6xl px-5 pt-28 pb-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {isFeaturedSaree ? (
          /* ---------- Featured saree: five-section gallery ---------- */
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs tracking-[0.35em] text-gold uppercase">
              Ishtaa Fashions · Exclusive view
            </p>

            <div className="relative h-[calc(100svh-21rem)] min-h-320px overflow-hidden bg-ivory-deep">
              <button
                type="button"
                onClick={() => setZoom((value) => !value)}
                onMouseMove={trackZoom}
                className="relative block h-full w-full cursor-zoom-in"
                aria-label={zoom ? "Zoom out" : "Zoom into saree image"}
                aria-pressed={zoom}
              >
                <img
                  src={image}
                  alt={`${product.name} - ${selectedSection.label}`}
                  className="h-full w-full object-contain transition-transform duration-500"
                  style={{
                    transform: zoom ? "scale(1.8)" : "scale(1)",
                    transformOrigin: origin,
                  }}
                  loading="eager"
                />

                <span className="absolute right-4 bottom-4 flex items-center gap-2 bg-paper/90 px-3 py-2 text-[10px] tracking-widest text-ink uppercase backdrop-blur-sm">
                  {zoom ? (
                    <>
                      <Maximize2 className="size-3.5" />
                      Zoom out
                    </>
                  ) : (
                    <>
                      <ZoomIn className="size-3.5" />
                      Zoom
                    </>
                  )}
                </span>
              </button>

              <span className="pointer-events-none absolute top-4 left-4 bg-paper/90 px-3 py-2 text-[10px] tracking-widest text-ink uppercase backdrop-blur-sm">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(sareeSections.length).padStart(2, "0")} ·{" "}
                {selectedSection.label}
              </span>

              <button
                type="button"
                onClick={() => stepSection(-1)}
                aria-label="Previous detail"
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-paper/90 p-2 text-ink transition-colors hover:bg-burgundy hover:text-ivory"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={() => stepSection(1)}
                aria-label="Next detail"
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-paper/90 p-2 text-ink transition-colors hover:bg-burgundy hover:text-ivory"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* Section thumbnails */}
            <div className="mt-3 grid grid-cols-5 gap-2">
              {sareeSections.map((section) => {
                const selected = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => changeSection(section.id)}
                    aria-pressed={selected}
                    aria-label={`View ${section.label}`}
                    className="group text-center"
                  >
                    <span
                      className={`block overflow-hidden border-2 transition-colors ${
                        selected
                          ? "border-burgundy"
                          : "border-transparent group-hover:border-line"
                      }`}
                    >
                      <img
                        src={section.image}
                        alt=""
                        className={`aspect-4/3 w-full object-cover transition-opacity ${
                          selected ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                        }`}
                        loading="lazy"
                      />
                    </span>

                    <span
                      className={`mt-2 block text-[9px] leading-tight tracking-[0.15em] uppercase sm:text-[10px] ${
                        selected ? "text-burgundy" : "text-ink-soft"
                      }`}
                    >
                      {section.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        ) : (
          /* ---------- All other products: standard gallery ---------- */
          <div>
            <div className="overflow-hidden bg-ivory-deep">
              <button
                type="button"
                className="block w-full"
                onClick={() => setZoom((value) => !value)}
                onMouseMove={trackZoom}
                aria-pressed={zoom}
              >
                <img
                  src={image}
                  alt={`${product.name} photograph ${activeImage + 1}`}
                  className="aspect-3/4 w-full object-cover transition-transform duration-300"
                  style={{
                    transform: zoom ? "scale(1.8)" : "scale(1)",
                    transformOrigin: origin,
                  }}
                />
              </button>
            </div>

            <p className="mt-3 text-xs text-ink-soft">
              Select the photograph to zoom. Colour may vary from the
              cloth in hand.
            </p>

            {product.images.length > 1 ? (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {product.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setActiveImage(index);
                      setZoom(false);
                    }}
                    className={`shrink-0 border ${
                      index === activeImage
                        ? "border-burgundy"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="size-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}

        <ProductInformation
          product={product}
          wished={wished}
          addToBag={addToBag}
          toggleWish={toggleWish}
          detail={
            isFeaturedSaree ? (
              <div className="mt-6 border-l-2 border-burgundy bg-ivory-deep/60 px-5 py-4">
                <p className="text-[10px] tracking-[0.3em] text-gold uppercase">
                  Now viewing · {selectedSection.label}
                </p>

                <p className="mt-2 text-sm leading-7 text-ink-soft">
                  {selectedSection.description}
                </p>
              </div>
            ) : null
          }
        />
      </div>

      {/* Related products */}
      {related.length > 0 ? (
        <div className="mt-20 border-t border-line pt-10">
          <p className="text-xs tracking-widest text-gold uppercase">
            Also in this edit
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                to="/sarees/$id"
                params={{ id: item.id }}
                className="group"
              >
                <div className="overflow-hidden bg-ivory-deep">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h3 className="mt-3 font-serif text-xl text-ink">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm text-ink-soft">
                  {priceLine(item)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function ProductInformation({
  product,
  wished,
  addToBag,
  toggleWish,
  detail,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
  wished: boolean;
  addToBag: (id: string) => void;
  toggleWish: (id: string) => void;
  detail?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs tracking-widest text-gold uppercase">
        {product.id.toUpperCase()} · {product.category}
      </p>

      <h1 className="mt-3 font-serif text-5xl text-ink md:text-6xl">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl tabular-nums text-ink">
        {priceLine(product)}
      </p>

      <p className="mt-5 text-sm leading-7 text-ink-soft">
        {product.summary}
      </p>

      {detail}

      <p className="mt-6 text-sm leading-7 text-ink-soft">
        Payment is not taken on this website. Add the drape to your
        enquiry bag and confirm it with Ishtaa on WhatsApp.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="bg-burgundy px-6 py-4 text-xs tracking-widest text-ivory uppercase transition-opacity hover:opacity-90"
          onClick={() => {
            addToBag(product.id);
            toast.success("Added to your enquiry bag");
          }}
        >
          Add to enquiry bag
        </button>

        <a
          href={productEnquiry(product)}
          target="_blank"
          rel="noreferrer"
          className="border border-ink px-6 py-4 text-center text-xs tracking-widest uppercase transition-colors hover:bg-ink hover:text-ivory"
        >
          Enquire on WhatsApp
        </a>
      </div>

      <button
        type="button"
        className="mt-5 flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-burgundy"
        onClick={() => {
          toggleWish(product.id);
          toast(wished ? "Removed from wishlist" : "Saved to wishlist");
        }}
      >
        <Heart
          className={`size-4 ${
            wished ? "fill-burgundy text-burgundy" : ""
          }`}
        />
        {wished ? "Remove from wishlist" : "Save to wishlist"}
      </button>
    </div>
  );
}