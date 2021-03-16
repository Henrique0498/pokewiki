import React from "react";
import styles from "./Image.module.css";

const Image = ({ alt, ...pros }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    setSkeleton(false);
    target.style.opacity = 1;
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} alt={alt} {...pros} className={styles.img} />
    </div>
  );
};
export default Image;
