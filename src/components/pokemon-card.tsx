"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TypeBadge } from "./type-badge";
import { Pokemon } from "@/lib/types";

const MotionCard = motion.create(Card);

export const PokemonCard = ({ id, name, image, types }: Pokemon) => {
  const paddedId = id.toString().padStart(3, "0");
  return (
    <MotionCard
      className="w-[320px] h-[320px] flex-shrink-0"
      initial={{ filter: "blur(10px)", y: 20 }}
      whileInView={{ filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
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
  );
};
