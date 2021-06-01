import { useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
const { capitalizeTheFirstLetterOfEachWord } = require('../utils/functions');

const Nav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <nav className="Nav btn-group">
      <ul>
        <li className="nav--topic nav--button">
          <Link to="/">Home</Link>
        </li>
        {topics.map((topic) => {
          return (
            <li className="nav--topic nav--button " key={topic.slug}>
              <Link to={`/topic/${topic.slug}`}>
                {capitalizeTheFirstLetterOfEachWord(topic.slug)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
