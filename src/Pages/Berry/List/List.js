import React from "react";
import { BERRY_GET } from "../../../Services/api";
import Table from "../../../Components/Table/Table";
import Search from "../../../Components/Search/Search/Search";
import Loading from "../../../Helper/Loading/Loading";
import NotFound from "../../../Helper/NotFound/NotFound";
import styles from "./List.module.css";
import { UserContext } from "../../../UseContext";
import useFetch from "../../../Hooks/useFetch";

const List = () => {
  const { berryList } = React.useContext(UserContext);
  const { error, request } = useFetch();
  const [loadPage, setLoadPage] = React.useState(true);
  const [dataBase, setDataBase] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      let data = [];

      if (berryList) {
        berryList.map(async (berry, index) => {
          const { url, options } = BERRY_GET(`${berry.name}-berry`);
          const { response, json } = await request(url, options);

          if (response && response.ok) {
            data.push([index, json.name, json.sprites.default]);
          }

          if (berryList.length === data.length) {
            setDataBase({
              mobileTable: false,
              pageRedirection: "berry",
              localStorage: "BerryList",
              headers: ["ID", "Nome da berry", "Foto"],
              body: data,
            });
            setLoadPage(false);
          }
        });
      }
    }
    getData();
  }, [berryList, request]);

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
  } else {
    return null;
  }
};

export default List;
