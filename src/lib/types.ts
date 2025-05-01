export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: {
    type: {
      name: string;
    }[];
  };
};
