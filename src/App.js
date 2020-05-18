import React, {useState} from 'react';
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

  const [tweetIDs, setTweetIDs] = useState([]);

  // use state to store tweet IDs
  // when display, check if tweet ID has already been displayed

  const handleRemoveTerm = term => {
    dispatch(removeTerm(term));
    dispatch(removeTweets(term.symbol));
  };

  return (
    <div className="App">
      <header className="App-header">
          Stock tweets
      </header>

      <Search />

      {/* entered search terms */}
      <div className='searchterms'>
      {terms &&
        terms.slice(0).reverse().map((term, i) => (
          <SearchTerms
            term={term}
            removeTerm={term => handleRemoveTerm(term)}
            key={`termID_${i}`}
          />
        ))}
      </div>

      {
        tweets.map(tweet => {
          // if (tweetIDs.includes(tweet.id) === false) {
            // setTweetIDs(...tweetIDs, tweet.id);
          return <TweetCard tweet={tweet} key={tweet.id} />

          // }
      })}
    </div>
  );
}
