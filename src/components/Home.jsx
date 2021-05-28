import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <header className="Header">
      <h1>
        <Link to="/">TRENDING NEWS!</Link>
      </h1>
    </header>
  );
};

export default Home;
