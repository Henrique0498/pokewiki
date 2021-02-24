import React from "react";
import { Link } from "react-router-dom";
import useText from "../../../Hooks/useText";
import styles from "./Options.module.css";

const Options = ({ focus, options }) => {
  const { textTransform } = useText();

  return (
    <ul className={`${styles.divList} ${!focus ? styles.dNone : ""}`}>
      {options.length > 0 ? (
        options.map(({ name }) => (
          <li key={name}>
            <Link to={`/pokemon/${name}`}>
              {textTransform(name, "replace")}
            </Link>
          </li>
        ))
      ) : (
        <li className={styles.notFound}>Nada encontrado.</li>
      )}
    </ul>
  );
};

export default Options;
