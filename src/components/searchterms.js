import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm } from '../actions';

export default function SearchTerms(props) {
  return (
    <div>
      <span>{props.term}</span>
      <button onClick={() => props.removeTerm(props.term)}>x</button>
    </div>
  );
}
