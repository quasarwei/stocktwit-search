import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm } from '../actions';
import stocktwitService from '../services/stocktwit-service';

import './searchterms.css';

export default function SearchTerms(props) {
  let fetchtweets;

  useEffect(() => {
    updateTweets();
    return () => {
      stopUpdateTweets();
    };
  }, []);

  const updateTweets =  () => {
    fetchtweets = setInterval(async () => {
      const symbolData = await stocktwitService.getSymbol(
        props.term.symbol,
        props.term.lastTweetID
      );
      console.log(symbolData);
    }, 300000);
  };

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
