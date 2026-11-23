import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { collections, nav } from "@/data/brand";
import { cn } from "@/lib/cn";
import { useBoutique, useUi } from "@/stores/boutique";

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const menuOpen = useUi((state) => state.menuOpen);
  const setMenu = useUi((state) => state.setMenu);
  const setSearch = useUi((state) => state.setSearch);
  const wishCount = useBoutique((state) => state.wishlist.length);
  const bagCount = useBoutique((state) => state.bag.reduce((sum, line) => sum + line.qty, 0));
  const onHero = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname, setMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        onHero ? "bg-transparent text-ivory" : "border-b border-line bg-ivory/95 text-ink backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="block" aria-label="Ishtaa Fashions home">
          <span className="font-serif text-3xl leading-none tracking-tight">Ishtaa</span>
          <span className={cn("block text-xs tracking-widest uppercase", onHero ? "text-gold-soft" : "text-gold")}>
            Drape with Grace
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            item.href === "/collections" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "text-xs tracking-widest uppercase",
                    pathname.startsWith("/collections") && "border-b border-gold pb-1",
                  )}
                  aria-expanded={mega}
                >
                  Collections
                </Link>
                {mega ? (
                  <div className="absolute top-full left-1/2 w-[640px] -translate-x-1/2 pt-4">
                    <div className="grid grid-cols-2 gap-2 border border-line bg-paper p-4 text-ink shadow-none">
                      {collections.map((collection) => (
                        <Link
                          key={collection.slug}
                          to="/collections/$slug"
                          params={{ slug: collection.slug }}
                          className="flex items-center gap-3 px-2 py-2 hover:bg-ivory"
                        >
                          <img src={collection.image} alt="" className="size-14 object-cover" />
                          <span>
                            <span className="block font-serif text-xl leading-none">{collection.title}</span>
                            <span className="text-xs text-ink-soft">{collection.eyebrow}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-xs tracking-widest uppercase",
                  pathname === item.href && "border-b border-gold pb-1",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1">
          <IconButton label="Search sarees" onClick={() => setSearch(true)} light={onHero}>
            <Search className="size-5" />
          </IconButton>
          <Link to="/wishlist" aria-label={`Wishlist, ${wishCount} saved`} className="relative flex size-11 items-center justify-center">
            <Heart className="size-5" />
            <Count n={wishCount} />
          </Link>
          <Link to="/bag" aria-label={`Enquiry bag, ${bagCount} pieces`} className="relative flex size-11 items-center justify-center">
            <ShoppingBag className="size-5" />
            <Count n={bagCount} />
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenu(!menuOpen)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="max-h-[calc(100svh-5rem)] overflow-auto border-t border-line bg-ivory px-5 py-6 text-ink lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} to={item.href} className="border-b border-line py-4 font-serif text-3xl">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                to="/collections/$slug"
                params={{ slug: collection.slug }}
                className="text-sm text-ink-soft"
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-11 items-center justify-center">
      {children}
    </button>
  );
}

function Count({ n }: { n: number }) {
  if (!n) return null;
  return (
    <span className="absolute top-1 right-0 min-w-4 bg-burgundy px-1 text-center text-xs leading-4 text-ivory tabular-nums">
      {n}
    </span>
  );
}
