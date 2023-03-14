import { useState, useEffect } from "react";
import { pokemonData } from "./data/pokemon";
import { Pokemon } from "./models/model";
import PokeBallIcon from "./PokeBallIcon";
import CaughtPokeBallIcon from "./CaughtPokeBall";
import { PokemonTypeFilters } from "./PokemonTypeFilters";
import TypeIconRender from "./TypeIconRender";
import { PokemonColumnCreator } from "./PokemonColumnCreator";
import TypeFilterSelectionRender from "./TypeFilterSelectionRender";

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
    // when caught pokemon list updates, update localstorage
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

      <div className="grid grid-flow-col ">
        {pokemonColumns.map((col, index) => {
          let CaughtClass: string;
          let PokeballCaughtClass: string;
          let PokeballNotCaughtClass: string;
          return (
            <div className="mx-5" key={index}>
              {col.map((data) => {
                if (caughtPokemon.indexOf(data.dex_number) === -1) {
                  CaughtClass = "mb-10 components card flex justify-center";
                  PokeballCaughtClass = "invisible mb-2";
                  PokeballNotCaughtClass = "flex justify-center";
                } else {
                  CaughtClass = "mb-10 components card caught flex justify-center";
                  PokeballCaughtClass = "flex justify-center mb-2";
                  PokeballNotCaughtClass = "collapse";
                }
                return (
                  <div key={data.dex_number} className={CaughtClass}>
                    <div>
                      <div
                        onClick={(e) => {
                          {
                            setCaughtPokemon([
                              ...caughtPokemon,
                              data.dex_number,
                            ]);
                          }
                        }}
                        className={PokeballNotCaughtClass}
                      >
                        <PokeBallIcon/>
                      </div>
                      <div
                        onClick={(e) => {
                          {
                            setCaughtPokemon(
                              caughtPokemon.filter((a) => a != data.dex_number)
                            );
                          }
                        }}
                        className={PokeballCaughtClass}
                      >
                        <CaughtPokeBallIcon />
                      </div>
                      <div className="text-center">
                        <strong>
                          <p> {data.name}</p>
                          <p># {data.dex_number}</p>
                        </strong>
                        <img src={data.image_url} alt="..." />
                      </div>
                      <TypeIconRender
                        type1Icon={data.type_1}
                        type2Icon={data.type_2}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
