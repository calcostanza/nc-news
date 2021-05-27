import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import User from './components/User';
import Nav from './components/Nav';
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle';

function App() {
  const [user] = useState({ username: 'tickle122' });
  return (
    <div className="App">
      <Router>
        <Home />
        <User user={user} />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/topic/:urlTopic">
            <Articles />
          </Route>
          <Route exact path="/articles/:article_id">
            <SingleArticle user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
