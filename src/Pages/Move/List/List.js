import React from "react";
import Search from "../../../Components/Search/Search/Search";
import Table from "../../../Components/Table/Table";
import Loading from "../../../Helper/Loading/Loading";
import NotFound from "../../../Helper/NotFound/NotFound";
import useFetch from "../../../Hooks/useFetch";
import { MOVES_GET } from "../../../Services/api";
import { UserContext } from "../../../UseContext";
import styles from "./List.module.css";

const List = () => {
  const { error, request } = useFetch();
  const [loadPage, setLoadPage] = React.useState(true);
  const [dataBase, setDataBase] = React.useState(null);
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    async function getListBerry() {
      let data = [];

      const { url, options } = MOVES_GET();
      const { json, response } = await request(url, options);

      if (response && response.ok) {
        json.results.forEach((element, index) => {
          data.push([index, element.name]);
        });

        setDataBase({
          mobileTable: false,
          pageRedirection: "move",
          localStorage: "MovesList",
          headers: ["ID", "Nome da berry"],
          body: data,
        });
        setLoadPage(false);
      }
    }
    getListBerry();
    setUpdateBackground("move-list");
  }, [request, setUpdateBackground]);

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

export default List;
