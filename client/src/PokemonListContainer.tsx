import { useState, useEffect } from "react";
import { pokemonData } from "./data/pokemon";
import { Pokemon } from "./models/model";
import PokeBallIcon from "./PokeBallIcon";
import CaughtPokeBallIcon from "./CaughtPokeBall";
import { PokemonTypeFilters } from "./PokemonTypeFilters";
import TypeIconRender from "./TypeIconRender";
import { PokemonColumnCreator } from "./PokemonColumnCreator";

type Props = {};
let caughtPokemonPreState: number[] = [];
let CaughtClass: string;
let PokeballCaughtClass: string;
let PokeballNotCaughtClass: string;
let data: string | null = window.localStorage.getItem("CaughtPokemonList");
if (data != null) {
  caughtPokemonPreState = JSON.parse(data);
}

export const PokemonListContainer = (props: Props) => {
  const [type1Filters, setType1Filters] = useState<string[]>(["Any"]);
  const [type2Filters, setType2Filters] = useState<string[]>(["Any"]);
  const [type1Filter, setType1Filter] = useState<string>("Any");
  const [type2Filter, setType2Filter] = useState<string>("Any");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);
  const [removedPokemon, setremovedPokemon] = useState<boolean>(false);
  const [pokemonColumns, setPokemonColumns] = useState<Pokemon[][]>([]);

  useEffect(() => {
    // when component mounts, set the current list of caught pokemon to state
    setCaughtPokemon(caughtPokemonPreState);
    // when component mounts, collect all the type1 and type2 filters from pokemonData
    PokemonTypeFilters(setType1Filters, setType2Filters);
  }, []);

  useEffect(() => {
    // when caught pokemon list updates, update localstorage
    window.localStorage.setItem(
      "CaughtPokemonList",
      JSON.stringify(caughtPokemon)
    );
  }, [caughtPokemon, removedPokemon]);

  useEffect(() => {
    PokemonColumnCreator(searchFilter, type1Filter, type2Filter, setPokemonColumns)
    setremovedPokemon(false);
  }, [type1Filter, type2Filter, searchFilter, removedPokemon]);

  return (
    <>
      <div>
        <div className="mb-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pokemon-list-filter"
            >
              Filter By Name or PokeDex Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pokemon-list-filter"
              type="text"
              placeholder="Enter name or PokeDex Number..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pokemon-list-filter"
            >
              Type 1 Filter:
            </label>
            <select
              value={type1Filter}
              onChange={(e) => setType1Filter(e.target.value)}
              id="type1Filter"
            >
              {type1Filters.map((t1Filter, index) => {
                return (
                  <option key={index} value={t1Filter}>
                    {t1Filter}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pokemon-list-filter"
            >
              Type 2 Filter:
            </label>
            <select
              value={type2Filter}
              onChange={(e) => setType2Filter(e.target.value)}
              id="type2Filter"
            >
              {type2Filters.map((t2Filter, index) => {
                return (
                  <option key={index} value={t2Filter}>
                    {t2Filter}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <p>
          You have caught <strong>{caughtPokemon.length}</strong> out of{" "}
          <strong>{pokemonData.length}</strong>, or{" "}
          <strong>
            ~{Math.floor((caughtPokemon.length / pokemonData.length) * 100)}%
          </strong>
        </p>
      </div>

      <div className="grid grid-flow-col 	">
        {pokemonColumns.map((col, index) => {
          return (
            <div className="mx-5" key={index}>
              {col.map((data) => {
                if (caughtPokemon.indexOf(data.dex_number) === -1) {
                  CaughtClass = "mb-10 components card";
                  PokeballCaughtClass = "invisible";
                  PokeballNotCaughtClass = "";
                } else {
                  CaughtClass = "mb-10 components card caught";
                  PokeballCaughtClass = "";
                  PokeballNotCaughtClass = "invisible";
                }

                return (
                  <div key={data.dex_number} className={CaughtClass}>
                    <strong>
                      <p> {data.name}</p>
                      <p># {data.dex_number}</p>
                    </strong>
                    <img src={data.image_url} alt="..." />

                    <div
                      onClick={(e) => {
                        {
                          setCaughtPokemon([...caughtPokemon,data.dex_number])
                        }
                      }}
                      className={PokeballNotCaughtClass}
                    >
                      <PokeBallIcon />
                    </div>

                    <div
                      onClick={(e) => {
                        {
                          setCaughtPokemon(caughtPokemon.filter(a => a != data.dex_number))
                        }
                      }}
                      className={PokeballCaughtClass}
                    >
                      <CaughtPokeBallIcon />
                    </div>
                    <TypeIconRender
                      type1Icon={data.type_1}
                      type2Icon={data.type_2}
                    />
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
