import React, { useState, useEffect } from 'react';
import { removeTerm } from '../actions';
import stocktwitService from '../services/stocktwit-service';

import './searchterms.css';

export default function SearchTerms(props) {
  let fetchtweets;

  // const [count, setCount] = useState(props.term.count);
  // console.log(`reset state: ${lastID}`);
  let term = props.term;

  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

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
      console.log(symbolData);
      const numMessages = symbolData.messages.length;

      if (numMessages) {
        let editedSearchTerm = {
          symbol: props.term.symbol,
          count: term.count + numMessages,
          lastTweetID: symbolData.messages[numMessages - 1].id
        };
        term = editedSearchTerm;
        props.editTerm(editedSearchTerm);

        symbolData.messages.forEach(message => {
          let linkedBody = message.body.replace(
            urlRegex,
            url =>
              `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
          );
          let newMessage = { ...message, body: linkedBody };
          props.addTweet(newMessage);
        });
      }
      console.log(numMessages);
    }, 60000);
  };

  const getNewTweets = async term => {
    const symbolData = await stocktwitService.getSymbol(
      term.symbol,
      term.lastTweetID
    );
    return symbolData;
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
