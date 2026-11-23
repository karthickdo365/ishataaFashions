import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getProduct } from "@/data/catalog";
import { priceLine, productEnquiry } from "@/lib/money";
import { useBoutique, useUi } from "@/stores/boutique";
import { toast } from "sonner";

export function QuickView() {
  const id = useUi((state) => state.quickId);
  const setQuick = useUi((state) => state.setQuick);
  const product = id ? getProduct(id) : undefined;
  const addToBag = useBoutique((state) => state.addToBag);
  const toggleWish = useBoutique((state) => state.toggleWish);
  const wished = useBoutique((state) => (id ? state.wishlist.includes(id) : false));

  return (
    <Dialog.Root open={Boolean(product)} onOpenChange={(open) => !open && setQuick(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 grid max-h-[90svh] w-[min(920px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-auto bg-paper shadow-none md:grid-cols-2">
          {product ? (
            <>
              <Dialog.Title className="sr-only">{product.name}</Dialog.Title>
              <Dialog.Description className="sr-only">{product.summary}</Dialog.Description>
              <img
                src={product.images[0]}
                alt=""
                className="h-72 w-full object-cover md:h-full"
              />
              <div className="relative p-6 md:p-8">
                <Dialog.Close className="absolute top-4 right-4 flex size-11 items-center justify-center" aria-label="Close">
                  <X className="size-5" />
                </Dialog.Close>
                <p className="text-xs tracking-widest text-gold uppercase">{product.id.toUpperCase()}</p>
                <h2 className="mt-2 font-serif text-4xl text-ink">{product.name}</h2>
                <p className="mt-3 text-lg tabular-nums">{priceLine(product)}</p>
                <p className="mt-4 text-sm leading-6 text-ink-soft">{product.summary}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    className="bg-burgundy px-5 py-3 text-sm tracking-widest text-ivory uppercase"
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
                    className="border border-ink px-5 py-3 text-center text-sm tracking-widest uppercase"
                  >
                    Enquire on WhatsApp
                  </a>
                  <button
                    type="button"
                    className="px-5 py-2 text-sm text-ink-soft"
                    onClick={() => {
                      toggleWish(product.id);
                      toast(wished ? "Removed from wishlist" : "Saved to wishlist");
                    }}
                  >
                    {wished ? "Remove from wishlist" : "Save to wishlist"}
                  </button>
                  <Link
                    to="/sarees/$id"
                    params={{ id: product.id }}
                    onClick={() => setQuick(null)}
                    className="text-sm tracking-widest text-burgundy uppercase"
                  >
                    View full drape
                  </Link>
                </div>
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
