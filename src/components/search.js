import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTerm, removeTerm, addTweet } from '../actions';
import stocktwitService from '../services/stocktwit-service';

export default function Search() {
  const [term, setTerm] = useState(0);
  const dispatch = useDispatch();
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const handleAddTerm = async e => {
    e.preventDefault();
    e.target.reset();
    dispatch(addTerm(term));
    // check if term has been added first
    stocktwitService.getSymbol(term);

    try {
      const symbolData = await stocktwitService.getSymbol(term);
      console.log(symbolData);
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
      }
    } catch (e) {
      // console.log(e.errors[0].message);
      console.log(e);
    }
  };

  const handleInput = e => {
    // e.preventDefault();
    setTerm(e.target.value);
  };

  return (
    <form onSubmit={e => handleAddTerm(e)}>
      <input type="text" onChange={e => handleInput(e)} />
    </form>
  );
}
