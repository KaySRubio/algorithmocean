// import { ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login.js';
import Demo from './Demo';
import ForgotPassword from './ForgotPassword';
import Lesson from './Lesson';
import NotFound from './NotFound';
import { keepTheme } from './utils/themes';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Token from './Token';

function App() {
  useEffect(() => {
    keepTheme();
  })


  return (
    <Router>
    <div className="App">
      <div className="content">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/createaccount">
            <CreateAccount 
            />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/demo-lesson">
            <Lesson />
          </Route>

          <Route path="/token">
            <Token />
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