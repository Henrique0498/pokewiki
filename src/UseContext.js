import React from "react";
import useFetch from "./Hooks/useFetch";
import { BERRYS_GET, POKEMONS_GET } from "./Services/api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [pokeList, setPokeList] = React.useState(null);
  const [updateBackground, setUpdateBackground] = React.useState(null);
  const [berryList, setBerryList] = React.useState(null);
  const { request } = useFetch();

  React.useEffect(() => {
    async function getListPoke() {
      const { url, options } = POKEMONS_GET(1050, 0);
      const { json, response } = await request(url, options);

      if (response.ok) {
        setPokeList(json.results);
      }
    }

    async function getListBerry() {
      const { url, options } = BERRYS_GET();
      const { json, response } = await request(url, options);

      if (response.ok) {
        setBerryList(json.results);
      }
    }

    getListPoke();
    getListBerry();
  }, [request]);

  return (
    <UserContext.Provider
      value={{ pokeList, berryList, updateBackground, setUpdateBackground }}
    >
      {children}
    </UserContext.Provider>
  );
};
