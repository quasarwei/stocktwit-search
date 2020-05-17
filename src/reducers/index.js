import { combineReducers } from 'redux';

const searchTerms = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'add':
      // check if searchterm has already been entered
      const index = state.findIndex(
        term => term.symbol === action.payload.symbol
      );
      if (index === -1) {
        return [...state, action.payload];
      }
      return state;
    case 'remove':
      const indexToRemove = state.findIndex(
        term => term.symbol === action.payload.symbol
      );
      if (indexToRemove !== -1) {
        newState.splice(indexToRemove, 1);
      }
      // if (state.includes(action.payload.toUpperCase()))
      //   return state.remove(action.payload);
      return newState;
    default:
      return state;
  }
};

const tweets = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'add-tweet':
      return [...state, action.payload];
    case 'remove-tweets':
      return;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  searchTerms,
  tweets
});

export default allReducers;
