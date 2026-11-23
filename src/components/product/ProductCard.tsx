
import { Link } from "@tanstack/react-router";
import { Heart, ArrowUpRight } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import type { Product } from "@/data/catalog";
import { priceLine } from "@/lib/money";
import { cn } from "@/lib/cn";
import { useBoutique, useUi } from "@/stores/boutique";
import { toast } from "sonner";

export function ProductCard({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const wished = useBoutique((state) =>
    state.wishlist.includes(product.id)
  );

  const toggleWish = useBoutique((state) => state.toggleWish);
  const setQuick = useUi((state) => state.setQuick);

  const tilt = (event: PointerEvent<HTMLElement>) => {
    const node = cardRef.current;

    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const rect = node.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.transform = `
      perspective(1100px)
      rotateY(${x * 9}deg)
      rotateX(${-y * 9}deg)
      translateY(-5px)
    `;
  };

  const reset = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  const openQuickView = () => {
    setQuick(product.id);
  };

  return (
    <div className="group/card perspective-[1100px]">
      <article
        ref={cardRef}
        onPointerMove={tilt}
        onPointerLeave={reset}
        className="relative bg-paper transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Product image */}
        <div className="relative overflow-hidden bg-ivory-deep">
          <Link
            to="/sarees/$id"
            params={{ id: product.id }}
            className={cn(
              "relative block overflow-hidden",
              large ? "aspect-3/4" : "aspect-3/4"
            )}
          >
            <img
              src={product.images[0]}
              alt={`${product.name}, catalogue photograph`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-110"
            />

            {/* Soft image shade */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover/card:opacity-20" />

            {/* Silk light reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-150% skew-x-[-18deg] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover/card:translate-x-[150%]"
            />

            {/* Explore label */}
            <span className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 bg-paper/95 px-4 py-2 text-[10px] tracking-[0.18em] text-ink uppercase opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
              Explore saree
              <ArrowUpRight className="size-3" />
            </span>
          </Link>

          {/* Wishlist */}
          <button
            type="button"
            aria-label={
              wished
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            aria-pressed={wished}
            onClick={() => {
              toggleWish(product.id);
              toast(
                wished
                  ? "Removed from wishlist"
                  : "Saved to wishlist"
              );
            }}
            className="absolute top-3 right-3 z-20 flex size-11 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95"
          >
            <Heart
              className={cn(
                "size-4 transition-all duration-300",
                wished
                  ? "scale-110 fill-burgundy text-burgundy"
                  : "hover:text-burgundy"
              )}
            />
          </button>

          {/* Quick view shortcut */}
          <button
            type="button"
            onClick={openQuickView}
            className="absolute right-3 bottom-3 z-20 hidden translate-y-3 bg-paper/95 px-4 py-2 text-[10px] tracking-[0.16em] text-ink uppercase opacity-0 shadow-sm transition-all duration-300 hover:bg-burgundy hover:text-white group-hover/card:translate-y-0 group-hover/card:opacity-100 sm:block"
          >
            Quick view
          </button>
        </div>

        {/* Product details */}
        <div className="flex items-end justify-between gap-3 px-1 pt-4 pb-2">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">
              {product.category === "silk"
                ? "Silk edit"
                : "Fancy catalogue"}

              {product.swatchTotal > 1
                ? ` · ${product.swatch}/${product.swatchTotal}`
                : ""}
            </p>

            <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">
              <Link
                to="/sarees/$id"
                params={{ id: product.id }}
                className="transition-colors duration-300 hover:text-burgundy"
              >
                {product.name}
              </Link>
            </h3>

            <p className="mt-2 text-sm text-ink-soft tabular-nums">
              {priceLine(product)}
            </p>
          </div>

          <button
            type="button"
            onClick={openQuickView}
            aria-label={`Quick view ${product.name}`}
            className="mb-1 hidden shrink-0 border border-line px-3 py-2 text-xs tracking-widest text-ink uppercase transition-all duration-300 hover:border-burgundy hover:bg-burgundy hover:text-white sm:inline-flex"
          >
            Quick view
          </button>
        </div>

        {/* Mobile quick view */}
        <button
          type="button"
          onClick={openQuickView}
          className="mt-2 w-full border border-line py-3 text-xs tracking-[0.18em] text-ink uppercase transition-all duration-300 hover:border-burgundy hover:bg-burgundy hover:text-white sm:hidden"
        >
          Quick view
        </button>

        {/* Bottom animated gold line */}
        <div className="mt-3 h-px w-0 bg-gold transition-all duration-700 group-hover/card:w-full" />
      </article>
    </div>
  );
}
