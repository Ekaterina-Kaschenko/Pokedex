const api = {
  getList: () => fetch('http://pokeapi.co/api/v2/pokemon/')
    .then(r => r.json())
    .then(x => x.results)
};

export default api;
