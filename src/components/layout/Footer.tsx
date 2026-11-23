import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { brand, collections, nav, whatsappLink } from "@/data/brand";
import { useBoutique } from "@/stores/boutique";

/* Same look as the homepage: burgundy + gold, serif headings, round buttons. */

const btnBase =
  "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300";
const btnGold = `${btnBase} bg-[#C5A36B] text-[#2A0B14] hover:bg-[#D8B97F]`;
const btnLightGhost = `${btnBase} border border-white/50 text-white hover:bg-white hover:text-[#34252A]`;

function Arrow() {
  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-current/15">
      <svg
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#E3C48A] uppercase">
      <span className="size-1.5 rounded-full bg-[#B58B4B]" />
      {children}
    </p>
  );
}

const linkClass =
  "text-white/75 transition-colors duration-300 hover:text-[#E3C48A]";

export function Footer() {
  const [email, setEmail] = useState("");
  const saveNewsletter = useBoutique((state) => state.saveNewsletter);

  return (
    <footer className="bg-[#2A0B14] text-white">
      {/* Top call-to-action band */}
      <div className="border-b border-white/10 bg-[#481222]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10 md:py-12">
          <h2 className="max-w-xl font-serif text-3xl leading-tight tracking-tight text-[#FBF3E4] md:text-4xl">
            Found a saree you love?{" "}
            <span className="italic text-[#E3C48A]">Talk to us.</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(
                "Hello Ishtaa Fashions, I would like to enquire about a saree."
              )}
              target="_blank"
              rel="noreferrer"
              className={btnGold}
            >
              Chat on WhatsApp <Arrow />
            </a>

            <Link to="/contact" className={btnLightGhost}>
              Contact the boutique <Arrow />
            </Link>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-serif text-4xl text-[#FBF3E4]">Ishtaa</p>
          <p className="mt-2 text-xs tracking-[0.2em] text-[#E3C48A] uppercase">
            {brand.grace}
          </p>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
            {brand.lines.elegance}
          </p>

          <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">
            {brand.address}
          </p>
        </div>

        <div className="md:col-span-2">
          <FooterHeading>Visit</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <FooterHeading>Collections</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  to="/collections/$slug"
                  params={{ slug: collection.slug }}
                  className={linkClass}
                >
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <FooterHeading>The circle</FooterHeading>
          <p className="mt-5 text-sm leading-7 text-white/70">
            There is no public newsletter inbox yet. Leave an email on this
            device, or join directly on WhatsApp.
          </p>

          <form
            className="mt-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 transition-colors focus-within:border-[#E3C48A]"
            onSubmit={(event) => {
              event.preventDefault();

              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toast.error("Enter a valid email address");
                return;
              }

              const added = saveNewsletter(email);
              toast.success(
                added
                  ? "Saved on this device"
                  : "This email is already saved here"
              );
              setEmail("");
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              suppressHydrationWarning
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/40"
            />

            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#C5A36B] px-5 py-2.5 text-xs font-medium tracking-widest text-[#2A0B14] uppercase transition-colors hover:bg-[#D8B97F]"
            >
              Join
            </button>
          </form>

          <a
            href={whatsappLink(
              "Hello Ishtaa Fashions, I would like to join your circle."
            )}
            className="mt-5 inline-flex items-center gap-2 text-sm text-[#E3C48A] transition-colors hover:text-[#F6E4BE]"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp {brand.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Ishtaa Fashions, {brand.city}.{" "}
            {brand.hours}.
          </p>

          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="tracking-[0.2em] uppercase transition-colors hover:text-[#E3C48A]"
          >
            {brand.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}