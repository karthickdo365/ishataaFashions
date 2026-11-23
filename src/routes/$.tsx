import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [{ title: "Page not found | Ishtaa Fashions" }],
  }),
  component: function Missing() {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <p className="text-xs tracking-widest text-gold uppercase">404</p>
        <h1 className="mt-3 font-serif text-6xl">This drape is not on the rail</h1>
        <Link to="/" className="mt-8 inline-block text-xs tracking-widest text-burgundy uppercase">
          Return home
        </Link>
      </div>
    );
  },
});
