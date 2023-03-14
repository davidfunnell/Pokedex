import { pokemonData } from "./data/pokemon";

interface Props {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  searchFilter: string;
  setType1Filter: React.Dispatch<React.SetStateAction<string>>;
  type1Filter: string;
  type1Filters: string[];
  setType2Filter: React.Dispatch<React.SetStateAction<string>>;
  type2Filter: string;
  type2Filters: string[];
  caughtPokemon: number[];
}

const TypeFilterSelectionRender: any = ({
  searchFilter,
  setSearchFilter,
  type1Filter,
  setType1Filter,
  type1Filters,
  type2Filter,
  type2Filters,
  setType2Filter,
  caughtPokemon,
}: Props) => {
  return (
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
            className="block text-gray-700 text-sm font-bold my-2"
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
            className="block text-gray-700 text-sm font-bold my-2"
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
  );
};
export default TypeFilterSelectionRender;
