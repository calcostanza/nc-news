import React from 'react';
import { useState } from 'react';
import { addVote } from '../utils/api';

const VoteArticle = ({ votes, article_id }) => {
  const [votesChange, setVotesChange] = useState(0);
  const incVotes = () => {
    setVotesChange((currVotes) => currVotes + 1);
    addVote(article_id, { inc_votes: 1 }).catch((err) => console.log(err));
  };

  return (
    <div className="single--article--likes">
      <p>Likes: {votes + votesChange}</p>
      <button onClick={incVotes}>Like Article</button>
    </div>
  );
};
export default VoteArticle;
