// import { ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { keepTheme } from './utils/themes';
import { useEffect } from 'react';import CreateAccount from './CreateAccount';
import Dashboard from './Dashboard';
import Demo from './Demo';
import Footer from './Footer';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Lesson from './Lesson';
import Login from './Login.js';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Token from './Token';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      a11yMessage: '',
    };
  }
  componentDidMount() {
    keepTheme();
  }

  componentDidUpdate() {
    keepTheme();
  }

  /*
  state = {
    a11yMessage: '',
  }; */

  updateLiveMessage = (message) => {
    console.log('this ran');
    console.log('message: ', message);

    this.setState({ a11yMessage: message });
  }

  render() {
    return (
      <div>
        <LiveAnnouncer>
          <LiveMessage message={this.state.a11yMessage} aria-live="polite" />
        </LiveAnnouncer>

        <Router>
        <div className="App">
          <div className="content">
            <Navbar
              updateLiveMessage={this.updateLiveMessage}
            />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/createaccount">
                <CreateAccount 
                  updateLiveMessage={this.updateLiveMessage}
                />
              </Route>
              <Route path="/login">
                <Login
                  updateLiveMessage={this.updateLiveMessage}
                />
              </Route>
              <Route path="/forgotpassword">
                <ForgotPassword />
              </Route>
              <Route path="/demo-lesson">
                <Lesson
                  updateLiveMessage={this.updateLiveMessage}
                />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
      
    </div>
    );
  }
}
/*
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
          <Route path="/dashboard">
            <Dashboard />
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

*/
export default App;