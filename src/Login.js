import * as React from 'react';
import submarine from './img/submarine.png';
import { Link } from 'react-router-dom';
import { validateFormElement } from './utils/utils';
import axios from "axios";
import Csrftoken from './Csrftoken';

//const Login = () => {
  class Login extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        invalidCredentials: false,
        serverError: false,
      };
      
    } 



  handleSubmit = (e) => {

    e.preventDefault();

    let csrftoken = this.getCookie('csrftoken');
    if(csrftoken === null) {
      csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      console.log('csrftoken wasnt in a cookie so retrieved from the DOM: ', csrftoken );
    }

    const user = {};
    // user.csrftoken = csrftoken;
    user.username = document.getElementById('emailField').value;
    user.password = document.getElementById('passwordField').value;

    console.log('credentials: ', user);

    /* Use axios to send the csrf token in header, csrf cookie, as well as user login info */
    axios.defaults.withCredentials = true
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    // axios.defaults.baseURL = 'https://algorithmoceanbackend.herokuapp.com/';

    // axios.post("/api/v1/users/auth/login/", user )
    // axios.post("/accounts/login/", user ) // server is sending back a login page, which isn't what we want
    
    // replace the '@' with %40 in the username
    // const username2 = user.username.replace('@', '%40');

 
    //let string = 'csrfmiddlewaretoken='+csrftoken+'&username='+username2+'&password='+user.password;
    // let string = 'username=\''+user.username+'\', password=\''+user.password+'\'';

    //username='john', password='secret'

    // console.log('string:', string);
    
    console.log("Attempting to use axios to login");

    axios.post("https://algorithmoceanbackend.herokuapp.com/authenticateUser/", user )
    // headers: {"X-CSRFToken": csrfToken},
    // axios.post("/authenticateUser/", string )
    // axios.post("/accounts/login/", user )
    // axios.get("/help/")
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        .catch(err => console.log(err));
    

    /* Alternate method to send the same info using fetch */
    //csrftoken = getCookie('csrftoken');


    let csrftokenCookieForSafari = 'cookie=' + csrftoken; // new for safari

    console.log("Attempting to fetch now manually adding the cookie to the header");

    fetch('https://algorithmoceanbackend.herokuapp.com/authenticateUser/', { // Production
    // fetch('/authenticateUser/', { // Development
      credentials: 'include',
      method: 'POST',
      // mode: 'same-origin', // Development
      mode: 'cors', // Production
      headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Content-Type': 'text/html; charset=utf-8',
        'X-CSRFToken': csrftoken,
        'cookie': csrftokenCookieForSafari // New for safari
      },
      //body: JSON.stringify(user)
      body: string
    })
    .then(res => res.json())
    .then(data => {
      console.log('data.result', data.result)

      if (data.result === 'NOT logged in') {
        localStorage.clear();
        this.setState({ invalidCredentials: true });
      } else if (data.result.username !== undefined) {
        console.log('logged in');
        localStorage.setItem('username', data.result.username);
        localStorage.setItem('first_name', data.result.first_name);
        localStorage.setItem('last_name', data.result.last_name);
        localStorage.setItem('is_active', data.result.is_active);
        localStorage.setItem('classCode', data.result.classCode);
        localStorage.setItem('accountType', data.result.accountType);
        let a = localStorage.getItem('username');
        console.log('in local storage: ', a);
        // window.location.replace('http://localhost:3000/dashboard'); // Development
        window.location.replace('https://stormy-sierra-07970.herokuapp.com/dashboard'); // Production
      } else {
        this.setState({ serverError: true });
      }
    }
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
      } else { */
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
  }
  
  render(){
    return (
      <div className="loginModal">
        {this.state.invalidCredentials && <div className='invalidCredentials'><p>Invalid username or password, please try again or contact your account administrator</p></div> }
        {this.state.serverError && <div className='invalidCredentials'><p>Sorry, something went wrong! Please check with your system administrator</p></div> }
        <div className='col1of2'>
          <img src={submarine} className="leftSidePic" alt="A submarine in the ocean floating above 5 fish and some seaweed"/>
        </div>
        <div className='col2of2'>
          <h1 className="loginTitle"><strong>Login to AlgorithmOcean</strong></h1>
          <form action="/" method="post" onSubmit={this.handleSubmit}>
            <Csrftoken />
            
            <p>
              <input
                aria-required="true"
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
                aria-required="true"
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
            <Link className="link" id="forgotPasswordLink" to="/forgotpassword">Forgot Password</Link>
            <input className='loginButton' type="submit" name="login" value="Login" />
            
          </form>
          
          <p className="smallText">New to Algorithm Ocean?</p>
          <Link className="link signup" to="/createaccount">Sign Up</Link>

        </div>

      </div>
  );}
}
 
/*         { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        */
export default Login;