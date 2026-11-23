import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Enquiry = {
  name: string;
  phone: string;
  message: string;
  at: string;
};

type Line = { id: string; qty: number };

type BoutiqueState = {
  wishlist: string[];
  bag: Line[];
  newsletter: string[];
  enquiries: Enquiry[];
  toggleWish: (id: string) => void;
  addToBag: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeFromBag: (id: string) => void;
  clearBag: () => void;
  saveNewsletter: (email: string) => boolean;
  saveEnquiry: (entry: Omit<Enquiry, "at">) => void;
};

export const useBoutique = create<BoutiqueState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      bag: [],
      newsletter: [],
      enquiries: [],
      toggleWish: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((item) => item !== id)
            : [...state.wishlist, id],
        })),
      addToBag: (id) =>
        set((state) => {
          const existing = state.bag.find((line) => line.id === id);
          if (!existing) return { bag: [...state.bag, { id, qty: 1 }] };
          return {
            bag: state.bag.map((line) =>
              line.id === id ? { ...line, qty: Math.min(line.qty + 1, 6) } : line,
            ),
          };
        }),
      setQty: (id, qty) =>
        set((state) => ({
          bag:
            qty <= 0
              ? state.bag.filter((line) => line.id !== id)
              : state.bag.map((line) => (line.id === id ? { ...line, qty } : line)),
        })),
      removeFromBag: (id) => set((state) => ({ bag: state.bag.filter((line) => line.id !== id) })),
      clearBag: () => set({ bag: [] }),
      saveNewsletter: (email) => {
        const value = email.trim().toLowerCase();
        if (get().newsletter.includes(value)) return false;
        set((state) => ({ newsletter: [...state.newsletter, value] }));
        return true;
      },
      saveEnquiry: (entry) =>
        set((state) => ({
          enquiries: [...state.enquiries, { ...entry, at: new Date().toISOString() }],
        })),
    }),
    {
      name: "ishtaa-boutique",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

type UiState = {
  quickId: string | null;
  searchOpen: boolean;
  menuOpen: boolean;
  setQuick: (id: string | null) => void;
  setSearch: (open: boolean) => void;
  setMenu: (open: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  quickId: null,
  searchOpen: false,
  menuOpen: false,
  setQuick: (quickId) => set({ quickId }),
  setSearch: (searchOpen) => set({ searchOpen }),
  setMenu: (menuOpen) => set({ menuOpen }),
}));
