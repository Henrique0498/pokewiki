import React from "react";
import { Link } from "react-router-dom";
import useText from "../../Hooks/useText";
import { UserContext } from "../../UseContext";
import styles from "./Table.module.css";

const Table = ({ data }) => {
  const [config, setConfig] = React.useState({
    foot: true,
    itemsForPage: 10,
    pageActual: 1,
    totalPages: Math.ceil(data.body.length / 10),
    selectPage: false,
  });
  const { setUpdateBackground } = React.useContext(UserContext);
  const [dataBaseBody, setDataBaseBody] = React.useState(data.body);
  const [dataBody, setDataBody] = React.useState(dataBaseBody.slice(0, 10));
  const [options, setOptions] = React.useState();
  const [filter, setFilter] = React.useState("");
  const { textTransform } = useText();

  function handleSearch({ value }) {
    setFilter(value);
    let result = [];

    if (value.length < 1) {
      result = data.body;
    } else {
      result = result.concat(
        data.body.filter((elementArray) => {
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
    }

    handleConfig(
      ["totalPages", "pageActual"],
      [result.length ? Math.ceil(result.length / 10) : 1, 1]
    );

    setDataBaseBody(result);
    setDataBody(result.slice(0, 10));
  }

  function handleReturnPage() {
    const end = config.pageActual * config.itemsForPage - config.itemsForPage;
    const start = end - config.itemsForPage;

    if (start >= 0) {
      let settings = { ...config };

      settings.pageActual -= 1;

      setConfig(settings);
    }
  }

  function handleNextPage() {
    const end = (config.pageActual + 1) * config.itemsForPage;
    const start = end - config.itemsForPage;

    if (dataBaseBody.length > start) {
      let settings = { ...config };

      settings.pageActual += 1;

      setConfig(settings);
    }
  }

  const handleConfig = React.useCallback(
    (name, value) => {
      let settings = { ...config };

      if (name === "itemsForPage") {
        const items = config.itemsForPage < 25 ? config.itemsForPage + 5 : 10;
        const page = Math.ceil(data.body.length / items);

        if (page < settings.totalPages) {
          settings.pageActual = page;
        }

        setUpdateBackground(page);

        settings.itemsForPage = items;
        settings.totalPages = page;
      } else if (!value) {
        settings[name] = !settings[name];
      } else if (!Array.isArray(name)) {
        settings[name] = value;
      } else {
        name.forEach((element, index) => {
          settings[element] = value[index];
        });
      }

      setConfig(settings);
      window.localStorage.setItem("tableConfig", JSON.stringify(settings));
    },
    [config, data.body.length, setUpdateBackground]
  );

  React.useEffect(() => {
    const configSave = JSON.parse(window.localStorage.getItem("tableConfig"));

    if (configSave) {
      configSave.selectPage = false;

      configSave.pageActual = 1;

      setConfig(configSave);
    }
  }, []);

  React.useEffect(() => {
    function goPage() {
      const end = config.pageActual * config.itemsForPage;
      const start = end - config.itemsForPage;

      if (dataBaseBody.length > start && start >= 0) {
        setDataBody(dataBaseBody.slice(start, end));
      }
    }
    goPage();
  }, [config.itemsForPage, config.pageActual, dataBaseBody]);

  React.useEffect(() => {
    function createOptions() {
      let optionsCreate = [];

      for (let i = 1; i <= config.totalPages; i++) {
        optionsCreate.push(
          <li
            key={i}
            value={i}
            onClick={() => {
              handleConfig("pageActual", i);
            }}
          >
            Página {i}
          </li>
        );
      }

      setOptions(optionsCreate);
    }

    createOptions();
  }, [config.totalPages, handleConfig]);

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
          <button
            onClick={() => {
              handleConfig("itemsForPage");
            }}
            className={`${styles.btnTotalPages}`}
          >
            <p>{config.itemsForPage}</p>
            <span>X</span>
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead
          className={`${styles.thead} ${
            data.mobileTable ? styles.mobileTable : ""
          }`}
        >
          <tr>
            {data.headers.map((head, i) => {
              return (
                <th
                  key={i}
                  className={
                    i === 1
                      ? styles.titleLeft
                      : data.mobileTable && i === 2
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
          className={`${styles.tbody}
           ${data.mobileTable ? styles.mobileTable : ""}`}
          style={{ height: `${config.itemsForPage * 51}px` }}
        >
          {dataBody.length > 0 ? (
            dataBody.map((body, idTr) => {
              return (
                <tr key={idTr}>
                  {body.map((value, idTD) => {
                    return (
                      <td
                        key={idTD}
                        className={
                          idTD === 1
                            ? styles.titleLeft
                            : data.mobileTable && idTD === 2
                            ? styles.columnOption
                            : ""
                        }
                      >
                        <Link to={`/${data.pageRedirection}/${body[1]}`}>
                          {data.headers[idTD].toLowerCase() !== "foto" ? (
                            textTransform(value.toString(), "replace")
                          ) : (
                            <img src={value} alt={data.headers[2]} />
                          )}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr className={styles.noResult}>
              <td
                colSpan="3"
                style={{ height: `${config.itemsForPage * 51}px` }}
              >
                Sem Resultados.
              </td>
            </tr>
          )}
        </tbody>
        {config.foot && (
          <tfoot
            className={`${styles.tfoot} ${
              data.mobileTable ? styles.mobileTable : ""
            }`}
          >
            <tr>
              {data.headers.map((head, idFoot) => {
                return (
                  <th
                    key={idFoot}
                    className={
                      idFoot === 1
                        ? styles.titleLeft
                        : data.mobileTable && idFoot === 2
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
          <button
            className={styles.btnBack}
            onClick={() => handleReturnPage()}
          ></button>
          <div className={styles.textPage}>
            <p className={styles.mainText}>
              Página <span>{config.pageActual}</span>
            </p>
            <p className={styles.subText}>
              Páginas <span>{config.totalPages}</span>
            </p>
          </div>
          <button
            className={styles.btnGo}
            onClick={() => handleNextPage()}
          ></button>
        </div>

        <div className={styles.boxSelectPage}>
          {config.selectPage && (
            <div className={styles.optionsPages}>
              <ul className={styles.optionPage}>
                {options.map((element) => element)}
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
