import { pokemonData } from "./data/pokemon";
import { Pokemon } from "./models/model";

export const PokemonTypeFilters = (
  setType1Filters: React.Dispatch<React.SetStateAction<string[]>>,
  setType2Filters: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let pokemon: Pokemon;
  let filterType1: string[] = ["Any"];
  let filterType2: string[] = ["Any"];

  for (pokemon of pokemonData) {
    if (filterType1.indexOf(pokemon.type_1) === -1) {
      filterType1.push(pokemon.type_1);
    }
    if (pokemon.type_2 === null && filterType2.indexOf("None") === -1) {
      filterType2.push("None");
    }
    if (pokemon.type_2 != null && filterType2.indexOf(pokemon.type_2) === -1) {
      filterType2.push(pokemon.type_2);
    }
  }
  setType1Filters(filterType1);
  setType2Filters(filterType2);
};
