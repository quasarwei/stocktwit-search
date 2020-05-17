import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTerm, removeTerm, addTweet } from '../actions';
import stocktwitService from '../services/stocktwit-service';

export default function Search() {
  const [term, setTerm] = useState(0);
  const dispatch = useDispatch();
  const terms = useSelector(state => state.searchTerms);
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const handleAddTerm = async e => {
    e.preventDefault();
    e.target.reset();
    // check if term has been added first

    try {
      const symbolData = await stocktwitService.getSymbol(term);
      console.log(symbolData);

      // check if searchterm has already been entered
      const termIndex = terms.findIndex(t => t.symbol === term);
      if (termIndex === -1) {
        if (symbolData) {
          symbolData.messages.forEach(message => {
            let linkedBody = message.body.replace(
              urlRegex,
              url =>
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
            );
            let newMessage = { ...message, body: linkedBody };
            dispatch(addTweet(newMessage));
          });
          let searchterm = { symbol: term, count: symbolData.messages.length };
          dispatch(addTerm(searchterm));
        }
      }
    } catch (e) {
      // console.log(e.errors[0].message);
      console.log(e);
    }
  };

  const handleInput = e => {
    // e.preventDefault();
    e.target.value = e.target.value.toUpperCase();
    setTerm(e.target.value.toUpperCase());
  };

  return (
    <form onSubmit={e => handleAddTerm(e)}>
      <input
        name="symbol-search"
        type="text"
        id="searchbox"
        onChange={e => handleInput(e)}
        autofocus
      />
    </form>
  );
}
