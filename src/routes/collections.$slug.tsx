import { createFileRoute, Link } from "@tanstack/react-router";
import { Catalogue } from "@/components/product/Catalogue";
import { getCollection } from "@/data/brand";
import { productsIn } from "@/data/catalog";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const collection = getCollection(params.slug);
    return {
      meta: [
        { title: collection ? `${collection.title} | Ishtaa Fashions` : "Collection | Ishtaa Fashions" },
        { name: "description", content: collection?.blurb ?? "Saree collection from Ishtaa Fashions." },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = getCollection(slug);
  if (!collection) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20">
        <h1 className="font-serif text-5xl">This collection is not on the rail</h1>
        <Link to="/collections" className="mt-6 inline-block text-sm tracking-widest text-burgundy uppercase">
          Back to collections
        </Link>
      </div>
    );
  }
  const items = productsIn(slug);
  return (
    <div className="pt-16">
      {collection.note ? (
        <p className="mx-auto mt-8 max-w-6xl px-5 text-sm text-ink-soft">{collection.note}</p>
      ) : null}
      <Catalogue items={items} eyebrow={collection.eyebrow} title={collection.title} lede={collection.blurb} />
    </div>
  );
}
