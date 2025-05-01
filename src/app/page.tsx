import { PokemonCard } from "@/components/pokemon-card";
import { fetchPokemonBatch } from "@/lib/api";

export default async function Home() {
  const pokemons = await fetchPokemonBatch();
  console.log(pokemons);
  return (
    <div className="flex gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
}
