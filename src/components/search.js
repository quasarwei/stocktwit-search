import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addTerm, removeTerm, removeTweets, addTweet } from '../actions';
import stocktwitService from '../services/stocktwit-service';

import SearchTerms from './searchterms';

import './search.css';

function Search(props) {
  const [term, setTerm] = useState(0);
  const [error, setError] = useState();
  const dispatch = useDispatch();
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
            lastTweetID: symbolData.messages[0].id,
          };
          dispatch(addTerm(searchterm));

          // add tweet to store
          symbolData.messages.forEach(message => {
            let linkedBody = message.body.replace(
              urlRegex,
              url =>
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
            );
            let newMessage = { ...message, body: linkedBody };
            // dispatch(addTweet(message));
            dispatch(addTweet(newMessage));
          });
        }
        console.log('exited foreach');
        setError('');
      } else {
        setError('symbol already entered!');
      }
    } catch (e) {
      // setError(e.errors[0].message);
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
        document.getElementById('searchbox').value = '';
        handleAddTerm();
      } else {
        document.getElementById('searchbox').value = '';
      }
    }
  };

  const handleRemoveTerm = term => {
    dispatch(removeTerm(term));
    dispatch(removeTweets(term.symbol));
  };

  return (
    <form id="search-form" onSubmit={e => handleSubmitForm(e)}>
      <input
        name="symbol-search"
        type="text"
        id="searchbox"
        onChange={e => handleInput(e)}
        placeholder="Enter stock symbol"
        autoFocus
      />

      {/* <div className='searchterms'> */}
      {/* {terms && */}
      {/*   terms.slice(0).reverse().map((term, i) => ( */}
      {/*     <SearchTerms */}
      {/*       term={term} */}
      {/*       removeTerm={term => handleRemoveTerm(term)} */}
      {/*       key={`termID_${i}`} */}
      {/*     /> */}
      {/*   ))} */}
      {/* </div> */}
      {error && <span className="error">{error}</span>}
    </form>
  );
}

const mapStateToProps = state => {
  return { symbols: state.searchTerms };
};

const mapDispatchToProps = dispatch => {
  return {
    addTweet: () => dispatch(addTweet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
