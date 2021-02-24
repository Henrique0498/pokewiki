import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <section className={styles.section}>
      <div className={styles.pikachu}>
        <span className={styles.frameOne}></span>
        <span className={styles.frameTwo}></span>
        <span className={styles.frameThree}></span>
        <span className={styles.frameFour}></span>
      </div>
    </section>
  );
};

export default Loading;
