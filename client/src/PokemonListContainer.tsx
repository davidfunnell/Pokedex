import { useState, useEffect } from "react";
import { Pokemon } from "./models/model";
import { PokemonTypeFilters } from "./PokemonTypeFilters";
import { PokemonColumnCreator } from "./PokemonColumnCreator";
import TypeFilterSelectionRender from "./TypeFilterSelectionRender";
import PokemonColumnRender from "./PokemonColumnRender";

export const PokemonListContainer = () => {
  const [type1Filters, setType1Filters] = useState<string[]>(["Any"]);
  const [type2Filters, setType2Filters] = useState<string[]>(["Any"]);
  const [type1Filter, setType1Filter] = useState<string>("Any");
  const [type2Filter, setType2Filter] = useState<string>("Any");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);
  const [pokemonColumns, setPokemonColumns] = useState<Pokemon[][]>([]);

  useEffect(() => {
    // when component mounts, set the current list of caught pokemon to state
    let data: string | null = window.localStorage.getItem("CaughtPokemonList");
    let caughtPokemonLocalStorage: number[];
    if (data != null) {
      caughtPokemonLocalStorage = JSON.parse(data);
      setCaughtPokemon(caughtPokemonLocalStorage);
    }
    // when component mounts, collect all the type1 and type2 filters from pokemonData
    PokemonTypeFilters(setType1Filters, setType2Filters);
  }, []);

  useEffect(() => {
    // when caught pokemon list updates, update localstorage
    window.localStorage.setItem(
      "CaughtPokemonList",
      JSON.stringify(caughtPokemon)
    );
  }, [caughtPokemon]);

  useEffect(() => {
    // update Pokemon columns when caughtPokemon list, type1Filter, type2Filter or searchFilter update
    PokemonColumnCreator(
      searchFilter,
      type1Filter,
      type2Filter,
      setPokemonColumns
    );
  }, [type1Filter, type2Filter, searchFilter, caughtPokemon]);

  return (
    <>
      <TypeFilterSelectionRender
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        type1Filter={type1Filter}
        setType1Filter={setType1Filter}
        type1Filters={type1Filters}
        type2Filter={type2Filter}
        type2Filters={type2Filters}
        setType2Filter={setType2Filter}
        caughtPokemon={caughtPokemon}
      />
      <PokemonColumnRender
        pokemonColumns={pokemonColumns}
        caughtPokemon={caughtPokemon}
        setCaughtPokemon={setCaughtPokemon}
      />
    </>
  );
};
