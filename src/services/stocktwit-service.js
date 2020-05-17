const stocktwitService = {
  getSymbol(symbol) {
    return fetch(
      `https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`
    )
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
  }
};

export default stocktwitService;
