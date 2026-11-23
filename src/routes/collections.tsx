import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/data/brand";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections | Ishtaa Fashions" },
      {
        name: "description",
        content: "Kanchipuram, bridal, fancy, designer, traditional, festive and silk collections from Ishtaa Fashions, Coimbatore.",
      },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-widest text-gold uppercase">Collections</p>
        <h1 className="mt-3 max-w-xl font-serif text-6xl">Choose the occasion, then the weave</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              to="/collections/$slug"
              params={{ slug: collection.slug }}
              className="group grid overflow-hidden bg-paper sm:grid-cols-2"
            >
              <img src={collection.image} alt="" className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-full" />
              <div className="flex flex-col justify-center p-6">
                <p className="text-xs tracking-widest text-gold uppercase">{collection.eyebrow}</p>
                <h2 className="mt-2 font-serif text-4xl">{collection.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{collection.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
