import { create } from "zustand";

export const domain = 'http://localhost:1337';

export const useSideHeader = create((set) => ({
  sideHeader: false,
  openSideHeader: () => set(() => ({ sideHeader: true })),
  closeSideHeader: () => set(() => ({ sideHeader: false })),
}));
