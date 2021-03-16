import React from "react";
import Search from "../../Components/Search/Search/Search";
import { UserContext } from "../../UseContext";
import styles from "./NotFound.module.css";

const NotFound = ({ text }) => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("not-found");
  }, [setUpdateBackground]);

  return (
    <section className={`animeLeft`}>
      <Search />
      <div className={styles.card}>
        <div>
          <p className={styles.text}>Error</p>
          <p className={styles.text404}>404</p>
          <p className={styles.textDescription}>{text}</p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
