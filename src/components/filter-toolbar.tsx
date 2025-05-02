"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

// Sort options
const sortOptions = [
  { value: "id-asc", label: "ID (Ascending)" },
  { value: "id-desc", label: "ID (Descending)" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

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
        "fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg transition-all duration-300 ease-in-out z-40",
        isExpanded ? "h-auto pb-4" : "h-16"
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
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
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
          <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Type filter */}
            <Select value={selectedType} onValueChange={handleChangeType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {pokemonTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort options */}
            <Select value={sortOrder} onValueChange={handleChangeSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <SortAsc size={16} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};
