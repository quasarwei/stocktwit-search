import React, { useEffect } from 'react';
import stocktwitService from '../services/stocktwit-service';

import './searchterms.css';

export default function SearchTerms(props) {
  let fetchtweets;
  let term = props.term;
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  useEffect(() => {
    updateTweets();
    return () => {
      stopUpdateTweets();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateTweets = () => {
    fetchtweets = setInterval(async () => {
      const symbolData = await getNewTweets(term);
      const numMessages = symbolData.messages.length;

      // check if there are any new tweets first
      if (numMessages) {
        // dispatch term object with updated tweet count and lastTweetID
        let editedSearchTerm = {
          symbol: props.term.symbol,
          count: term.count + numMessages,
          lastTweetID: symbolData.messages[numMessages - 1].id
        };
        term = editedSearchTerm;
        props.editTerm(editedSearchTerm);

        // dispatch new tweets
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
      <button onClick={() => props.removeTerm(props.term.symbol)}>x</button>
    </div>
  );
}
