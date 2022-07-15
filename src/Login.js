import * as React from 'react';
import submarine from './img/submarine.png';
import { Link } from 'react-router-dom';
import axios from "axios";
import Csrftoken from './Csrftoken';
import PropTypes from 'prop-types';
import { validateFormElement, backendUrl, frontendUrl, getCookie } from './utils/utils';

//const Login = () => {
class Login extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { 
      invalidCredentials: false,
      serverError: '',
    };
      
  } 

  static get propTypes() {
    return {
       updateLiveMessage: PropTypes.func,
    };
  }

  componentDidMount() {
    if(!navigator.cookieEnabled) {
      this.setState({ serverError: 'It appears that your browser has cookies disabled.  Please enable cookies before trying to log in.' });
      console.warn('Browser has cookies disabled. Site may not work properly.');
    }
    if(navigator.userAgent.includes('Safari') && navigator.vendor.includes('Apple')) {
      this.setState({ serverError: 'To login using Safari, please make sure the \'Prevent Cross Site Tracking\' setting is turned off (Safari turns it on by default). Go to Preferences, Privacy tab.' });
    }
  }

  handleSubmit = (e) => {

    e.preventDefault();

    let csrftoken = getCookie('csrftoken');
    if(csrftoken === null) {
      csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      console.log('csrftoken wasnt in a cookie so retrieved from the DOM: ', csrftoken );
    }

    const user = {};
    user.username = document.getElementById('emailField').value;
    user.password = document.getElementById('passwordField').value;

    console.log('credentials: ', user);

    let string = 'username=\''+user.username+'\', password=\''+user.password+'\'';
    console.log("Fetch Request with ", string);
    // fetch(backendUrl + 'authenticateUser/', { // Production
    // fetch('https://algorithmoceanbackend.herokuapp.com/authenticateUser/', { // Or try this one Production
    fetch('/authenticateUser/', { // Development
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin', // Development
      // mode: 'cors', // Production
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/html; charset=utf-8',
        'X-CSRFToken': csrftoken,
      },
      body: string
    })
    .then(res => {
      console.log('res: ', res);
      
      if (!res.ok) {
        res.status && console.log('res.status: ', res.status);
        this.tryAxios(csrftoken, string);
      }
      
      return res.json();

      })
    .then(data => {
      data && console.log('data', data);
      data.result && console.log('data.result', data.result)
      
      if (data.result === 'NOT logged in') {
        this.props.updateLiveMessage('Invalid username or password. Please check your username or password and try again.');
        console.log("invalid credentials");
        localStorage.clear();
        this.setState({ invalidCredentials: true });
      } else if (data.result.username !== undefined) {
        this.props.updateLiveMessage('You have successfully logged in. Redirecting you to the dashboard.');
        localStorage.setItem('id', data.result.id);
        localStorage.setItem('username', data.result.username);
        localStorage.setItem('first_name', data.result.first_name);
        localStorage.setItem('last_name', data.result.last_name);
        localStorage.setItem('is_active', data.result.is_active);
        localStorage.setItem('classCode', data.result.classCode);
        localStorage.setItem('accountType', data.result.accountType);
        let username = localStorage.getItem('username');
        console.log(username + 'logged in');
        window.location.replace(frontendUrl + 'dashboard');
      } else {
        this.tryAxios(csrftoken, string);
      }
    }
    // .catch( err => console.error(`Fetch problem: ${err.message}`) 
    /*.then(res => {
      console.log(res.json().Object.result);*/
    /*
    .then(data => {
      console.log(data); */
      
      /*if (data.key) {
        console.log('logged in with data: ', data);
        localStorage.clear();
        localStorage.setItem('token', data.key);
        //window.location.replace('http://localhost:3000/dashboard');
      } else { 
        */
        //console.log('not logged in?'); 
        /*
        setEmail('');
        setPassword('');
        localStorage.clear();
        setErrors(true); */
      //}
    //}
    );
        
  }
  
  tryAxios(csrftoken, string) {
    console.log("trying to login via an axios request with csrftoken: ", csrftoken);

    // Use axios to send the csrf token in header, csrf cookie, as well as user login info 
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8 ';

    axios.post(backendUrl + 'authenticateUser/', string, { withCredentials: true }) // added this again to see if this helps
    // headers: {"X-CSRFToken": csrfToken},
      .then(res => {
        console.log(res);
      })
      .then(data => {
        this.props.updateLiveMessage('You have successfully logged in. Redirecting you to the dashboard.');
        localStorage.setItem('username', data.result.username);
        localStorage.setItem('first_name', data.result.first_name);
        localStorage.setItem('last_name', data.result.last_name);
        localStorage.setItem('is_active', data.result.is_active);
        localStorage.setItem('classCode', data.result.classCode);
        localStorage.setItem('accountType', data.result.accountType);
        let username = localStorage.getItem('username');
        console.log(username + 'logged in');
        window.location.replace(frontendUrl + 'dashboard');
      })
      .catch(err => {
        console.log(err);
        this.setState({ serverError: 'Sorry, something went wrong! Please check with your system administrator.' });
        this.props.updateLiveMessage('An error has occurred. Please check with your system administrator.');
        // localStorage.clear();

      })
    

  }

  /*
  getCookie(name) {
    let cookieValue = null;
    console.log('getCookie method is running in Login and this is document.cookie: ', document.cookie);
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  } */
  
  render(){
    return (
      <main className="loginModal">
        {this.state.invalidCredentials && <div className='invalidCredentials'><p>Invalid username or password, please try again or contact your account administrator</p></div> }
        {this.state.serverError && <div className='invalidCredentials'><p>{this.state.serverError}</p></div> }
        <div className='col1of2'>
          <img src={submarine} className="leftSidePic" alt="A submarine in the ocean floating above 5 fish and some seaweed"/>
        </div>
        <div className='col2of2'>
          <h1 className="loginTitle"><strong>Login to AlgorithmOcean</strong></h1>
          <form action="/" method="post" onSubmit={this.handleSubmit}>
            <Csrftoken />
            
            <p>
              <input
                aria-label='Email'
                aria-required="true"
                autoComplete='email'
                className='textInput'
                id='emailField'
                maxLength="30" 
                name="email"
                onChange={validateFormElement}
                placeholder='Email'
                required 
                size="20" 
                type="email"
              />
            </p>
            <p>
              <input
                aria-label='Password'
                aria-required="true"
                autoComplete='current-password'
                className='textInput'
                id='passwordField'
                maxLength="30"
                minLength='8'
                name="password"
                onChange={validateFormElement}
                placeholder='Password'
                required 
                size="20" 
                type='password'
                />
            </p>
            
            <input className='loginButton' type="submit" name="login" value="Login" />
            
          </form>
          
          <p className="smallText">New to Algorithm Ocean?</p>
          <Link className="link signup" to="/createaccount">Sign Up</Link>

        </div>

      </main>
  );}
}

// <Link className="link" id="forgotPasswordLink" to="/forgotpassword">Forgot Password</Link>
 
/*         { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        */
export default Login;