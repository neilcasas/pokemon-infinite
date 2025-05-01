import Image from "next/image";
import { Pokemon } from "@/lib/types";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export const PokemonCard = ({ id, name, image }: Pokemon) => {
  return (
    <Card className="w-[320px] h-[320px] flex-shrink-0">
      <CardContent className="flex flex-col h-full items-center justify-between p-4">
        <div className="mx-auto relative h-[240px] w-[240px]">
          <Image src={image} alt={name} fill className="object-contain" />
        </div>
        <CardFooter className="w-full p-0 mt-2">
          <CardTitle className="text-center w-full">{name}</CardTitle>
        </CardFooter>
        <input type="hidden" value={id} />
      </CardContent>
    </Card>
  );
};
