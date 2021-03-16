import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
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
