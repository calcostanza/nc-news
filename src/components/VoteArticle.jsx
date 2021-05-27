import React from 'react';
import { useState } from 'react';
import { AddVote } from '../utils/api';

const VoteArticle = ({ votes, article_id }) => {
  const [votesChange, setVotesChange] = useState(0);
  const incVotes = (event) => {
    event.preventDefault();
    AddVote(article_id, { inc_vote: votesChange }).then((response) => {
      setVotesChange((currVotes) => currVotes + 1
      return { ...currVotes, response };
    });
  };

  return (
    <div>
      <p>Total likes: {votes + votesChange}</p>
      <button onClick={incVotes}>Like Article</button>
    </div>
  );
};
export default VoteArticle;

// likes don't match the articles likes

// {inc_votes : 1 }
