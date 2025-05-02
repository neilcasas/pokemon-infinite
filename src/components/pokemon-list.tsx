"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonCard } from "./pokemon-card";
import { Spinner } from "./spinner";
import { usePokemonInfiniteQuery } from "@/lib/hooks";
import { Pokemon } from "@/lib/types";
import { useFilterStore } from "@/lib/store";
import { Button } from "./ui/button";

export function PokemonList() {
  const { searchQuery, selectedType, sortOrder } = useFilterStore();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = usePokemonInfiniteQuery();

  const { ref, inView } = useInView();
  const prevFiltersRef = useRef({ searchQuery, selectedType, sortOrder });

  // Handle filters change
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (
      prevFilters.searchQuery !== searchQuery ||
      prevFilters.selectedType !== selectedType ||
      prevFilters.sortOrder !== sortOrder
    ) {
      refetch();
    }

    prevFiltersRef.current = { searchQuery, selectedType, sortOrder };
  }, [searchQuery, selectedType, sortOrder, refetch]);

  // Fetch next page when the last item is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Extract all pokemons from pages
  const allPokemons: Pokemon[] =
    data?.pages.flatMap((page) => page.pokemons) || [];

  if (status === "pending") {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-2xl font-bold">Error Loading Pokémon</p>
        <p className="text-muted-foreground mt-2">Please try again later</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (allPokemons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-2xl font-bold">No Pokémon Found</p>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <div ref={ref} className="w-full py-8 flex items-center justify-center">
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
}
