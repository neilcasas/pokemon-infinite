"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypeBadge } from "./type-badge";
import { Pokemon } from "@/lib/types";
import { X } from "lucide-react";

const MotionCard = motion.create(Card);

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
}

export const PokemonCard = ({ id, name, image, types }: Pokemon) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPokemonId, setCurrentPokemonId] = useState(id);
  const [currentPokemon, setCurrentPokemon] = useState({ id, name, image });

  const paddedId = currentPokemon.id.toString().padStart(3, "0");

  useEffect(() => {
    if (isModalOpen) {
      fetchPokemonDetails(currentPokemonId);
    }
  }, [currentPokemonId, isModalOpen]);

  const handleCardClick = async () => {
    setIsModalOpen(true);
    setCurrentPokemonId(id);
    setCurrentPokemon({ id, name, image });
  };

  // Handle navigation to previous Pokemon
  const handlePrevious = () => {
    if (currentPokemonId > 1) {
      setIsLoading(true);
      setCurrentPokemonId(currentPokemonId - 1);
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentPokemonId(currentPokemonId + 1);
  };

  const fetchPokemonDetails = async (pokemonId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }

      const data = await response.json();
      setPokemonDetails(data);

      const formattedId = data.id.toString().padStart(3, "0");
      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

      setCurrentPokemon({
        id: data.id,
        name: data.name,
        image: imageUrl,
      });
    } catch (error) {
      console.error("Error:", error);
      setPokemonDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MotionCard
        className="w-[320px] h-[320px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow"
        initial={{ filter: "blur(10px)", y: 20 }}
        whileInView={{ filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        onClick={handleCardClick}
      >
        <CardContent className="flex flex-col h-full items-center justify-between p-4">
          <div className="mx-auto relative h-[240px] w-[240px]">
            <Image src={image} alt={name} fill className="object-contain" />
          </div>
          <CardFooter className="w-full mt-2 flex flex-col gap-3">
            <CardTitle className="mt-2 text-center w-full capitalize">
              {name}
            </CardTitle>
            <CardDescription className="flex flex-col items-center justify-center">
              <p>ID:{paddedId}</p>
              <div className="flex gap-2 mt-2">
                {types.map((t: { type: { name: string } }, index: number) => (
                  <TypeBadge key={index} type={t.type.name} />
                ))}
              </div>
            </CardDescription>
          </CardFooter>
        </CardContent>
      </MotionCard>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="z-50 w-full max-w-md rounded-lg bg-background p-6 shadow-lg relative"
              initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold capitalize">
                  {currentPokemon.name}{" "}
                  <span className="text-muted-foreground text-sm">
                    #{paddedId}
                  </span>
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1 hover:bg-muted"
                >
                  <X className="h-5 w-5 hover:cursor-pointer" />
                </button>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                </div>
              ) : pokemonDetails ? (
                <div className="space-y-4">
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={currentPokemon.image}
                      alt={currentPokemon.name}
                      className="object-contain mx-auto"
                      width={200}
                      height={200}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-medium">
                        {(pokemonDetails.height / 10).toFixed(1)}m
                      </p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-medium">
                        {(pokemonDetails.weight / 10).toFixed(1)}kg
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Types</p>
                    <div className="flex flex-wrap gap-2">
                      {pokemonDetails.types.map((type, i) => (
                        <TypeBadge key={i} type={type.type.name} />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-border">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentPokemonId <= 1}
                      variant="outline"
                      size="sm"
                    >
                      Previous
                    </Button>
                    <Button onClick={handleNext} variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p>Failed to load Pokémon details.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
