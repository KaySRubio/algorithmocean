// import { ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { keepTheme } from './utils/themes';
import CreateAccount from './CreateAccount';
import About from './About';
import Dashboard from './Dashboard';
import Footer from './Footer';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Lesson from './Lesson';
import Login from './Login.js';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Terms from './Terms';
import Privacy from './Privacy';
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

  updateLiveMessage = (message) => {
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
              <Route path="/about">
                <About />
              </Route>
              <Route path="/terms">
                <Terms />
              </Route>
              <Route path="/privacy">
                <Privacy />
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

export default App;