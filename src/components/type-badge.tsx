import { cn } from "@/lib/utils";

type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

type TypeBadgeProps = {
  type: string;
  className?: string;
};

// Color palette for each Pokémon type
const typeColors: Record<PokemonType, string> = {
  normal: "bg-gray-400 text-gray-900",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-yellow-900",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-cyan-900",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-600 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-300 text-indigo-900",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-white",
  rock: "bg-stone-600 text-white",
  ghost: "bg-purple-800 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-slate-400 text-slate-900",
  fairy: "bg-pink-300 text-pink-900",
};

export const TypeBadge = ({ type, className }: TypeBadgeProps) => {
  const normalizedType = type.toLowerCase() as PokemonType;
  const colorClass = typeColors[normalizedType] || "bg-gray-300 text-gray-800"; // Default color if type not found

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        colorClass,
        className,
      )}
    >
      {type}
    </span>
  );
};
