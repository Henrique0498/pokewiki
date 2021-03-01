import React from "react";
import Search from "../../../Components/Search/Search/Search";
import Background from "./../../../Components/Background/Background";
import useFetch from "../../../Hooks/useFetch";
import { POKEMON_GET, SPECIE_POKEMON_GET } from "../../../Services/api";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as PokeNoPhotoVar } from "./../../../Assets/Image/Svg/notfound/pokeNoPhoto.svg";
import Error from "../../../Helper/Error/Error";
import Loading from "../../../Helper/Loading/Loading";
import Types from "../../../Forms/Types/Types";
import styles from "./Pokemon.module.css";
import PokemonMovesTable from "./../PokemonMovesTable/PokemonMovesTable";
import useText from "../../../Hooks/useText";
import ImageItems from "../../../Forms/ImageItems/ImageItems";
import { UserContext } from "../../../UseContext";

const Pokemon = () => {
  const { setUpdateBackground } = React.useContext(UserContext);
  const reference = React.useRef();
  const [pokemon, setPokemon] = React.useState(null);
  const [pokemonEvolution, setPokemonEvolution] = React.useState([]);
  const [loadPage, setLoadPage] = React.useState(true);
  const { error, request } = useFetch();
  const { id } = useParams();
  const { textTransform } = useText();

  React.useEffect(() => {
    setUpdateBackground("pokemon");

    async function getPokemon() {
      let resultPoke = [];
      let resultPokeEvolution = [];
      let pokemons = [];
      let response = [];
      let json = [];
      setLoadPage(true);

      {
        const { url, options } = POKEMON_GET(id);
        resultPoke = await (await request(url, options)).json;
      }

      const { url, options } = SPECIE_POKEMON_GET(id);
      response = await fetch(url, options);

      if (response.ok) {
        json = await response.json();

        if (json.evolution_chain && json.evolution_chain.url) {
          const evolutionResponse = await fetch(json.evolution_chain.url);
          const evolutionJson = await evolutionResponse.json();

          pokemons.push(evolutionJson.chain.species.name);
          if (evolutionJson.chain.evolves_to[0]) {
            pokemons.push(evolutionJson.chain.evolves_to[0].species.name);

            if (evolutionJson.chain.evolves_to[0].evolves_to[0]) {
              pokemons.push(
                evolutionJson.chain.evolves_to[0].evolves_to[0].species.name
              );
            }
          }
        }
      }

      for (let i = 0; i <= pokemons.length - 1; i++) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`
        );
        let json = await response.json();
        resultPokeEvolution.push(json);
      }

      for (let i = 0; i <= resultPoke.held_items.length - 1; i++) {
        if (resultPoke.held_items[i].item.name.indexOf("berry") !== -1) {
          resultPoke.held_items[
            i
          ].item.link = `/berry/${resultPoke.held_items[i].item.name}`;
        } else {
          resultPoke.held_items[
            i
          ].item.link = `/items/${resultPoke.held_items[i].item.name}`;
        }
      }

      setPokemonEvolution(resultPokeEvolution);
      setPokemon({ ...resultPoke, ...json });

      setLoadPage(false);
    }
    getPokemon();
  }, [id, request, setUpdateBackground]);

  if (error) {
    return <Error error={error} />;
  } else if (loadPage) {
    return <Loading />;
  } else if (pokemon) {
    return (
      <section ref={reference}>
        <Search estilo="heightSm" />
        <div className={styles.card}>
          <div className={styles.header}>
            <ImageItems
              photoDefault={pokemon.sprites.front_default}
              photoOfficial={
                pokemon.sprites.other[`official-artwork`].front_default
              }
              photoSVG={pokemon.sprites.other.dream_world.front_default}
              name={pokemon.name}
              baby={pokemon.is_baby}
              legendary={pokemon.is_legendary}
              mythical={pokemon.is_mythical}
            />
          </div>

          <div className={styles.body}>
            <div className={`${styles.containerSm} ${styles.types}`}>
              <h4 className={styles.titleContainer}>Tipos</h4>
              {pokemon.types[0].type ? (
                pokemon.types.map(({ type }) => (
                  <div
                    key={type.name}
                    className={`${styles.type} ${
                      pokemon.types.length === 1 ? styles.typeOne : ""
                    }`}
                  >
                    <Types type={type.name} />
                    <p className={styles.nameType}>
                      {textTransform(type.name, "translate")}
                    </p>
                  </div>
                ))
              ) : (
                <div className={styles.type}>
                  <p>Nenhum dado encontrado.</p>
                </div>
              )}
            </div>

            <div className={`${styles.containerSm} ${styles.abilities}`}>
              <h4 className={styles.titleContainer}>Habilidades</h4>
              <div className={styles.ability}>
                {pokemon.abilities[0] ? (
                  pokemon.abilities.map(({ ability }) => (
                    <p key={ability.name}>
                      <Link to={`/abilities/${ability.name}`}>
                        {textTransform(ability.name, "replace")}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p className={styles.ability}>Nenhum dado encontrado.</p>
                )}
              </div>
            </div>

            <div className={`${styles.containerSm} ${styles.itemHeld}`}>
              <h4 className={styles.titleContainer}>Itens</h4>
              <div className={styles.contentItem}>
                {pokemon.held_items[0] ? (
                  pokemon.held_items.map(({ item }) => (
                    <Link to={item.link}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                        alt="Foto do item"
                      />
                      <p>{textTransform(item.name, "replace")}</p>
                    </Link>
                  ))
                ) : (
                  <p>Esse pokemon não retém item</p>
                )}
              </div>
            </div>

            <div className={`${styles.containerSm} ${styles.variables}`}>
              <h4 className={styles.titleContainer}>Variações</h4>
              <div className={styles.variablesPhoto}>
                {pokemon.sprites.front_default ? (
                  <img
                    src={pokemon.sprites.front_default}
                    srcSet={pokemon.sprites.front_shiny}
                    alt={`Foto do Pokemon ${pokemon.name} shiny`}
                    draggable="false"
                  />
                ) : (
                  <PokeNoPhotoVar />
                )}
                <p>Shiny</p>
              </div>
              <div className={styles.variablesPhoto}>
                {pokemon.sprites.front_default ? (
                  <img
                    src={pokemon.sprites.front_default}
                    srcSet={pokemon.sprites.front_female}
                    alt={`Foto do Pokemon ${pokemon.name} fêmea`}
                    draggable="false"
                  />
                ) : (
                  <PokeNoPhotoVar />
                )}
                <p>Fêmea</p>
              </div>
            </div>

            <div className={`${styles.containerSm} ${styles.status}`}>
              <h4 className={styles.titleContainer}>Status</h4>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className={styles.stat}>
                  <i className={`${styles[stat.name]} ${styles.iconStat}`}></i>
                  <p>{base_stat}</p>
                </div>
              ))}
              <div className={styles.stat}>
                <i className={`${styles.sigma} ${styles.iconStat}`}></i>
                <p>
                  {pokemon.stats.reduce((before, after) => {
                    return (before += after.base_stat);
                  }, 0)}
                </p>
              </div>
            </div>

            <div className={`${styles.containerSm} ${styles.evolutions}`}>
              <h4 className={styles.titleContainer}>Evoluções</h4>
              <div
                className={`${styles.evolutionContainer} ${
                  pokemonEvolution.length === 1 ? styles.noResults : ""
                }`}
              >
                {pokemonEvolution.length > 1 ? (
                  pokemonEvolution.map(({ name, id }) => (
                    <Link to={`/pokemon/${name}`} key={id}>
                      <div className={styles.evolution}>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                          alt="Primeira evolução"
                          draggable="false"
                        />
                        <p>{textTransform(name, "replace")}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>Esse pokemon não contem evolução</p>
                )}
              </div>
            </div>

            <div className={`${styles.containerSm} ${styles.moves}`}>
              <h4 className={styles.titleContainer}>Movimentos</h4>
              <PokemonMovesTable move={pokemon.moves} />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Pokemon;
