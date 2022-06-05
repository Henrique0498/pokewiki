import React from "react";
import { UserContext } from "../../UseContext";
import styles from "./Loading.module.css";

const Loading = () => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("loading");
  }, [setUpdateBackground]);

  return (
    <section className={styles.section}>
      <div className={styles.cardLoad}>
        <div className={styles.frames}>
          <span className={styles.frameOne}></span>
          <span className={styles.frameTwo}></span>
          <span className={styles.frameThree}></span>
          <span className={styles.frameFour}></span>
        </div>
        <p className={styles.textLoad}>Carregando</p>
      </div>
    </section>
  );
};

export default Loading;
