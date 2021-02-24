import React from "react";
import { Link } from "react-router-dom";
import { POKEMON_GET } from "../../Services/api";
import useFetch from "../../Hooks/useFetch";
import useMedia from "../../Hooks/useMedia";
import Error from "../../Helper/Error/Error";
import Loading from "../../Helper/Loading/Loading";
import LoadingItems from "../../Helper/LoadingItems/LoadingItems";
import NoResults from "../../Helper/NoResults/NoResults";
import Background from "../../Components/Background/Background";
import Search from "../../Components/Search/Search/Search";
import Types from "../../Forms/Types/Types";

import noPhoto from "./../../Assets/Image/Images/no-photo.jpg";
import styles from "./Home.module.css";

const Home = () => {
  const reference = React.useRef();
  const [loadPage, setLoadPage] = React.useState(true);
  const [loadItems, setLoadItems] = React.useState(false);
  const { error, request } = useFetch();
  const [results, setResults] = React.useState([]);
  const [page, setPage] = React.useState([0, 20]);
  const mobile = useMedia("(min-width: 375px)");
  const [infinite, setInfinite] = React.useState(true);

  const getPage = React.useCallback(() => {
    let index = page[0] * 20 + 1;
    let indexMax = page[1];

    return { index, indexMax };
  }, [page]);

  React.useEffect(() => {
    async function getData() {
      const { index, indexMax } = getPage();
      let data = [];
      setLoadItems(true);

      for (let i = index; i <= indexMax; i++) {
        if (i <= 893) {
          const { url, options } = POKEMON_GET(i);
          const { response, json } = await request(url, options);

          if (response && response.ok) {
            data = [...data, json];
          }
        }
      }

      setResults((result) => [...result, ...data]);
      setLoadPage(false);
      setLoadItems(false);

      if (data.length < 19) {
        setInfinite(false);
      }
    }
    getData();
  }, [getPage, request]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite && !loadItems && !loadPage) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * 0.9 && !wait) {
          wait = true;
          setPage((page) => [page[0] + 1, page[1] + 20]);
          setTimeout(() => {
            wait = false;
          }, 1000);
        }
      }
    }

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite, loadItems, loadPage]);

  if (error) {
    return <Error error={error} />;
  } else if (loadPage) {
    return <Loading />;
  } else if (results) {
    return (
      <section ref={reference} className={`${styles.body} animeLeft`}>
        <Background reference={reference} actualization={loadItems} />
        <Search width="100%" height="´" />
        <div className={styles.main}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableColumns}>
                <th>ID</th>
                <th className={styles.TextLeft}>Nome do Pokemon</th>
                {mobile && <th>Tipo</th>}
                <th>Foto</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {results.map(({ name, id, sprites, types }, i) => (
                <tr key={i} className={styles.tableColumns}>
                  <td>
                    <Link to={`/pokemon/${name}`}>{id}</Link>
                  </td>
                  <td>
                    <Link to={`/pokemon/${name}`} className={styles.TextLeft}>
                      {name}
                    </Link>
                  </td>
                  {mobile && (
                    <td>
                      <Link to={`/pokemon/${name}`}>
                        {types.map(({ type }) => (
                          <Types key={type.name} type={type.name} />
                        ))}
                      </Link>
                    </td>
                  )}
                  <td>
                    <Link to={`/pokemon/${name}`}>
                      {sprites.front_default ? (
                        <img src={sprites.front_default} alt={name} />
                      ) : (
                        <img src={noPhoto} alt="Pokemon sem foto" />
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loadItems && <LoadingItems />}
        {!infinite && <NoResults />}
      </section>
    );
  } else {
    return null;
  }
};

export default Home;
