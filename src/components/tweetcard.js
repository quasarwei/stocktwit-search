import React from 'react';
import twitter from 'twitter-text';
import '../services/stocktwits-text';

import './tweetcard.css';

export default function TweetCard(props) {
  // const makeBody = () => ({
  //   __html: props.tweet.body
  // });

  const makeBody = () => ({
    // __html: props.tweet.body
    __html: twitter.autoLink(twitter.htmlEscape(props.tweet.body))
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
          <h4 className="tweet__user">
            <a
              href={`https://stocktwits.com/${props.tweet.user.username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.tweet.user.username}
            </a>
          </h4>
        </div>
        <a
          className="date"
          href={`https://stocktwits.com/${props.tweet.user.username}/message/${props.tweet.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tweet_time.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </a>
      </div>
      {/* this method puts users at risk to xss attacks, try and find another way */}
      <p className="tweet__body" dangerouslySetInnerHTML={makeBody()}></p>
      {/* <p className="tweet__body"> */}
      {/*   {twitter.autoLink(twitter.htmlEscape(props.tweet.body))} */}
      {/* </p> */}
      {/* <p className="tweet__body">{props.tweet.body}</p> */}
      {/* <p className="tweet__body" >{props.tweet.body}</p> */}
      {/* <span>{tweet_time}</span> */}
    </div>
  );
}
