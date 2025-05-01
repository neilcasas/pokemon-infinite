"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Pokemon } from "@/lib/types";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

const MotionCard = motion(Card);

export const PokemonCard = ({ id, name, image }: Pokemon) => {
  return (
    <MotionCard
      className="w-[320px] h-[320px] flex-shrink-0"
      initial={{ filter: "blur(10px)", y: 100 }}
      whileInView={{ filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <CardContent className="flex flex-col h-full items-center justify-between p-4">
        <div className="mx-auto relative h-[240px] w-[240px]">
          <Image src={image} alt={name} fill className="object-contain" />
        </div>
        <CardFooter className="w-full mt-2">
          <CardTitle className="mt-2 text-center w-full capitalize">
            {name}
          </CardTitle>
        </CardFooter>
        <input type="hidden" value={id} />
      </CardContent>
    </MotionCard>
  );
};
