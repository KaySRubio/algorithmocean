import * as React from 'react';
import submarine from './img/submarine.png';
import { Link } from 'react-router-dom';
import { validateFormElement } from './utils/utils';
import axios from "axios";
import Csrftoken from './Csrftoken';

const Login = () => {

  const handleSubmit = (e) => {

    e.preventDefault();

    let csrftoken = getCookie('csrftoken');

    const user = {};
    // user.csrftoken = csrftoken;
    user.username = document.getElementById('emailField').value;
    user.password = document.getElementById('passwordField').value;

    console.log('credentials: ', user);

    /* Use axios to send the csrf token in header, csrf cookie, as well as user login info */
    axios.defaults.withCredentials = true
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    
    // axios.post("/api/v1/users/auth/login/", user )
    // axios.post("/accounts/login/", user ) // server is sending back a login page, which isn't what we want
    
    // replace the '@' with %40 in the username
    const username2 = user.username.replace('@', '%40');

 
    //let string = 'csrfmiddlewaretoken='+csrftoken+'&username='+username2+'&password='+user.password;
    let string = 'username=\''+user.username+'\', password=\''+user.password+'\'';

    //username='john', password='secret'

    // console.log('string:', string);
    
    /*
    // axios.post("/authenticateUser/", user )
    // axios.post("/authenticateUser/", string )
    axios.post("/accounts/login/", user )
    // axios.get("/help/")
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        .catch(err => console.log(err));
    */

    /* Alternate method to send the same info using fetch */
    //csrftoken = getCookie('csrftoken');

    fetch('/authenticateUser/', {
    //fetch('/help/', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Content-Type': 'text/html; charset=utf-8',
        'X-CSRFToken': csrftoken
      },
      //body: JSON.stringify(user)
      body: string
    })
    //.then(res => res.json())
    .then(data => {
      if (data.key) {
        console.log('logged in with data: ', data);
        localStorage.clear();
        localStorage.setItem('token', data.key);
        //window.location.replace('http://localhost:3000/dashboard');
      } else {
        console.log('not logged in?');
        /*
        setEmail('');
        setPassword('');
        localStorage.clear();
        setErrors(true); */
      }
    });
        
  }
  
  function getCookie(name) {
    let cookieValue = null;
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
  

  return (
    <div className="loginModal">
      <div className='col1of2'>
        <img src={submarine} className="leftSidePic" alt="A submarine in the ocean floating above 5 fish and some seaweed"/>
      </div>
      <div className='col2of2'>
        <h1 className="loginTitle"><strong>Login to AlgorithmOcean</strong></h1>
        <form action="/" method="post" onSubmit={handleSubmit}>
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
  );
}
 
/*         { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        */
export default Login;