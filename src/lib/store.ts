import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  sortOrder: string;
  setSortOrder: (sort: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedType: "all",
  setSelectedType: (type) => set({ selectedType: type }),
  sortOrder: "id-asc",
  setSortOrder: (sort) => set({ sortOrder: sort }),
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedType: "all",
      sortOrder: "id-asc",
    }),
}));
