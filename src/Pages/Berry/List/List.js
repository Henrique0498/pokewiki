import React from "react";
import Table from "../../../Components/Table/Table";
import Search from "../../../Components/Search/Search/Search";
import styles from "./List.module.css";

const List = () => {
  const reference = React.useRef();
  const data = {
    mobileTable: true,
    pageRedirection: "berry",
    headers: ["ID", "Nome da berry", "Tipo", "Foto"],
    body: [
      [
        0,
        "teste-0",
        "tipo-0",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        1,
        "teste-1",
        "tipo-1",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        2,
        "teste-2",
        "tipo-2",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        3,
        "teste-3",
        "tipo-3",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        4,
        "teste-4",
        "tipo-4",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        5,
        "teste-5",
        "tipo-5",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        6,
        "teste-6",
        "tipo-6",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        7,
        "teste-7",
        "tipo-7",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        8,
        "teste-8",
        "tipo-8",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        9,
        "teste-9",
        "tipo-9",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        10,
        "teste-10",
        "tipo-10",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        11,
        "teste-11",
        "tipo-11",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        12,
        "teste-12",
        "tipo-12",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        13,
        "teste-13",
        "tipo-13",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        14,
        "teste-14",
        "tipo-14",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        15,
        "teste-15",
        "tipo-15",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        16,
        "teste-16",
        "tipo-16",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        17,
        "teste-17",
        "tipo-17",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        18,
        "teste-18",
        "tipo-18",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        19,
        "teste-19",
        "tipo-19",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        20,
        "teste-20",
        "tipo-20",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        21,
        "teste-21",
        "tipo-21",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        22,
        "teste-22",
        "tipo-22",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        23,
        "teste-23",
        "tipo-23",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        24,
        "teste-24",
        "tipo-24",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        25,
        "teste-25",
        "tipo-25",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
      [
        26,
        "teste-26",
        "tipo-26",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      ],
    ],
  };

  return (
    <section className={`animeLeft`}>
      <Search />
      <div className={styles.card} ref={reference}>
        <Table data={data} />
      </div>
    </section>
  );
};

export default List;
