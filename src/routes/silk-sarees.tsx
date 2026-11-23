import { createFileRoute } from "@tanstack/react-router";
import { Catalogue } from "@/components/product/Catalogue";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/silk-sarees")({
  head: () => ({
    meta: [
      { title: "Silk Sarees | Ishtaa Fashions" },
      {
        name: "description",
        content:
          "Silk saree photographs from Ishtaa Fashions, Coimbatore. Prices are not published on the silk page — enquire on WhatsApp.",
      },
    ],
  }),
  component: function SilkPage() {
    const items = products.filter((item) => item.category === "silk");
    return (
      <div className="pt-20">
        <Catalogue
          items={items}
          eyebrow="Silk sarees"
          title="Photographs, not invented prices"
          lede="These drapes are on the live silk page without names or rates. Ask Ishtaa for the weave and the figure. Silk cotton enquiries are welcome on the same WhatsApp line — that page was not published."
        />
      </div>
    );
  },
});
