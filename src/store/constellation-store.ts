import { create } from "zustand";

interface ConstellationState {
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  focused: boolean;
  autoRotate: boolean;
  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  clearSelection: () => void;
  setAutoRotate: (v: boolean) => void;
}

export const useConstellationStore = create<ConstellationState>((set) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  focused: false,
  autoRotate: true,
  selectNode: (id) => set({ selectedNodeId: id, focused: id !== null, autoRotate: id === null }),
  hoverNode: (id) => set({ hoveredNodeId: id }),
  clearSelection: () => set({ selectedNodeId: null, focused: false, autoRotate: true }),
  setAutoRotate: (v) => set({ autoRotate: v }),
}));
