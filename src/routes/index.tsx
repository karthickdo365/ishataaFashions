import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/HomePage";
import { brand } from "@/data/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ishtaa Fashions | Coimbatore" },
      { name: "description", content: brand.description },
    ],
  }),
  component: HomePage,
});
