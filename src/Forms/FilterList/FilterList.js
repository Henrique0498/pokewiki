import React from "react";
import { useLocation } from "react-router-dom";
import useText from "../../Hooks/useText";
import styles from "./FilterList.module.css";

const FilterList = ({ list, setList, placeholder, style }) => {
  const [search, setSearch] = React.useState("");
  const { textTransform } = useText();
  const { pathname } = useLocation();

  React.useEffect(() => {
    setSearch("");
  }, [pathname]);

  function handleSearchMoves({ value }) {
    setSearch(value);

    if (value.length < 1) {
      setList(list);
    } else {
      setList(
        list.filter((element) => {
          if (value.length > 0) {
            const searchValue = textTransform(value.toLowerCase(), "replace");
            const valid = element.move.name.indexOf(searchValue);

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
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        name="filterList"
        id="filterList"
        placeholder={placeholder}
        autoComplete="off"
        value={search}
        onChange={({ target }) => handleSearchMoves(target)}
        className={`${styles.search} responsiveInput ${style}`}
      />
      <label
        htmlFor="filterList"
        className={`${styles.label} responsiveLabel ${style}`}
      ></label>
    </div>
  );
};

export default FilterList;
