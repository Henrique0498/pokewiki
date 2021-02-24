import React from "react";
import Background from "../../../Components/Background/Background";
import Table from "../../../Components/Table/Table";
import Search from "../../../Components/Search/Search/Search";
import styles from "./List.module.css";

const List = () => {
  const reference = React.useRef();
  const date = {
    mobileTable: true,
    headers: ["ID", "Nome da berry", "Tipo", "Foto"],
    body: [
      [0, "teste 0", "tipo 0", "foto 0"],
      [1, "teste 1", "tipo 1", "foto 1"],
      [2, "teste 2", "tipo 2", "foto 2"],
      [3, "teste 3", "tipo 3", "foto 3"],
      [4, "teste 4", "tipo 4", "foto 4"],
      [5, "teste 5", "tipo 5", "foto 5"],
      [6, "teste 6", "tipo 6", "foto 6"],
      [7, "teste 7", "tipo 7", "foto 7"],
      [8, "teste 8", "tipo 8", "foto 8"],
      [9, "teste 9", "tipo 9", "foto 9"],
      [10, "teste 10", "tipo 10", "foto 10"],
      [11, "teste 11", "tipo 11", "foto 11"],
      [12, "teste 12", "tipo 12", "foto 12"],
      [13, "teste 13", "tipo 13", "foto 13"],
      [14, "teste 14", "tipo 14", "foto 14"],
      [15, "teste 15", "tipo 15", "foto 15"],
      [16, "teste 16", "tipo 16", "foto 16"],
      [17, "teste 17", "tipo 17", "foto 17"],
      [18, "teste 18", "tipo 18", "foto 18"],
      [19, "teste 19", "tipo 19", "foto 19"],
      [20, "teste 20", "tipo 20", "foto 20"],
      [21, "teste 21", "tipo 21", "foto 21"],
      [22, "teste 22", "tipo 22", "foto 22"],
      [23, "teste 23", "tipo 23", "foto 23"],
      [24, "teste 24", "tipo 24", "foto 24"],
      [25, "teste 25", "tipo 25", "foto 25"],
      [26, "teste 26", "tipo 26", "foto 26"],
    ],
  };

  return (
    <section ref={reference} className={`animeLeft`}>
      <Background reference={reference} />
      <Search />
      <div className={styles.card}>
        <Table date={date} />
      </div>
    </section>
  );
};

export default List;
