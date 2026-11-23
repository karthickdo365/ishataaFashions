import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { brand } from "@/data/brand";
import { contactEnquiry, phoneHref } from "@/lib/money";
import { useBoutique } from "@/stores/boutique";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Ishtaa Fashions" },
      {
        name: "description",
        content: `Contact Ishtaa Fashions in Coimbatore. WhatsApp ${brand.phoneDisplay}. Open ${brand.hours}.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const saveEnquiry = useBoutique((state) => state.saveEnquiry);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-28 pb-20 lg:grid-cols-2">
      <div>
        <p className="text-xs tracking-widest text-gold uppercase">Contact us</p>
        <h1 className="mt-3 font-serif text-6xl">The boutique is open</h1>
        <dl className="mt-8 space-y-5 text-sm">
          <div>
            <dt className="text-xs tracking-widest text-gold uppercase">Call / WhatsApp</dt>
            <dd className="mt-1">
              <a href={phoneHref} className="font-serif text-3xl">{brand.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-gold uppercase">Hours</dt>
            <dd className="mt-1 text-lg">{brand.hours}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-gold uppercase">Atelier</dt>
            <dd className="mt-1 max-w-sm leading-6">{brand.address}</dd>
            <dd className="mt-2">
              <a href={brand.maps} target="_blank" rel="noreferrer" className="text-xs tracking-widest text-burgundy uppercase">
                Open in maps
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-gold uppercase">Instagram</dt>
            <dd className="mt-1">
              <a href={brand.instagram} target="_blank" rel="noreferrer">{brand.instagramHandle}</a>
            </dd>
          </div>
        </dl>
        <iframe title="Map showing Ishtaa Fashions in Coimbatore" src={brand.mapsEmbed} className="mt-8 h-72 w-full border border-line" loading="lazy" />
      </div>
      <form
        className="bg-paper p-6 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (name.trim().length < 2) {
            setError("Please add your name.");
            return;
          }
          if (message.trim().length < 8) {
            setError("Tell us a little more about the saree or visit.");
            return;
          }
          if (phone && !/^[0-9+\s-]{8,16}$/.test(phone)) {
            setError("That phone number does not look complete.");
            return;
          }
          setError("");
          saveEnquiry({ name: name.trim(), phone: phone.trim(), message: message.trim() });
          toast.success("Opening WhatsApp with your note");
          window.open(contactEnquiry({ name: name.trim(), phone: phone.trim(), message: message.trim() }), "_blank", "noopener,noreferrer");
        }}
      >
        <h2 className="font-serif text-4xl">Write to the atelier</h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          No public email is listed. This form checks your note, keeps a copy on this device, and opens WhatsApp so Ishtaa actually receives it.
        </p>
        <label className="mt-6 block text-sm">
          Name
          <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-line bg-ivory px-3 py-3" />
        </label>
        <label className="mt-4 block text-sm">
          Phone <span className="text-ink-soft">(optional)</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" className="mt-2 w-full border border-line bg-ivory px-3 py-3" />
        </label>
        <label className="mt-4 block text-sm">
          Message
          <textarea required value={message} onChange={(event) => setMessage(event.target.value)} rows={5} className="mt-2 w-full border border-line bg-ivory px-3 py-3" />
        </label>
        {error ? <p className="mt-3 text-sm text-burgundy">{error}</p> : null}
        <button type="submit" className="mt-6 bg-burgundy px-5 py-3 text-xs tracking-widest text-ivory uppercase">
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
