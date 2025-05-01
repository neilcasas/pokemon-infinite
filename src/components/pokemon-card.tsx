import Image from "next/image";
import { Pokemon } from "@/lib/types";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export const PokemonCard = ({ id, name, image }: Pokemon) => {
  return (
    <Card>
      <CardContent className="flex flex-col h-80 w-80">
        <div className="mx-auto relative h-64 w-64">
          <Image src={image} alt={name} fill className="object-contain" />
        </div>
        <CardFooter className="flex flex-col p-4">
          <CardTitle className="my-2">{name}</CardTitle>
        </CardFooter>
        <input type="hidden" value={id} />
      </CardContent>
    </Card>
  );
};
