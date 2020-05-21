const stocktwitService = {
  getSymbol(symbol, lasttweetID) {
    return fetch(
      // `https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json?since=${lasttweetID}`)
      `https://orbis-stocktwits-search.herokuapp.com/api/2/streams/symbol/${symbol}.json?since=${lasttweetID}`
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default stocktwitService;
