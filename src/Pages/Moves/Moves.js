import React from "react";
import { UserContext } from "../../UseContext";
// import styles from "./Moves.module.css";

const Moves = () => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("move");
  });
  return <div>movimentos</div>;
};

export default Moves;
