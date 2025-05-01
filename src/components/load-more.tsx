"use client";
import { Spinner } from "./spinner";
import { Pokemon } from "@/lib/types";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export const LoadMore = () => {
  // empty array on first render, will be appended with new pokemons from infinite-scroll
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // initial offset is 0 since the first render already shows 10 pokemon
  const [offset, setOffset] = useState(0);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      console.log("spinner in view");
    }
  }, [inView]);

  return (
    <div className="w-full flex items-center justify-center" ref={ref}>
      <Spinner />
    </div>
  );
};
