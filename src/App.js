import React from 'react';
import './App.css';
import Search from './components/search';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm } from './actions';
import SearchTerms from './components/searchterms';

export default function App() {
  const terms = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRemoveTerm = () => {
    dispatch(removeTerm());
  };

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stock tweets
        </a>
      </header>

      <Search />
      {terms &&
        terms.map((term, i) => <SearchTerms term={term} key={`termID_${i}`} />)}
    </div>
  );
}
