import React from "react";
import PokeNoPhoto from "./../../Assets/Image/Images/pokeNoPhoto.png";
import useText from "../../Hooks/useText";
import styles from "./ImageItems.module.css";

const ImageItems = (dados) => {
  const { textTransform } = useText();
  const {
    photoDefault,
    photoOfficial,
    photoSVG,
    name,
    baby,
    legendary,
    mythical,
  } = dados;

  return (
    <div>
      <div
        className={`${styles.imgPoke} ${
          baby
            ? styles.backgroundBaby
            : legendary
            ? styles.backgroundLegendary
            : mythical
            ? styles.backgroundMythical
            : styles.backgroundDefault
        }`}
      >
        {photoDefault ? (
          <img
            src={photoOfficial ? photoOfficial : photoDefault}
            srcSet={photoSVG}
            alt={`Foto do Pokemon ${name}`}
            draggable="false"
          />
        ) : (
          <img
            src={PokeNoPhoto}
            alt="Não temos foto desse pokemon ainda."
            draggable="false"
          />
        )}
      </div>
      <div className={styles.nameContent}>
        <h2
          className={`${styles.namePoke}
            ${
              baby
                ? styles.nameBaby
                : legendary
                ? styles.nameLegendary
                : mythical
                ? styles.nameMythical
                : ""
            }`}
        >
          {textTransform(name, "replace")}
        </h2>
        <div
          className={styles.nameIcon}
          style={
            mythical
              ? {
                  backgroundImage: `url("${photoDefault}")`,
                }
              : { background: "" }
          }
        ></div>
      </div>
    </div>
  );
};

export default ImageItems;
