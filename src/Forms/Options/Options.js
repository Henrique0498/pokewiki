import React from "react";
import styles from "./Options.module.css";

const Options = ({ name, className }) => {
  return (
    <>
      <label className={className} key={name}>
        {name}
      </label>
      <input className={styles.selectopt} name={name} type="radio" id={name} />
    </>
  );
};

export default Options;
