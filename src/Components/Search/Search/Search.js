import React from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../UseContext";
import Options from "../Options/Options";
import useText from "../../../Hooks/useText";
import styles from "./Search.module.css";

const Search = ({ estilo }) => {
  const { pokeList } = React.useContext(UserContext);
  const [listOptions, setListOptions] = React.useState([]);
  const [focusSearch, setFocusSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { textTransform } = useText();
  const { pathname } = useLocation();

  React.useEffect(() => {
    setSearch("");
    setFocusSearch(false);
  }, [pathname]);

  function handleSearch({ value }) {
    setSearch(value);

    if (value.length) {
      setFocusSearch(true);
    } else {
      setFocusSearch(false);
    }

    setListOptions(
      pokeList.filter((element) => {
        if (value.length > 0) {
          const searchValue = textTransform(value.toLowerCase(), "replace");
          const valid = element.name.indexOf(searchValue);
          if (valid !== -1) {
            return element;
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
    );
  }

  React.useEffect(() => {
    function handleSetFocus({ target }) {
      if (target.nodeName !== "A" && target.nodeName !== "INPUT") {
        setFocusSearch(false);
      }
    }

    document.addEventListener("click", handleSetFocus);

    return () => {
      document.removeEventListener("click", handleSetFocus);
    };
  }, []);

  return (
    <div className={`${styles.searchContainer} ${styles[estilo]}`}>
      <div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Pesquisar..."
          autoComplete="off"
          value={search}
          onChange={({ target }) => handleSearch(target)}
          onClick={() => search.length > 0 && setFocusSearch(true)}
          className={styles.search}
        />
        <label htmlFor="search" className={styles.label}></label>
        <Options focus={focusSearch} options={listOptions} />
      </div>
    </div>
  );
};

export default Search;
