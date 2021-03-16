import React from "react";
import { Link, useParams } from "react-router-dom";
import Search from "../../../Components/Search/Search/Search";
import Image from "../../../Forms/Image/Image";
import ImageItems from "../../../Forms/ImageItems/ImageItems";
import Loading from "../../../Helper/Loading/Loading";
import NotFound from "../../../Helper/NotFound/NotFound";
import useFetch from "../../../Hooks/useFetch";
import useText from "../../../Hooks/useText";
import { BERRY_GET } from "../../../Services/api";
import { UserContext } from "../../../UseContext";
import styles from "./Detail.module.css";

const Detail = () => {
  const { setUpdateBackground } = React.useContext(UserContext);
  const { error, request } = useFetch();
  const { id } = useParams();
  const [loadPage, setLoadPage] = React.useState(true);
  const [dataBase, setDataBase] = React.useState(null);
  const { textTransform } = useText();
  const [urlImage, setUrlImage] = React.useState("");

  React.useEffect(() => {
    async function getData() {
      if (id) {
        const { url, options } = BERRY_GET(id);
        const { response, json } = await request(url, options);

        if (response && response.ok) {
          json.held_by_pokemon.forEach(({ pokemon }) => {
            const result = pokemon.url.split("/");
            pokemon.id = result[result.length - 2];
          });

          setDataBase(json);
          setUrlImage(
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
          );
        }

        setLoadPage(false);
      }
    }
    getData();
    setUpdateBackground("berry-profile");
  }, [id, request, setUpdateBackground, textTransform]);

  if (error) {
    return <NotFound text={"Não foi possível encontrar essa berry."} />;
  } else if (loadPage) {
    return <Loading />;
  } else if (dataBase) {
    return (
      <section>
        <Search estilo="heightSm" />
        <div className={styles.card}>
          <div className={styles.header}>
            <ImageItems
              photoDefault={dataBase.sprites.default}
              name={dataBase.name}
            />
          </div>
          <div className={styles.body}>
            <div className={`${styles.container} ${styles.containerCategory}`}>
              <h4 className={styles.titleContainer}>Categoria</h4>
              <div className={styles.contentText}>
                {dataBase.category ? (
                  <p>
                    {textTransform(
                      textTransform(dataBase.category.name, "replace"),
                      "translate"
                    )}
                  </p>
                ) : (
                  <p>Essa berry não está em uma categoria.</p>
                )}
              </div>
            </div>

            <div className={`${styles.container} ${styles.containerEffect}`}>
              <h4 className={styles.titleContainer}>Efeito</h4>

              <div className={styles.contentText}>
                <p>
                  {dataBase.effect_entries
                    ? textTransform(
                        dataBase.effect_entries[0].effect,
                        "translate"
                      )
                    : "Não possui nenhum efeito."}
                </p>
              </div>
            </div>

            <div className={`${styles.container} ${styles.containerHeldItems}`}>
              <h4 className={styles.titleContainer}>
                Pokemons que retem o item
              </h4>
              <div className={styles.pokemonsHeldContainer}>
                {dataBase.held_by_pokemon.length > 0 ? (
                  dataBase.held_by_pokemon.map(({ pokemon }, i) => (
                    <div key={i} className={styles.pokemonHeld}>
                      <Link to={`/pokemon/${pokemon.name}`}>
                        <Image
                          src={`${urlImage}${pokemon.id}.png`}
                          alt={textTransform(pokemon.name, "replace")}
                        />
                        <p>{textTransform(pokemon.name, "replace")}</p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>Nenhum pokemon retém esse item.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Detail;
