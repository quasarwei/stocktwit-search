import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm } from '../actions';
import './tweetcard.css';

export default function TweetCard(props) {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const makeBody = () => ({
    __html: props.tweet.body
  });

  return (
    <div className="tweet">
      {/* this method puts users at risk to xss attacks, try and find another way */}
      <p className="tweet__body" dangerouslySetInnerHTML={makeBody()}></p>
      <h4 className="tweet__user">{props.tweet.user.username}</h4>
    </div>
  );
}
