import React, { useState, useEffect } from 'react';
import Search from './components/search';
import { connect } from 'react-redux';
import {
  removeTerm,
  removeTweets,
  addTerm,
  addTweet,
  editTerm
} from './actions';
import TweetCard from './components/tweetcard';
import './App.css';

function App(props) {
  useEffect(() => {}, [props.symbols]);

  const handleRemoveTerm = term => {
    props.dispatch(removeTerm(term));
    props.dispatch(
      removeTweets({
        termToRemove: term.symbol,
        allSymbols: props.symbols.map(symbol => symbol.symbol)
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">Stock tweets</header>

      {/* search box */}
      <Search
        addTerm={term => props.dispatch(addTerm(term))}
        removeTerm={term => handleRemoveTerm(term)}
        editTerm={term => props.dispatch(editTerm(term))}
        addTweet={message => props.dispatch(addTweet(message))}
      />

      {/* entered search terms */}
      {/* <div className="searchterms"> */}
      {/*   {props.symbols && */}
      {/*     props.symbols.map((term, i) => ( */}
      {/*       <SearchTerms */}
      {/*         term={term} */}
      {/*         removeTerm={term => handleRemoveTerm(term)} */}
      {/*         editTerm={term => props.dispatch(editTerm(term))} */}
      {/*         addTweet={message => props.dispatch(addTweet(message))} */}
      {/*         termIndex={i} */}
      {/*         key={`${term.symbol}`} */}
      {/*       /> */}
      {/*     ))} */}
      {/* </div> */}

      {/* tweet list */}
      {props.tweets
        .sort((a, b) => b.id - a.id)
        .map(tweet => {
          return <TweetCard tweet={tweet} key={tweet.id} />;
        })}
    </div>
  );
}

const mapStateToProps = state => {
  return { symbols: state.searchTerms, tweets: state.tweets };
};

export default connect(mapStateToProps)(App);
