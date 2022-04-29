// import { ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login.js';
import Demo from './Demo';
import Lesson from './Lesson';
import NotFound from './NotFound';
import { keepTheme } from './utils/themes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    keepTheme();
  })

  return (
    <Router>
    <div className="App">
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/createaccount">
            <CreateAccount />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/demo">
            <Demo />
          </Route>
          <Route path="/lesson">
            <Lesson />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
  );
}
export default App;