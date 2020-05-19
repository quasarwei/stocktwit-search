export const addTerm = term => ({
  type: 'ADD-TERM',
  payload: term
});

export const removeTerm = term => ({
  type: 'REMOVE-TERM',
  payload: term
});

export const editTerm = term => ({
  type: 'EDIT-TERM',
  payload: term
});

export const addTweet = tweet => ({
  type: 'ADD-TWEET',
  payload: tweet
});

export const removeTweets = symbol => ({
  type: 'REMOVE-TWEETS',
  payload: symbol
});
