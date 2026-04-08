import { create } from "zustand";
import {
  clearPurchasedItem,
  createGroceryItems,
  deleteGroceryItem,
  listGroceryItems,
  setGroceryItemPurchased,
  updateGroceryItemQuantity,
} from "@/lib/server/db-actions";

export type GroceryCategory =
  | "Alat"
  | "Komputer & Elektronik"
  | "Gadget"
  | "Snack"
  | "Aksesoris"
  | "Pakaian"
  | "Edukasi"
  | "Makanan & Minuman"
  | "Buah & Sayur"
  | "Daging & Protein"
  | "Kesehatan"
  | "Kebersihan"
  | "Rumah Tangga";
export type GroceryPriority = "rendah" | "sedang" | "tinggi";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });

    try {
      const items = await listGroceryItems();

      set({ items: items as GroceryItem[] });
    } catch (error) {
      console.log("Error loading items:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input) => {
    set({ error: null });

    try {
      const item = await createGroceryItems({
        name: input.name,
        category: input.category,
        quantity: input.quantity,
        priority: input.priority,
      });

      set((state) => ({ items: [item as GroceryItem, ...state.items] }));

      return item as GroceryItem;
    } catch (error) {
      console.log("Error adding item:", error);
      set({ error: "Failed to add item" });
    }
  },

  updateQuantity: async (id, quantity) => {
    const nexQuantity = Math.max(1, quantity);
    set({ error: null });

    try {
      const item = await updateGroceryItemQuantity(id, nexQuantity);

      set((state) => ({
        items: state.items.map((i) =>
          i.id === id && item ? (item as GroceryItem) : i,
        ),
      }));
    } catch (error) {
      console.log("Error updating quantity:", error);
      set({ error: "Something went wrong" });
    }
  },

  togglePurchased: async (id) => {
    const currentItem = get().items.find((item) => item.id === id);

    if (!currentItem) return;

    const nextPurchased = !currentItem.purchased;

    set({ error: null });

    try {
      const item = await setGroceryItemPurchased(id, nextPurchased);

      set((state) => ({
        items: state.items.map((i) =>
          i.id === id && item ? (item as GroceryItem) : i,
        ),
      }));
    } catch (error) {
      console.log("Error toggling purchased:", error);
      set({ error: "Something went wrong" });
    }
  },

  removeItem: async (id) => {
    set({ error: null });

    try {
      await deleteGroceryItem(id);

      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    } catch (error) {
      console.log("Error removing item:", error);
      set({ error: "Something went wrong" });
    }
  },

  clearPurchased: async () => {
    set({ error: null });

    try {
      await clearPurchasedItem();

      const items = get().items.filter((item) => !item.purchased);
      set({ items });
    } catch (error) {
      console.log("Error clearing purchased items:", error);
      set({ error: "Something went wrong" });
    }
  },
}));
