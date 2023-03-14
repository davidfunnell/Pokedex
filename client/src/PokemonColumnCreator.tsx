import { pokemonData } from "./data/pokemon";
import { Pokemon } from "./models/model";

export const PokemonColumnCreator = (
  searchFilter: string,
  type1Filter: string,
  type2Filter: string,
  setPokemonColumns: React.Dispatch<React.SetStateAction<Pokemon[][]>>
) => {
  let pokemon: Pokemon;
  let i = 0;
  let columns: Pokemon[][] = [[], [], []];
  for (pokemon of pokemonData) {
    let check_dex_num: string = pokemon.dex_number
      .toString()
      .slice(0, searchFilter.length);
    let check_name: string = pokemon.name.slice(0, searchFilter.length);
    if (check_name === searchFilter || check_dex_num == searchFilter) {
      if (type1Filter === "Any" && type2Filter === "Any") {
        columns[i].push(pokemon);
        i = i + 1;
      } else if (type1Filter === "Any" && type2Filter === pokemon.type_2) {
        columns[i].push(pokemon);
        i = i + 1;
      } else if (
        type1Filter === "Any" &&
        type2Filter === "None" &&
        pokemon.type_2 === null
      ) {
        columns[i].push(pokemon);
        i = i + 1;
      } else if (type1Filter === pokemon.type_1 && type2Filter === "Any") {
        columns[i].push(pokemon);
        i = i + 1;
      } else if (
        type1Filter === pokemon.type_1 &&
        type2Filter === pokemon.type_2
      ) {
        columns[i].push(pokemon);
        i = i + 1;
      } else if (
        type1Filter === pokemon.type_1 &&
        type2Filter === "None" &&
        pokemon.type_2 === null
      ) {
        columns[i].push(pokemon);
        i = i + 1;
      }
    }
    if (i > 2) {
      i = 0;
    }
  }
  setPokemonColumns(columns);
};
