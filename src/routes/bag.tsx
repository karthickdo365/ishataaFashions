import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { bagEnquiry, formatInr, priceLine } from "@/lib/money";
import { useBoutique } from "@/stores/boutique";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Enquiry bag | Ishtaa Fashions" },
      { name: "description", content: "Review sarees and send an enquiry to Ishtaa Fashions on WhatsApp. No online payment." },
    ],
  }),
  component: BagPage,
});

function BagPage() {
  const bag = useBoutique((state) => state.bag);
  const setQty = useBoutique((state) => state.setQty);
  const removeFromBag = useBoutique((state) => state.removeFromBag);
  const lines = bag.map((line) => ({ ...line, product: getProduct(line.id) })).filter((line) => line.product);
  const { href, subtotal } = bagEnquiry(lines.map((line) => ({ id: line.id, qty: line.qty })));

  return (
    <div className="mx-auto max-w-3xl px-5 pt-28 pb-20">
      <p className="text-xs tracking-widest text-gold uppercase">Enquiry bag</p>
      <h1 className="mt-3 font-serif text-6xl">Pieces to confirm</h1>
      <p className="mt-4 text-sm leading-6 text-ink-soft">
        This is not a checkout. Ishtaa confirms cloth and shipping on WhatsApp. No payment is taken here.
      </p>
      {lines.length === 0 ? (
        <div className="mt-10 border border-line p-8">
          <p className="font-serif text-3xl">Your bag is empty.</p>
          <Link to="/collections" className="mt-4 inline-block text-xs tracking-widest text-burgundy uppercase">
            Explore collections
          </Link>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-4 py-5">
              <img src={line.product!.images[0]} alt="" className="size-24 object-cover" />
              <div className="flex-1">
                <Link to="/sarees/$id" params={{ id: line.id }} className="font-serif text-2xl leading-none">
                  {line.product!.name}
                </Link>
                <p className="mt-2 text-sm tabular-nums text-ink-soft">{priceLine(line.product!)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm">
                    Qty
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={line.qty}
                      onChange={(event) => setQty(line.id, Number(event.target.value))}
                      className="ml-2 w-16 border border-line bg-paper px-2 py-2 tabular-nums"
                    />
                  </label>
                  <button type="button" className="text-sm text-burgundy" onClick={() => removeFromBag(line.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {lines.length > 0 ? (
        <div className="mt-8">
          {subtotal > 0 ? (
            <p className="text-sm">
              Listed subtotal of priced pieces <span className="tabular-nums">{formatInr(subtotal)}</span>. Shipping extra where the catalogue says so. Silk edits without a price are not included in this figure.
            </p>
          ) : null}
          <a href={href} target="_blank" rel="noreferrer" className="mt-6 inline-block bg-burgundy px-5 py-3 text-xs tracking-widest text-ivory uppercase">
            Send enquiry on WhatsApp
          </a>
        </div>
      ) : null}
    </div>
  );
}
