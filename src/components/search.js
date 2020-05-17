import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTerm, removeTerm, addTweet } from '../actions';
import stocktwitService from '../services/stocktwit-service';

import './search.css';

export default function Search() {
  const [term, setTerm] = useState(0);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const terms = useSelector(state => state.searchTerms);
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const handleAddTerm = async () => {
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
        setError('');
      } else {

      setError('symbol already entered!');
      }
    } catch (e) {
      setError(e.errors[0].message);
    }
  };
  
  const handleSubmitForm = async e => {
    e.preventDefault();
    e.target.reset();
    handleAddTerm();

  }

  const handleInput = e => {
    // e.preventDefault();
     e.target.value = e.target.value.toUpperCase();
    const inputdata = e.target.value;
    setTerm(inputdata);
    if (inputdata[inputdata.length-1] === ',' || inputdata[inputdata.length-1] === ' ') {
      if(inputdata.length > 1) {
      document.getElementById('searchbox').value='';
      handleAddTerm();
      } else {
      document.getElementById('searchbox').value='';
      }
    }
  };

  return (
    <form id='search-form' onSubmit={e => handleSubmitForm(e)}>
      <input
        name="symbol-search"
        type="text"
        id="searchbox"
        onChange={e => handleInput(e)}
        autoFocus
      />
      {error && <span className='error'>{error}</span>}
    </form>
  );
}
