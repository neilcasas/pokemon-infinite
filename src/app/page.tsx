import { fetchPokemonBatch } from "@/lib/api";

export default async function Home() {
  const pokemon = await fetchPokemonBatch();
  console.log(pokemon);
  return <></>;
}
