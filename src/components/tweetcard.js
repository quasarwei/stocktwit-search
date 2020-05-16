import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTerm } from '../actions';

export default function TweetCard(props) {
  return (
    <div>
      <h3>{props.tweet.body}</h3>
      <h4>{props.tweet.user.username}</h4>
    </div>
  );
}
