import { combineReducers } from 'redux';

const searchTerms = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      const indexToRemove = state.findIndex(
        term => term.symbol === action.payload.symbol
      );
      if (indexToRemove !== -1) {
        newState.splice(indexToRemove, 1);
      }
      return newState;
    default:
      return state;
  }
};

const tweets = (state = [], action) => {
  switch (action.type) {
    case 'add-tweet':
      // check if twit has already been added by another searchterm
      if (state.find(tweet => tweet.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'remove-tweets':
      console.log(action.payload);
      const filteredTweets = state.filter(tweet => {
        let match = true;
        let numMatches = 0;
        for (let i = 0; i < tweet.symbols.length; i++) {
          for (let j = 0; j < action.payload.allSymbols.length; j++) {
            if (tweet.symbols[i].symbol === action.payload.allSymbols[j]) {
              numMatches++;
              console.log(numMatches);
              if (numMatches > 1) {
                break;
              }
            }
          }
          if (tweet.symbols[i].symbol === action.payload.termToRemove) {
            match = false;
          }
        }
        return numMatches > 1 ? true : match;
      });
      console.log(filteredTweets);
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
