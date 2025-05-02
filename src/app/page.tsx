"use client";

import { Suspense } from "react";
import { PokemonList } from "@/components/pokemon-list";
import { Spinner } from "@/components/spinner";
import { FilterToolbar } from "@/components/filter-toolbar";
import { useFilterStore } from "@/lib/store";

export default function Home() {
  const { searchQuery, selectedType, sortOrder } = useFilterStore();

  return (
    <>
      <FilterToolbar />
      <div className="pt-4 pb-10 w-full">
        <Suspense
          key={`${searchQuery}-${selectedType}-${sortOrder}`}
          fallback={
            <div className="w-full h-96 flex items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <PokemonList />
        </Suspense>
      </div>
    </>
  );
}
