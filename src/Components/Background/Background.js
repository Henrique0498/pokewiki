import React from "react";
import styles from "./Background.module.css";
import Pokebola from "./../../Forms/Pokebola/Pokebola";
import { UserContext } from "../../UseContext";

const Background = ({ reference }) => {
  const { updateBackground } = React.useContext(UserContext);
  const theme = window.localStorage.getItem("darkTheme");
  const [pokebolas, setPokebolas] = React.useState([]);
  const [height, setHeight] = React.useState();

  const getIndex = React.useCallback(() => {
    return pokebolas.length;
  }, [pokebolas.length]);

  React.useEffect(() => {
    if (reference) {
      const widthPage = reference.current.clientWidth;
      const heightPage = reference.current.clientHeight;
      const index = getIndex();
      const sizePage = parseInt((heightPage / 160) * (widthPage / 160) * 0.5);
      setHeight(reference.current.clientHeight + 100);
      console.log();

      for (let i = index; i <= sizePage; i++) {
        setPokebolas((pokebolas) => [...pokebolas, <Pokebola key={i} />]);
      }
    }
  }, [reference, updateBackground, getIndex]);

  if (reference.current) {
    return (
      <div
        className={`${styles.fundo} ${theme ? styles.darkTheme : ""}`}
        style={{ maxHeight: `${height}px` }}
      >
        <div className={styles.pokebolas}>
          {pokebolas.map((pokebola) => pokebola)}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Background;
