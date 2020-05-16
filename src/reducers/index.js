import { combineReducers } from 'redux';

const searchTerms = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'add':
      if (!state.includes(action.payload.toUpperCase())) {
        // console.log(action.payload);
        return [...state, action.payload.toUpperCase()];
      }
      return state;
    case 'remove':
      let element = state.indexOf(action.payload.toUpperCase());
      if (element != null) {
        newState.splice(element, 1);
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
    default:
      return state;
  }
};

const allReducers = combineReducers({
  searchTerms,
  tweets
});

export default allReducers;
