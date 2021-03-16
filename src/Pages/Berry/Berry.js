import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List/List";
import Detail from "./Detail/Detail";
import { UserContext } from "../../UseContext";

const Berry = () => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("berry");
  });
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};

export default Berry;
