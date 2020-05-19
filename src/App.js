import React, {useState, useEffect} from 'react';
import Search from './components/search';
import { useSelector, useDispatch, connect } from 'react-redux';
import { removeTerm, removeTweets, addTerm, addTweet } from './actions';
import SearchTerms from './components/searchterms';
import TweetCard from './components/tweetcard';
import './App.css';

function App(props) {

  // const terms = useSelector(state => state.searchTerms);
  // const tweets = useSelector(state => state.tweets);
  // const dispatch = useDispatch();

  const [tweetIDs, setTweetIDs] = useState([]);

  // use state to store tweet IDs
  // when display, check if tweet ID has already been displayed

  const handleRemoveTerm = term => {
    props.dispatch(removeTerm(term));
    props.dispatch(removeTweets(term.symbol));
  };

   useEffect(() => {
     console.log(`props symbol length: ${props.symbols.length}`);
  }, [props.symbols]);


  return (
    <div className="App">
      <header className="App-header">
          Stock tweets
      </header>

      {/* search box */}
      <Search />

      {/* entered search terms */}
      <div className='searchterms'>
      {props.symbols &&
        props.symbols.slice(0).reverse().map((term, i) => (
          <SearchTerms
            term={term}
            removeTerm={term => handleRemoveTerm(term)}
            key={`${term.symbol}`}
          />
        ))}
      </div>

      {/* tweet list */}
      {
        props.tweets.map(tweet => {
          // if (tweetIDs.includes(tweet.id) === false) {
            // setTweetIDs(...tweetIDs, tweet.id);
          return <TweetCard tweet={tweet} key={tweet.id} />

          // }
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return { symbols: state.searchTerms, tweets: state.tweets };
};

const mapDispatchToProps = dispatch => {
  return {
    addTweet: () => dispatch(addTweet())
  };
};

export default connect(mapStateToProps)(App);
