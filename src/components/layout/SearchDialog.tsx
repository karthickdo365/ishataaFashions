import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { searchProducts } from "@/data/catalog";
import { priceLine } from "@/lib/money";
import { useUi } from "@/stores/boutique";

export function SearchDialog() {
  const open = useUi((state) => state.searchOpen);
  const setSearch = useUi((state) => state.setSearch);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearch]);

  return (
    <Dialog.Root open={open} onOpenChange={setSearch}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed top-20 left-1/2 z-50 w-[min(640px,calc(100%-2rem))] -translate-x-1/2 bg-paper p-5">
          <Dialog.Title className="font-serif text-3xl">Search the catalogue</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-ink-soft">
            Fancy names, prices and the silk edit. Press slash to open this from any page.
          </Dialog.Description>
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(false);
              void navigate({ to: "/search", search: { q: query } });
            }}
          >
            <label className="sr-only" htmlFor="site-search">
              Search
            </label>
            <input
              id="site-search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tussar, organza, kanjivaram…"
              className="w-full border border-line bg-ivory px-4 py-3"
            />
          </form>
          <ul className="mt-4 divide-y divide-line">
            {(query ? results : results.slice(0, 4)).map((product) => (
              <li key={product.id}>
                <Link
                  to="/sarees/$id"
                  params={{ id: product.id }}
                  onClick={() => setSearch(false)}
                  className="flex items-center gap-3 py-3"
                >
                  <img src={product.images[0]} alt="" className="size-14 object-cover" />
                  <span>
                    <span className="block font-serif text-xl leading-none">{product.name}</span>
                    <span className="text-sm text-ink-soft tabular-nums">{priceLine(product)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-2 text-xs tracking-widest text-burgundy uppercase"
            onClick={() => {
              setSearch(false);
              void navigate({ to: "/search", search: { q: query } });
            }}
          >
            See all results
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
