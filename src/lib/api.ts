import { Pokemon } from "./types";

export async function fetchPokemonBatch(
  offset?: number,
): Promise<Pokemon[] | null> {
  const initialRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset ? offset : 0}`,
  );

  if (!initialRes.ok) {
    console.log("Failed to fetch pokemon");
    return null;
  }

  const data = await initialRes.json();

  const promises = data.results.map(
    async (i: { name: string; url: string }) => {
      const pokemonData: {
        id: number;
        name: string;
        types: { type: { name: string } }[];
      } = await fetch(i.url).then((res) => res.json());

      const id = pokemonData.id.toString().padStart(3, "0");

      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types,
        image: imageUrl,
      };
    },
  );

  return await Promise.all(promises);
}
