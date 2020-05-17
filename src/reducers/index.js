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
      // if (state.find(tweet => tweet.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'remove-tweets':
      const filteredTweets = state.filter(tweet => {
        let match = true;
        for (let i = 0; i < tweet.symbols.length; i++) {
          if (tweet.symbols[i].symbol === action.payload) {
            match = false;
          }
        }
        return match;
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
