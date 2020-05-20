import { combineReducers } from 'redux';

const searchTerms = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'ADD-TERM':
      return [...state, action.payload];
    case 'REMOVE-TERM':
      const indexToRemove = state.findIndex(
        term => term.symbol === action.payload.symbol
      );
      if (indexToRemove !== -1) newState.splice(indexToRemove, 1);
      return newState;
    case 'EDIT-TERM':
      const indexToEdit = state.findIndex(
        term => term.symbol === action.payload.symbol
      );
      if (indexToEdit !== -1) newState.splice(indexToEdit, 1, action.payload);
      return newState;
    default:
      return state;
  }
};

const tweets = (state = [], action) => {
  switch (action.type) {
    case 'ADD-TWEET':
      // check if tweet has already been added by another searchterm, do not add duplicate tweet
      if (state.find(tweet => tweet.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'REMOVE-TWEETS':
      const filteredTweets = state.filter(tweet => {
        let match = true;
        let numMatches = 0;
        // check if tweet mentions more than one searchterm.
        // if it does AND it mentions the searchterm we just removed, keep the tweet.
        // if it mentions only one searchterm, check if it's the term we just removed. if yes, remove the tweet
        for (let i = 0; i < tweet.symbols.length; i++) {
          for (let j = 0; j < action.payload.allSymbols.length; j++) {
            if (tweet.symbols[i].symbol === action.payload.allSymbols[j]) {
              numMatches++;
              if (numMatches > 1) break;
            }
          }
          if (tweet.symbols[i].symbol === action.payload.termToRemove)
            match = false;
        }
        return numMatches > 1 ? true : match;
      });
      return filteredTweets;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  searchTerms,
  tweets
});

export default allReducers;
