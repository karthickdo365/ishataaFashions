import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { useBoutique } from "@/stores/boutique";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Ishtaa Fashions" },
      { name: "description", content: "Sarees you have saved on this device at Ishtaa Fashions." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useBoutique((state) => state.wishlist);
  const items = ids.map((id) => getProduct(id)).filter((item) => item != null);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-20">
      <p className="text-xs tracking-widest text-gold uppercase">Wishlist</p>
      <h1 className="mt-3 font-serif text-6xl">Saved on this device</h1>
      {items.length === 0 ? (
        <div className="mt-10 border border-line bg-paper p-8">
          <p className="font-serif text-3xl">Nothing saved yet.</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-soft">
            Tap the heart on a saree. The list stays in this browser — Ishtaa does not run customer accounts on this site.
          </p>
          <Link to="/fancy-sarees" className="mt-6 inline-block text-xs tracking-widest text-burgundy uppercase">
            Browse fancy sarees
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
