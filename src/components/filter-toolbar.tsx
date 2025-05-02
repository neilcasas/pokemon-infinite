"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "@/components/ui/category-select";
import {
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Filter,
  SortAsc,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/lib/store";
import { useQueryClient } from "@tanstack/react-query";

// All available Pokémon types
const pokemonTypes = [
  { value: "all", label: "All Types" },
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "grass", label: "Grass" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "poison", label: "Poison" },
  { value: "ground", label: "Ground" },
  { value: "flying", label: "Flying" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
];

// Sort options
const sortOptions = [
  { value: "id-asc", label: "ID (Ascending)" },
  { value: "id-desc", label: "ID (Descending)" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
].map((option) => ({
  value: option.value,
  label: (
    <div className="flex items-center gap-2">
      <SortAsc size={16} />
      {option.label}
    </div>
  ),
}));

export const FilterToolbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();

  const {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    sortOrder,
    setSortOrder,
    resetFilters,
  } = useFilterStore();

  // For debouncing search input
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputValue !== searchQuery) {
        setSearchQuery(searchInputValue);
      }
    }, 500); // Debounce delay

    return () => clearTimeout(timer);
  }, [searchInputValue, searchQuery, setSearchQuery]);

  const handleChangeType = (value: string) => {
    setSelectedType(value);
    queryClient.invalidateQueries({ queryKey: ["pokemons"] });
  };

  const handleChangeSort = (value: string) => {
    setSortOrder(value);
    queryClient.invalidateQueries({ queryKey: ["pokemons"] });
  };

  const handleResetFilters = () => {
    resetFilters();
    setSearchInputValue("");
    queryClient.invalidateQueries({ queryKey: ["pokemons"] });
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedType !== "all" || sortOrder !== "id-asc";

  return (
    <div
      className={cn(
        "sticky top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-md transition-all duration-300 ease-in-out z-40",
        isExpanded ? "pb-4" : ""
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle bar */}
        <div className="h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="flex items-center gap-1"
            >
              <X size={14} /> Clear
            </Button>
          )}
        </div>

        {/* Expanded filters section */}
        {isExpanded && (
          <div className="py-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Pokémon..."
                className="pl-8"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>

            {/* Type filter - Using CategorySelect instead */}
            <CategorySelect
              options={pokemonTypes}
              value={selectedType}
              onChange={handleChangeType}
              placeholder="Filter by type"
            />

            {/* Sort options - Using CategorySelect instead */}
            <CategorySelect
              options={sortOptions}
              value={sortOrder}
              onChange={handleChangeSort}
              placeholder="Sort by"
            />
          </div>
        )}
      </div>
    </div>
  );
};
