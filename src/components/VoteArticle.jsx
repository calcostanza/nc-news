import React from 'react';
import { useState } from 'react';
import { AddVote } from '../utils/api';

const VoteArticle = ({ votes, article_id }) => {
  const [votesChange, setVotesChange] = useState(0);
  const incVotes = () => {
    setVotesChange((currVotes) => currVotes + 1);
    AddVote(article_id, { inc_votes: 1 }).catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Total likes: {votes + votesChange}</p>
      <button onClick={incVotes}>Like Article</button>
    </div>
  );
};
export default VoteArticle;
