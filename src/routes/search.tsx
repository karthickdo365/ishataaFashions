import { createFileRoute } from "@tanstack/react-router";
import { Catalogue } from "@/components/product/Catalogue";
import { searchProducts } from "@/data/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search | Ishtaa Fashions" },
      { name: "description", content: "Search the Ishtaa Fashions saree catalogue." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const items = searchProducts(q);
  return (
    <div className="pt-20">
      <Catalogue
        items={items}
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "The whole catalogue"}
        lede="Names, weaves and the silk edit. Prices stay blank where the boutique did not publish one."
      />
    </div>
  );
}
