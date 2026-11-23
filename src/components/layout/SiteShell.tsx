import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Toaster } from "sonner";
import { Chrome } from "@/components/layout/Chrome";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionRoot } from "@/components/layout/MotionRoot";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { QuickView } from "@/components/product/QuickView";
import { useBoutique } from "@/stores/boutique";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const reduce = useReducedMotion();

  useEffect(() => {
    void useBoutique.persist.rehydrate();
  }, []);

  return (
    <>
      <MotionRoot />
      <Header />
      <motion.main
        key={pathname}
        initial={reduce ? false : { y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
      <SearchDialog />
      <QuickView />
      <Chrome />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-ink)",
            color: "var(--color-ivory)",
            border: "1px solid var(--color-gold)",
          },
        }}
      />
    </>
  );
}
