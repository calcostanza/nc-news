import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <header className="Header">
      <h1>
        <Link to="/">News APP Name</Link>
      </h1>
    </header>
  );
};

export default Home;
