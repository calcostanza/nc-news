import { useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
const { capitalizeTheFirstLetterOfEachWord } = require('../utils/functions');

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <nav className="Nav">
      <ul>
        <li className="nav--topic">
          <Link to="/">Home</Link>
        </li>
        {topics.map((topic) => {
          return (
            <li className="nav--topic" key={topic.slug}>
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
