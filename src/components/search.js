import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import stocktwitService from '../services/stocktwit-service';

import SearchTerms from './searchterms';

import './search.css';

export default function Search(props) {
  const [term, setTerm] = useState(0);
  const [error, setError] = useState();

  const terms = useSelector(state => state.searchTerms);
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const handleAddTerm = async () => {
    try {
      // check if searchterm has already been entered
      const termIndex = terms.findIndex(t => t.symbol === term);

      if (termIndex === -1) {
        const symbolData = await stocktwitService.getSymbol(term, '');
        console.log(symbolData);

        if (symbolData) {
          // add search term to store
          let searchterm = {
            symbol: term,
            count: symbolData.messages.length,
            lastTweetID: symbolData.messages[0].id
          };
          // dispatch(addTerm(searchterm));
          props.addTerm(searchterm);

          // add tweet to store
          symbolData.messages.forEach(message => {
            let linkedBody = message.body.replace(
              urlRegex,
              url =>
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
            );
            let newMessage = { ...message, body: linkedBody };
            // dispatch(addTweet(message));
            // dispatch(addTweet(newMessage));
            props.addTweet(newMessage);
          });
        }
        console.log('exited foreach');
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
  };

  const handleInput = e => {
    // e.preventDefault();
    e.target.value = e.target.value.toUpperCase();
    const inputdata = e.target.value;
    setTerm(inputdata);
    if (
      inputdata[inputdata.length - 1] === ',' ||
      inputdata[inputdata.length - 1] === ' '
    ) {
      if (inputdata.length > 1) {
        document.getElementById('search-input').value = '';
        handleAddTerm();
      } else {
        document.getElementById('search-input').value = '';
      }
    }
  };

  // const handleRemoveTerm = term => {
  //   dispatch(removeTerm(term));
  //   dispatch(removeTweets(term.symbol));
  // };

  return (
    <div id="search-bar">
      <div className="searchterms">
        {terms &&
          terms.map((term, i) => (
            <SearchTerms
              term={term}
              removeTerm={term => props.removeTerm(term)}
              editTerm={term => props.editTerm(term)}
              addTweet={term => props.addTweet(term)}
              termIndex={i}
              key={`${term.symbol}`}
            />
          ))}
      </div>
      {/* {error && <span className="error">{error}</span>} */}
      <form id="search-form" onSubmit={e => handleSubmitForm(e)}>
        <input
          name="symbol-search"
          type="text"
          className={`search--error`}
          id="search-input"
          onChange={e => handleInput(e)}
          placeholder="Enter stock symbol"
          autoFocus
        />
        {/* <div > */}
        {error && <p className="error">{error}</p>}
        {/* </div> */}
        <button>search</button>
      </form>
    </div>
  );
}
