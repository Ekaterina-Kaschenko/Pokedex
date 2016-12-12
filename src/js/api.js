const api = {
  getList: () => fetch('http://pokeapi.co/api/v2/pokemon/&limit=10')
    .then(r => r.json())
    .then(x => x.results)
};

export default api;
