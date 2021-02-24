import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List/List";
import Detail from "./Detail/Detail";
// import styles from "./Berry.module.css";

const Berry = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/*" element={<Detail />} />
    </Routes>
  );
};

export default Berry;
