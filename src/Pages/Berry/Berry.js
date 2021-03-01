import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List/List";
import Detail from "./Detail/Detail";
import { UserContext } from "../../UseContext";

const Berry = ({ setUpdate }) => {
  const { setUpdateBackground } = React.useContext(UserContext);

  React.useEffect(() => {
    setUpdateBackground("berry");
  });
  return (
    <Routes>
      <Route path="/" element={<List setUpdate={setUpdate} />} />
      <Route path="/*" element={<Detail />} />
    </Routes>
  );
};

export default Berry;
