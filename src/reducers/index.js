const searchTerms = (state = [], action) => {
  // const newState = [...state];
  switch (action.type) {
    case 'add':
      if (!state.includes(action.payload.toUpperCase())) {
        console.log(action.payload);
        console.log(state);
        return [...state, action.payload.toUpperCase()];
        return state.push(action.payload.toUpperCase());
      }
      return state;
    case 'remove':
      if (state.includes(action.payload.toUpperCase()))
        return state.remove(action.payload);
      return state;
    default:
      return state;
  }
};

export default searchTerms;
