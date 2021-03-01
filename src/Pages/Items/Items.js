import React from "react";
import { UserContext } from "../../UseContext";
// import styles from "./Items.module.css";

const Items = () => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("items");
  });
  return <div>items</div>;
};

export default Items;
