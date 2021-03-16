import React from "react";
import { useParams } from "react-router-dom";
import Search from "../../../Components/Search/Search/Search";
import Table from "../../../Components/Table/Table";
import Types from "../../../Forms/Types/Types";
import Loading from "../../../Helper/Loading/Loading";
import NotFound from "../../../Helper/NotFound/NotFound";
import useFetch from "../../../Hooks/useFetch";
import useText from "../../../Hooks/useText";
import { MOVE_GET } from "../../../Services/api";
import { UserContext } from "../../../UseContext";
import styles from "./Detail.module.css";

const Detail = () => {
  const { setUpdateBackground } = React.useContext(UserContext);
  const { error, request } = useFetch();
  const { id } = useParams();
  const [loadPage, setLoadPage] = React.useState(true);
  const [dataBase, setDataBase] = React.useState(null);
  const [dataTable, setDataTable] = React.useState(null);
  const { textTransform, getText } = useText();

  React.useEffect(() => {
    async function getData() {
      let data = [];
      if (id) {
        const { url, options } = MOVE_GET(id);
        const { response, json } = await request(url, options);

        if (response && response.ok) {
          json.learned_by_pokemon.forEach((pokemon, index) => {
            const result = pokemon.url.split("/");

            data.push([
              index,
              pokemon.name,
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                result[result.length - 2]
              }.png`,
            ]);
          });

          setDataTable({
            mobileTable: false,
            pageRedirection: "pokemon",
            localStorage: "MoveList",
            headers: ["ID", "Nome do pokemon", "Foto"],
            body: data,
          });

          setDataBase(json);
          setUpdateBackground("move-profile");
        }

        setLoadPage(false);
      }
    }
    getData();
  }, [id, request, setUpdateBackground, textTransform]);

  if (error) {
    return <NotFound text={"Não foi possível encontrar essa berry."} />;
  } else if (loadPage) {
    return <Loading />;
  } else if (dataBase) {
    return (
      <section>
        <Search />
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.nameMove}>
              {textTransform(dataBase.name, "replace")}
            </h1>
          </div>

          <div className={styles.body}>
            <div className={`${styles.container} ${styles.containerType}`}>
              <h4 className={styles.titleContainer}>Tipo</h4>
              <div className={styles.containerBody}>
                {dataBase.type ? (
                  <div className={styles.type}>
                    <Types type={dataBase.type.name} />
                    <p>{textTransform(dataBase.type.name, "translate")}</p>
                  </div>
                ) : (
                  <p className={styles.contentNotFound}>
                    Essa berry não está em uma categoria.
                  </p>
                )}
              </div>
            </div>

            <div className={`${styles.container} ${styles.containerEffect}`}>
              <h4 className={styles.titleContainer}>Efeito</h4>

              <div className={styles.containerBody}>
                <p className={styles.contentNotFound}>
                  {getText(dataBase.name)
                    ? getText(dataBase.name)
                    : "Não possui nenhum efeito."}
                </p>
              </div>
            </div>

            <div className={`${styles.container} ${styles.containerHeldItems}`}>
              <h4 className={styles.titleContainer}>
                Pokemons que retem o item
              </h4>

              <div className={styles.containerBody}>
                {dataBase.learned_by_pokemon.length > 0 ? (
                  <Table data={dataTable} />
                ) : (
                  <p>Nenhum pokemon aprende esse item.</p>
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
