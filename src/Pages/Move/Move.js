import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../UseContext";
import List from "./List/List";
import Detail from "./Detail/Detail";

const Move = () => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("berry");
  }, [setUpdateBackground]);

  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};

export default Move;
