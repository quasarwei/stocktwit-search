import React from 'react';
import './tweetcard.css';

export default function TweetCard(props) {
  const makeBody = () => ({
    __html: props.tweet.body
  });

  const tweet_time = new Date(props.tweet.created_at);

  return (
    <div className="tweet">
      <div className="tweet-heading">
        <div className="user-info">
          <img
            className="user-info__avatar"
            src={props.tweet.user.avatar_url}
            alt="avatar"
          />
          <h4 className="tweet__user">{props.tweet.user.username}</h4>
        </div>
        <span className="date">
          {tweet_time.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
      {/* this method puts users at risk to xss attacks, try and find another way */}
      <p className="tweet__body" dangerouslySetInnerHTML={makeBody()}></p>
      {/* <p className="tweet__body" >{props.tweet.body}</p> */}
      {/* <span>{tweet_time}</span> */}
    </div>
  );
}
