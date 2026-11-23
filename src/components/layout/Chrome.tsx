import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/brand";

export function Chrome() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.body.classList.add("cursor-fine");
    const ring = document.createElement("div");
    ring.setAttribute("aria-hidden", "true");
    ring.className = "cursor-ring";
    document.body.appendChild(ring);
    const move = (event: PointerEvent) => {
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.body.classList.remove("cursor-fine");
      ring.remove();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <>
      <a
        href={whatsappLink("Hello Ishtaa Fashions, I would like to enquire about a saree.")}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-5 z-40 flex items-center gap-2 bg-burgundy px-4 py-3 text-xs tracking-widest text-ivory uppercase"
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </a>
      {showTop ? (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 left-4 z-40 flex size-11 items-center justify-center border border-line bg-paper"
        >
          <ArrowUp className="size-4" />
        </button>
      ) : null}
    </>
  );
}
