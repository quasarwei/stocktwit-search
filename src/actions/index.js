export const addTerm = term => ({
  type: 'add',
  payload: term
});

export const removeTerm = term => ({
  type: 'remove',
  payload: term
});

export const addTweet = tweet => ({
  type: 'add-tweet',
  payload: tweet
});

export const removeTweets = symbol => ({
  type: 'remove-tweets',
  payload: symbol
});
