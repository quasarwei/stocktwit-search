// note:
// term refers to the searchterm objects stored in searchterms state
// the object should contain three keys: symbol, count (number of tweets), lastTweetID
// symbol refers to the string entered as a searchterm, and one of the keys in a 'term' object

export const addTerm = term => ({
  type: 'ADD-TERM',
  payload: term
});

export const removeTerm = symbol => ({
  type: 'REMOVE-TERM',
  payload: symbol
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
