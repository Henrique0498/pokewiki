import React from "react";
import styles from "./NoResults.module.css";

const NoResults = () => {
  return (
    <div className={styles.body}>
      <p className={styles.text}>
        Sem resultados. <span> Você chegou ao final!</span>
      </p>
      <i className={styles.icon}></i>
    </div>
  );
};

export default NoResults;
