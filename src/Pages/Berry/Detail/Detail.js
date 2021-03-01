import React from "react";
import { UserContext } from "../../../UseContext";
// import styles from "./Berry.module.css";

const Detail = () => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("berry");
  });
  return <div>fruta</div>;
};

export default Detail;
