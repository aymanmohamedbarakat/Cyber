import { create } from "zustand";

export const domain = 'http://localhost:1337';

export const useSideHeader = create((set) => ({
  sideHeader: false,
  openSideHeader: () => set(() => ({ sideHeader: true })),
  closeSideHeader: () => set(() => ({ sideHeader: false })),
}));



// export const useCartStore = create((set) => ({
//   cartItems: [],
//   addToCart: (item) =>
//     set((state) => ({ cartItems: [...state.cartItems, item] })),
//   removeFromCart: (id) =>
//     set((state) => ({
//       cartItems: state.cartItems.filter((item) => item.id !== id),
//     })),
// }));