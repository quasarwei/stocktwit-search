import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTerm, removeTerm, addTweet } from '../actions';
import stocktwitService from '../services/stocktwit-service';

export default function Search() {
  const [term, setTerm] = useState(0);
  const dispatch = useDispatch();

  const handleAddTerm = async e => {
    e.preventDefault();
    e.target.reset();
    dispatch(addTerm(term));
    // check if term has been added first
    stocktwitService.getSymbol(term);

    try {
      const symbolData = await stocktwitService.getSymbol(term);
      console.log(symbolData);

      symbolData.messages.forEach(message => {
        dispatch(addTweet(message));
      });
    } catch (e) {
      console.log(e.errors[0].message);
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
