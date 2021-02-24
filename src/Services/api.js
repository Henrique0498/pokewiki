export const API_URL = "https://pokeapi.co/api/v2";

export function POKEMONS_GET(limit, offset) {
  return {
    url: `${API_URL}/pokemon/?limit=${limit}&offset=${offset}`,
    options: {
      method: "GET",
    },
  };
}

export function BERRYS_GET() {
  return {
    url: `${API_URL}/berry/`,
    options: {
      method: "GET",
    },
  };
}

export function POKEMON_GET(idOrName) {
  return {
    url: `${API_URL}/pokemon/${idOrName}`,
    options: {
      method: "GET",
    },
  };
}

export function BERRY_GET(idOrName) {
  return {
    url: `${API_URL}/berry/${idOrName}`,
    options: {
      method: "GET",
    },
  };
}

export function HELD_ITEMS_GET(idOrName) {
  return {
    url: `${API_URL}/item/${idOrName}`,
    options: {
      method: "GET",
    },
  };
}

export function SPECIE_POKEMON_GET(idOrName) {
  return {
    url: `${API_URL}/pokemon-species/${idOrName}/`,
    options: {
      method: "GET",
    },
  };
}

export function GENERATION_GET() {
  return {
    url: `${API_URL}/version-group/`,
    options: {
      method: "GET",
    },
  };
}
