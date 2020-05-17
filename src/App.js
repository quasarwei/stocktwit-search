import React from 'react';
import Search from './components/search';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm, removeTweets } from './actions';
import SearchTerms from './components/searchterms';
import TweetCard from './components/tweetcard';
import './App.css';

export default function App() {
  const terms = useSelector(state => state.searchTerms);
  const tweets = useSelector(state => state.tweets);
  const dispatch = useDispatch();

  const handleRemoveTerm = term => {
    dispatch(removeTerm(term));
    dispatch(removeTweets(term.symbol));
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

      {/* entered search terms */}
      <div className='searchterms'>
      {terms &&
        terms.map((term, i) => (
          <SearchTerms
            term={term}
            removeTerm={term => handleRemoveTerm(term)}
            key={`termID_${i}`}
          />
        ))}
      </div>

      {tweets &&
        tweets.map((tweet, i) => (
          <TweetCard tweet={tweet} key={`tweetID_${i}`} />
        ))}
    </div>
  );
}
