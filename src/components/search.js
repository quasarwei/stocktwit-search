import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTerm, removeTerm } from '../actions';

export default function Search() {
  // static defaultProps = {
  //   dispatch: useDispatch()
  // };

  // const dispatch = useDispatch();
  // dispatch = () => {
  //   useDispatch();
  // };
  //

  const [term, setTerm] = useState(0);
  const dispatch = useDispatch();

  const handleAddTerm = e => {
    e.preventDefault();
    // const dispatch = useDispatch();
    dispatch(addTerm(term));
  };

  const handleInput = e => {
    // e.preventDefault();
    // console.log(e.target.value);
    setTerm(e.target.value);
    console.log(term);
  };

  return (
    <form onSubmit={e => handleAddTerm(e)}>
      <input type="text" onChange={e => handleInput(e)} />
    </form>
  );
}
