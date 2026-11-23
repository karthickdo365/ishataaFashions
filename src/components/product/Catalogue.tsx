
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "catalogue" | "price-asc" | "price-desc" | "name";

export function Catalogue({
  items,
  eyebrow,
  title,
  lede,
}: {
  items: Product[];
  eyebrow: string;
  title: string;
  lede: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("catalogue");
  const [pricedOnly, setPricedOnly] = useState(false);
  const [fabric, setFabric] = useState("All");

  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(
    new Set()
  );

  const fabrics = useMemo(
    () => [...new Set(items.map((item) => item.name))],
    [items]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    let next = items.filter((item) => {
      if (pricedOnly && item.priceInr == null) return false;
      if (fabric !== "All" && item.name !== fabric) return false;

      if (!q) return true;

      return `${item.name} ${item.summary} ${item.id}`
        .toLowerCase()
        .includes(q);
    });

    next = [...next];

    if (sort === "price-asc") {
      next.sort(
        (a, b) => (a.priceInr ?? 1e9) - (b.priceInr ?? 1e9)
      );
    }

    if (sort === "price-desc") {
      next.sort(
        (a, b) => (b.priceInr ?? -1) - (a.priceInr ?? -1)
      );
    }

    if (sort === "name") {
      next.sort(
        (a, b) =>
          a.name.localeCompare(b.name) ||
          a.id.localeCompare(b.id)
      );
    }

    return next;
  }, [fabric, items, pricedOnly, query, sort]);

  // Reset entrance state when the filtered products change.
  useEffect(() => {
    setVisibleCards(new Set());
  }, [visible]);

  // Animate cards when they enter the viewport.
  useEffect(() => {
    const container = gridRef.current;

    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(
      "[data-product-card]"
    );

    if (!("IntersectionObserver" in window)) {
      setVisibleCards(new Set(visible.map((item) => item.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((previous) => {
          const updated = new Set(previous);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = (entry.target as HTMLElement).dataset.productId;

              if (id) updated.add(id);

              observer.unobserve(entry.target);
            }
          });

          return updated;
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [visible]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      {/* Heading */}
      <div className="animate-[fadeIn_.7s_ease-out_both]">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">
          {eyebrow}
        </p>

        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h1 className="max-w-xl font-serif text-5xl text-ink md:text-6xl">
            {title}
          </h1>

          <p className="max-w-sm text-sm leading-6 text-ink-soft">
            {lede}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mt-10 flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center">
        <label className="sr-only" htmlFor="catalogue-search">
          Filter this catalogue
        </label>

        <input
          id="catalogue-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search weave or name"
          className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink-soft focus:border-gold focus:ring-2 focus:ring-gold/20 md:max-w-xs"
        />

        <label className="text-sm text-ink-soft">
          <span className="sr-only">Sort products</span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortKey)
            }
            className="w-full cursor-pointer border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors hover:border-gold focus:border-gold md:w-auto"
          >
            <option value="catalogue">Catalogue order</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
          <input
            type="checkbox"
            checked={pricedOnly}
            onChange={(event) =>
              setPricedOnly(event.target.checked)
            }
            className="size-4 accent-[#9b7650]"
          />
          Priced pieces only
        </label>

        <p className="text-sm text-ink-soft md:ml-auto">
          <span className="font-medium text-ink">
            {visible.length}
          </span>{" "}
          shown
        </p>
      </div>

      {/* Fabric filter chips */}
      {fabrics.length > 1 && fabrics.length <= 16 && (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-3">
          <FilterChip
            active={fabric === "All"}
            onClick={() => setFabric("All")}
            label="All"
          />

          {fabrics.map((name) => (
            <FilterChip
              key={name}
              active={fabric === name}
              onClick={() => setFabric(name)}
              label={name}
            />
          ))}
        </div>
      )}

      {/* Collection heading */}
      <div className="mt-8 flex items-center justify-between">
        <p className="font-serif text-xl text-ink">
          Explore the collection
        </p>

        <span className="text-[10px] tracking-[0.18em] text-gold uppercase">
          ISHTAA EDIT
        </span>
      </div>

      {/* Product grid */}
      {visible.length === 0 ? (
        <div className="mt-12 border border-line bg-paper px-6 py-16 text-center">
          <p className="font-serif text-2xl text-ink">
            No sarees found
          </p>

          <p className="mt-3 text-sm text-ink-soft">
            Try another search or clear your filters.
          </p>

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFabric("All");
              setPricedOnly(false);
              setSort("catalogue");
            }}
            className="mt-6 border border-ink bg-ink px-6 py-3 text-xs tracking-widest text-white transition-all duration-300 hover:border-gold hover:bg-gold"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((product, index) => {
            const isVisible = visibleCards.has(product.id);

            return (
              <div
                key={product.id}
                data-product-card
                data-product-id={product.id}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0)"
                    : "translateY(35px)",
                  transition:
                    "opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)",
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 border px-4 py-2 text-xs tracking-wide transition-all duration-300 ${
        active
          ? "border-ink bg-ink text-ivory shadow-md"
          : "border-line bg-paper text-ink hover:-translate-y-0.5 hover:border-gold hover:text-burgundy"
      }`}
    >
      {label}
    </button>
  );
}
