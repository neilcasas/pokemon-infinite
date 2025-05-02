import { useQuery } from "@tanstack/react-query";
import { fetchPokemonBatch } from "./api";
import { useFilterStore } from "./store";
import { useMemo } from "react";

// Fetch all Pokémon at once (we'll limit to the first 151 for performance)
const usePokemonData = () => {
  return useQuery({
    queryKey: ["pokemon-all"],
    queryFn: async () => {
      const allPokemon = await fetchPokemonBatch(0, 151);
      return allPokemon || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Filter and sort the Pokémon based on the filter store
export const useFilteredPokemon = () => {
  const { searchQuery, selectedType, sortOrder } = useFilterStore();
  const { data: allPokemon, isLoading, isError } = usePokemonData();

  const filteredPokemon = useMemo(() => {
    if (!allPokemon) return [];

    let filtered = [...allPokemon];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(query) ||
          pokemon.id.toString().includes(query)
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some(
          (t) => t.type.name.toLowerCase() === selectedType.toLowerCase()
        )
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case "id-asc":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "id-desc":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filtered;
  }, [allPokemon, searchQuery, selectedType, sortOrder]);

  return {
    pokemon: filteredPokemon,
    isLoading,
    isError,
  };
};
