import { Pokemon } from "./models/model";
import TypeIconRender from "./TypeIconRender";
import CaughtPokeBallIcon from "./CaughtPokeBall";
import PokeBallIcon from "./PokeBallIcon";

interface Props {
  pokemonColumns: Pokemon[][];
  caughtPokemon: number[];
  setCaughtPokemon: React.Dispatch<React.SetStateAction<number[]>>;
}

const PokemonColumnRender: any = ({
  pokemonColumns,
  caughtPokemon,
  setCaughtPokemon,
}: Props) => {
  return (
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
                CaughtClass =
                  "mb-10 components card caught flex justify-center";
                PokeballCaughtClass = "flex justify-center mb-2";
                PokeballNotCaughtClass = "collapse";
              }
              return (
                <div key={data.dex_number} className={CaughtClass}>
                  <div>
                    <div
                      onClick={(e) => {
                        {
                          setCaughtPokemon([...caughtPokemon, data.dex_number]);
                        }
                      }}
                      className={PokeballNotCaughtClass}
                    >
                      <PokeBallIcon />
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
                      <img src={data.image_url} alt={`Picture of ${data.name}`} />
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
  );
};
export default PokemonColumnRender;
