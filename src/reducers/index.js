const searchTerms = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'add':
      if (!newState.includes(action.payload.toUpper()))
        return newState.add(action.payload.toUpper());
      return newState;
    case 'remove':
      if (newState.includes(action.payload.toUpper()))
        return newState.remove(action.payload);
      return newState;
    default:
      return state;
  }
};

export default searchTerms;
