import React from "react";
import { GENERATION_GET } from "../../../Services/api";
import useFetch from "../../../Hooks/useFetch";
import styles from "./PokemonMovesTable.module.css";
import FilterList from "../../../Forms/FilterList/FilterList";
import useText from "../../../Hooks/useText";
import { Link, useLocation } from "react-router-dom";

const PokemonMovesTable = (data) => {
  const [generation, setGeneration] = React.useState([]);
  const [moves, setMoves] = React.useState(
    data.move.sort((before, after) => {
      return before.move.name < after.move.name
        ? -1
        : before.move.name > after.move.name
        ? 1
        : 0;
    })
  );
  const refSelect = React.useRef();
  const refOptions = React.useRef();
  const [activeOption, setActiveOption] = React.useState(false);
  const { request } = useFetch();
  const [genActual, setGenActual] = React.useState("Selecione-a-geração");
  const { textTransform } = useText();
  const { pathname } = useLocation();

  React.useEffect(() => {
    setGenActual("Selecione-a-geração");
  }, [pathname]);

  React.useEffect(() => {
    async function getGenerations() {
      const { url, options } = GENERATION_GET();
      const { response, json } = await request(url, options);

      if (response.ok) {
        setGeneration(
          json.results.sort((before, after) => {
            return before.name < after.name
              ? -1
              : before.name > after.name
              ? 1
              : 0;
          })
        );
      }
    }
    getGenerations();
  }, [request]);

  React.useEffect(() => {
    if (genActual !== "Selecione-a-geração") {
      let move = [];

      if (genActual === "all") {
        move = data.move;
      } else {
        for (let i = 0; i < data.move.length; i++) {
          let open = true;

          data.move[i].version_group_details.forEach((details, index) => {
            if (details.version_group.name === genActual && open) {
              let moveGen = data.move[i];

              moveGen.version_group_details = [details];

              move.push(moveGen);
              open = false;
            } else if (
              index === data.move[i].version_group_details.length - 1 &&
              details.version_group.name !== genActual &&
              open
            ) {
              let moveGen = data.move[i];

              moveGen.version_group_details = [details];

              move.push(moveGen);
              open = false;
            }
          });
        }
      }
      setMoves(
        move.sort((before, after) => {
          return before.move.name < after.move.name
            ? -1
            : before.move.name > after.move.name
            ? 1
            : 0;
        })
      );
    }
  }, [data.move, genActual]);

  React.useEffect(() => {
    data.setActualize(moves);
  }, [data, moves]);

  function handleActiveOptions() {
    setActiveOption((activeOption) => !activeOption);
  }

  function handleSelectOption({ target }) {
    if (target.nodeName === "INPUT") {
      setGenActual(target.name);
    } else {
      setGenActual(target.childNodes[0].name);
    }
    setActiveOption(false);
  }

  return (
    <div>
      <div className={styles.configTable}>
        <FilterList
          list={data.move}
          setList={setMoves}
          placeholder="Pesquisar move..."
          style={styles.responsive}
        />
        <div className={styles.selectBox}>
          <div
            className={`${styles.selectGen} responsiveInput ${
              activeOption ? styles.active : ""
            }`}
            ref={refSelect}
            onClick={handleActiveOptions}
          >
            {genActual === "all"
              ? "Todos os movimentos."
              : textTransform(genActual, "replace")}
          </div>
          <ul
            className={`${styles.optionBox}  ${
              activeOption ? styles.active : ""
            }`}
            ref={refOptions}
          >
            {genActual !== "Selecione-a-geração" && genActual !== "all" && (
              <li className={styles.optionGen} onClick={handleSelectOption}>
                <input
                  type="radio"
                  name="all"
                  id="all"
                  className={styles.radio}
                />
                <label htmlFor="all">Todos os movimentos.</label>
              </li>
            )}
            {generation.map(({ name }) => (
              <li
                key={name}
                className={styles.optionGen}
                onClick={handleSelectOption}
              >
                <input
                  type="radio"
                  name={name}
                  id={name}
                  className={styles.radio}
                />
                <label htmlFor={name}>{textTransform(name, "replace")}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <table className={styles.tableMoves}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.thName}>Nome</th>
            <th className={styles.thGeneration}>Geração</th>
            <th className={styles.thLevel}>Level Aprendido</th>
            <th className={styles.thMethod}>Método Aprendido</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {moves.length > 0 ? (
            moves.map(({ move, version_group_details }) => (
              <tr key={move.name}>
                <td>
                  <Link to={`/moves/${move.name}`}>
                    {textTransform(move.name, "replace")}
                  </Link>
                </td>
                <td>
                  <Link to={`/moves/${move.name}`}>
                    {
                      version_group_details[version_group_details.length - 1]
                        .level_learned_at
                    }
                  </Link>
                </td>
                <td>
                  <Link to={`/moves/${move.name}`}>
                    {textTransform(
                      version_group_details[version_group_details.length - 1]
                        .move_learn_method.name,
                      "translate"
                    )}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles.noMove}>
              <td>Sem resultados...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonMovesTable;
