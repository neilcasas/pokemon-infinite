import { fetchPokemonBatch } from "@/lib/api";
import { PokemonContainer } from "@/components/pokemon-container";

export default async function Home() {
  const pokemons = await fetchPokemonBatch();
  console.log(pokemons);
  return <>{pokemons && <PokemonContainer pokemons={pokemons} />}</>;
}
