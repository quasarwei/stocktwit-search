import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm } from '../actions';
import stocktwitService from '../services/stocktwit-service';

import './searchterms.css';

export default function SearchTerms(props) {
  let fetchtweets;

  const terms = useSelector(state => state.searchTerms);
  // const [count, setCount] = useState(props.term.count);
  const [lastID, setLastID] = useState(props.term.lastTweetID);
  // console.log(`reset state: ${lastID}`);
  const [test, setTest] = useState(0);
  let testInterval;
  let testnum = props.termIndex;
  let term =props.term

  useEffect(() => {
    updateTweets();
    return () => {
      stopUpdateTweets();
    };
  }, []);

  // const setLoop= () => {
  //   testInterval = setInterval(() => {
  //     testnum = updateTest(testnum);
  //     console.log(testnum);
  //   }
  //   , 1000)}

  // const updateTest = (num) => {
  //     setTest(num +2);
  //   return num + 2;
  // }

  const updateTweets = () => {
    fetchtweets = setInterval(async () => {
      const symbolData = await getNewTweets(term);
      console.log(symbolData)
      const numMessages = symbolData.messages.length;

      if (numMessages) {
        let editedSearchTerm = {
          symbol: props.term.symbol,
          count: term.count + numMessages,
          lastTweetID: symbolData.messages[numMessages - 1].id
        };
        term = editedSearchTerm;
        props.editTerm(editedSearchTerm);
      }
      console.log(numMessages);
    }, 60000);
  };

  const getNewTweets = async (term) => {
      const symbolData = await stocktwitService.getSymbol(
        term.symbol,
        term.lastTweetID
      );
    return symbolData;

  }


  const stopUpdateTweets = () => {
    clearInterval(fetchtweets);
  };

  return (
    <div className="searchterm">
      <span>{props.term.symbol}</span>
      <span>({props.term.count})</span>
      <button onClick={() => props.removeTerm(props.term)}>x</button>
    </div>
  );
}
