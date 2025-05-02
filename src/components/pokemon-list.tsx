"use client";

import { PokemonCard } from "./pokemon-card";
import { Spinner } from "./spinner";
import { useFilteredPokemon } from "@/lib/hooks";

export function PokemonList() {
  const { pokemon, isLoading, isError } = useFilteredPokemon();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-2xl font-bold">Error Loading Pokémon</p>
        <p className="text-muted-foreground mt-2">Please try again later</p>
      </div>
    );
  }

  if (pokemon.length === 0) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 w-full">
      {pokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
}
