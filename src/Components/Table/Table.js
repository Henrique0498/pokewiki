import React from "react";
import useText from "../../Hooks/useText";
import styles from "./Table.module.css";

const Table = ({ date }) => {
  const [config, setConfig] = React.useState({
    foot: true,
    pageActual: 1,
    selectPage: false,
  });
  const [dateBody, setDateBody] = React.useState(date.body.slice(0, 10));
  const [filter, setFilter] = React.useState("");
  const { textTransform } = useText();

  function handleConfig(value) {
    let date = { ...config };

    date[value] = !date[value];

    setConfig(date);
  }

  function handleSearch({ value }) {
    setFilter(value);

    if (value.length < 1) {
      setDateBody(date.body);
    } else {
      let result = [];

      result = result.concat(
        date.body.filter((elementArray) => {
          let validation = false;

          elementArray.forEach((element) => {
            const filterValue = textTransform(value.toLowerCase(), "replace");
            const valid = element.toString().indexOf(filterValue);

            if (valid !== -1) {
              validation = true;
            }
          });

          if (!validation) {
            return false;
          }

          return true;
        })
      );

      setDateBody(result);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.tableConfig}>
        <div className={styles.searchContainer}>
          <input
            type="search"
            name="filterList"
            id="filterList"
            placeholder="Pesquisar na tabela..."
            value={filter}
            onChange={({ target }) => handleSearch(target)}
            className={`${styles.responsive} responsiveInput`}
          />
          <label
            htmlFor="filterList"
            className={`${styles.responsive} responsiveLabel`}
          ></label>
        </div>

        <div className={styles.btnConfigure}>
          <button
            onClick={() => {
              handleConfig("foot");
            }}
            className={`${styles.btnFoot} ${!config.foot ? styles.false : ""}`}
          ></button>
        </div>
      </div>

      <table className={styles.table}>
        <thead
          className={`${styles.thead} ${
            date.mobileTable ? styles.mobileTable : ""
          }`}
        >
          <tr>
            {date.headers.map((head, i) => {
              return (
                <th
                  key={i}
                  className={
                    i === 1
                      ? styles.titleLeft
                      : date.mobileTable && i === 2
                      ? styles.columnOption
                      : ""
                  }
                >
                  {head}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className={`${styles.tbody} ${
            date.mobileTable ? styles.mobileTable : ""
          }`}
        >
          {dateBody.length > 0 ? (
            dateBody.map((body, idTr) => {
              return (
                <tr key={idTr}>
                  {body.map((value, idTD) => {
                    return (
                      <td
                        key={idTD}
                        className={
                          idTD === 1
                            ? styles.titleLeft
                            : date.mobileTable && idTD === 2
                            ? styles.columnOption
                            : ""
                        }
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr className={styles.noResult}>
              <td colSpan="3">Sem Resultados.</td>
            </tr>
          )}
        </tbody>
        {config.foot && (
          <tfoot
            className={`${styles.tfoot} ${
              date.mobileTable ? styles.mobileTable : ""
            }`}
          >
            <tr>
              {date.headers.map((head, idFoot) => {
                return (
                  <th
                    key={idFoot}
                    className={
                      idFoot === 1
                        ? styles.titleLeft
                        : date.mobileTable && idFoot === 2
                        ? styles.columnOption
                        : ""
                    }
                  >
                    {head}
                  </th>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>

      <div className={styles.tablePage}>
        <div className={styles.pages}>
          <button className={styles.btnBack}></button>
          <div className={styles.textPage}>
            <p className={styles.mainText}>
              Página <span>1</span>
            </p>
            <p className={styles.subText}>
              Páginas <span>10</span>
            </p>
          </div>
          <button className={styles.btnGo}></button>
        </div>

        <div className={styles.boxSelectPage}>
          {config.selectPage && (
            <div className={styles.optionsPages}>
              <ul className={styles.optionPage}>
                <li>Opção 1</li>
                <li>Opção 2</li>
                <li>Opção 3</li>
                <li>Opção 4</li>
                <li>Opção 5</li>
                <li>Opção 6</li>
                <li>Opção 7</li>
                <li>Opção 8</li>
              </ul>
            </div>
          )}
          <button
            className={styles.btnSelectPage}
            onClick={() => {
              handleConfig("selectPage");
            }}
          >
            Selecione a pagina
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
