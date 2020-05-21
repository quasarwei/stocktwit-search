import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  removeTerm,
  removeTweets,
  addTerm,
  addTweet,
  editTerm
} from './actions';
import Search from './components/search';
import TweetCard from './components/tweetcard';
import './App.css';

function App(props) {
  useEffect(() => {}, [props.symbols]);
  console.log(process.env);

  // remove searchterm and corresponding tweet results from store
  const handleRemoveTerm = symbol => {
    props.dispatch(removeTerm(symbol));
    props.dispatch(
      removeTweets({
        termToRemove: symbol,
        allSymbols: props.searchTerms.map(symbol => symbol.symbol)
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">Stock tweets</header>

      {/* search box */}
      <Search
        addTerm={term => props.dispatch(addTerm(term))}
        removeTerm={symbol => handleRemoveTerm(symbol)}
        editTerm={term => props.dispatch(editTerm(term))}
        addTweet={message => props.dispatch(addTweet(message))}
      />

      {/* tweet list */}
      <TransitionGroup component={null}>
        {props.tweets
          .sort((a, b) => b.id - a.id) // sort by id, latest first
          .map(tweet => {
            return (
              <CSSTransition
                timeout={300}
                classNames="fade"
                key={tweet.id}
                unmountOnExit
              >
                <TweetCard tweet={tweet} />
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return { searchTerms: state.searchTerms, tweets: state.tweets };
};

export default connect(mapStateToProps)(App);
