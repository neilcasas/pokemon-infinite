import { PokemonCard } from "./pokemon-card";
import { Pokemon } from "@/lib/types";

export const PokemonContainer = ({
  pokemons,
}: {
  pokemons: Pokemon[] | null;
}) => {
  return (
    <>
      {pokemons ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-bold text-3xl">
          No Pokemons available!
        </div>
      )}
    </>
  );
};
