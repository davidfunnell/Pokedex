import React from "react";
import { useState, useEffect } from "react";
import { pokemonData } from "./data/pokemon";
import { Pokemon } from "./models/model";
import styles1 from "./styles/pokemon-types.module.css";
import styles2 from "./index.css";
import PokeBallIcon from "./PokeBallIcon";
import CaughtPokeBallIcon from "./CaughtPokeBall";

type Props = {};
let pokemon: Pokemon;
const data: string | null = window.localStorage.getItem("CaughtPokemonList");
let caughtPokemonPreState: [number] | null = JSON.parse(data);

export const PokemonListContainer = (props: Props) => {
  const [type1Filters, setType1Filters] = useState<[string]>(["Any"]);
  const [type2Filters, setType2Filters] = useState<[string | null]>(["Any"]);
  const [type1Filter, setType1Filter] = useState<string>("Any");
  const [type2Filter, setType2Filter] = useState<string>("Any");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);
  const [removedPokemon, setremovedPokemon] = useState<boolean>(false);
  const [pokemonColumns, setPokemonColumns] = useState<Pokemon[][]>([
    [],
    [],
    [],
  ]);

  useEffect(() => {
    setCaughtPokemon(caughtPokemonPreState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "CaughtPokemonList",
      JSON.stringify(caughtPokemon)
    );
  }, [caughtPokemon, removedPokemon]);

  useEffect(() => {
    let filterType1: [string] = ["Any"];
    let filterType2: [string | null] = ["Any"];

    for (pokemon of pokemonData) {
      if (filterType1.indexOf(pokemon.type_1) === -1) {
        filterType1.push(pokemon.type_1);
      }
      if (pokemon.type_2 === null && filterType2.indexOf("None") === -1) {
        filterType2.push("None");
      }
      if (
        pokemon.type_2 != null &&
        filterType2.indexOf(pokemon.type_2) === -1
      ) {
        filterType2.push(pokemon.type_2);
      }
    }
    setType1Filters(filterType1);
    setType2Filters(filterType2);

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
    setremovedPokemon(false);
    setPokemonColumns(columns);
  }, [type1Filter, type2Filter, searchFilter, removedPokemon]);

  let CaughtClass: string = "mb-10 components card caught";
  let PokeballCaughtClass: string = "";
  let PokeballNotCaughtClass: string = "";

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
                    <h5> {data.name}</h5>
                    <p># {data.dex_number}</p>
                    <img src={data.image_url} alt="..." />

                    <div
                      onClick={(e) => {
                        {
                          caughtPokemonPreState.push(data.dex_number),
                            setCaughtPokemon(caughtPokemonPreState),
                            setremovedPokemon(true);
                        }
                      }}
                      className={PokeballNotCaughtClass}
                    >
                      <PokeBallIcon />
                    </div>

                    <div
                      onClick={(e) => {
                        {
                          caughtPokemonPreState = caughtPokemonPreState.filter(
                            (e, i) => e !== data.dex_number
                          );
                          setCaughtPokemon(caughtPokemonPreState);
                        }
                      }}
                      className={PokeballCaughtClass}
                    >
                      <CaughtPokeBallIcon />
                    </div>

                    <div
                      className={`${styles1["type-icon"]} ${
                        styles1[data.type_1]
                      }`}
                    ></div>

                    <div
                      className={`${styles1["type-icon"]} ${
                        styles1[data.type_2]
                      }`}
                    ></div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* <div>
        {pokemonData.map((data, index) => {
          return (
            <div key={index} className="card mb-3 shadow">
              <h5 className="font_color"> {data.name}</h5>
              <p># {data.dex_number}</p>
              <img src={data.image_url} alt="..." />
              <div
                className={`${styles1["type-icon"]} ${styles1[data.type_1]}`}
              ></div>
              <div
                className={`${styles1["type-icon"]} ${styles1[data.type_2]}`}
              ></div>
            </div>
          );
        })}
      </div> */}
    </>
  );
};
