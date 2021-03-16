import React from "react";
import Search from "../../../Components/Search/Search/Search";
import Table from "../../../Components/Table/Table";
import Loading from "../../../Helper/Loading/Loading";
import NotFound from "../../../Helper/NotFound/NotFound";
import useFetch from "../../../Hooks/useFetch";
import { ITEMS_GET } from "../../../Services/api";
import styles from "./List.module.css";

const Items = () => {
  const { error, request } = useFetch();
  const [loadPage, setLoadPage] = React.useState(true);
  const [dataBase, setDataBase] = React.useState(null);

  React.useEffect(() => {
    async function getListBerry() {
      let data = [];

      const { url, options } = ITEMS_GET();
      const { json, response } = await request(url, options);

      if (response && response.ok) {
        json.results.forEach((element, index) => {
          data.push([
            index,
            element.name,
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${element.name}.png`,
          ]);
        });

        setDataBase({
          mobileTable: false,
          pageRedirection: "item",
          localStorage: "ItemsList",
          headers: ["ID", "Nome da berry", "Foto"],
          body: data,
        });
        setLoadPage(false);
      }
    }
    getListBerry();
  }, [request]);

  if (error) {
    return <NotFound text={"Não foi possível encontrar essa lista."} />;
  } else if (loadPage) {
    return <Loading />;
  } else if (dataBase) {
    return (
      <section className={`animeLeft`}>
        <Search />
        <div className={styles.card}>
          <Table data={dataBase} />
        </div>
      </section>
    );
  }
};

export default Items;
