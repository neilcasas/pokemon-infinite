import { Pokemon } from "./types";

export interface PokemonQueryParams {
  offset?: number;
  limit?: number;
  search?: string;
  type?: string;
  sort?: string;
}

export async function fetchPokemonBatch({
  offset = 0,
  limit = 10,
  search = "",
  type = "",
  sort = "id-asc",
}: PokemonQueryParams): Promise<{
  pokemons: Pokemon[];
  nextOffset: number;
  hasMore: boolean;
}> {
  try {
    const fetchLimit = 150;

    const initialRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${offset}`,
      { cache: "force-cache" }
    );

    if (!initialRes.ok) {
      throw new Error("Failed to fetch pokemon");
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
      }
    );

    let pokemons = await Promise.all(promises);

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      pokemons = pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchLower) ||
          pokemon.id.toString().includes(searchLower)
      );
    }

    // Apply type filter if provided
    if (type && type !== "all") {
      pokemons = pokemons.filter((pokemon) =>
        pokemon.types.some(
          (t) => t.type.name.toLowerCase() === type.toLowerCase()
        )
      );
    }

    // Apply sorting
    switch (sort) {
      case "id-asc":
        pokemons.sort((a, b) => a.id - b.id);
        break;
      case "id-desc":
        pokemons.sort((a, b) => b.id - a.id);
        break;
      case "name-asc":
        pokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        pokemons.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    // Determine if there are more results
    const hasMore = data.next !== null;
    const nextOffset = offset + fetchLimit;

    return {
      pokemons: pokemons.slice(0, limit),
      nextOffset,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return {
      pokemons: [],
      nextOffset: offset,
      hasMore: false,
    };
  }
}
