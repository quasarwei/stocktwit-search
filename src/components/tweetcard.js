import React from 'react';
import { Stwt } from '../helpers/stocktwits-text';

import './tweetcard.css';

export default function TweetCard(props) {
  const newBody = Stwt.txt.autoLinkCashtags(props.tweet.body, {
    urlTarget: '_blank',
    urlNofollow: true
  });

  const makeBody = () => ({
    __html: newBody
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
    </div>
  );
}
