import * as React from 'react';
import submarine from './img/submarine.png';
import { Link } from 'react-router-dom';
import { validateFormElement } from './utils/utils';
import axios from "axios";

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get account information that was entered in the form
    const credentials = {};
    credentials.username = document.getElementById('emailField').value;
    credentials.password = document.getElementById('createPassword').value;

    
    /*
    // Send to the server
    axios.post("/api/customusers/", newAccount )
    // axios.post("/api/accounts/", newAccount )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        .catch(err => console.log(err));
    */

  }

  return (
    <div className="loginModal">
      <div className='col1of2'>
        <img src={submarine} className="leftSidePic" alt="A submarine in the ocean floating above 5 fish and some seaweed"/>
      </div>
      <div className='col2of2'>
        <h1 className="loginTitle"><strong>Login to AlgorithmOcean</strong></h1>
        <form action="" method="get" onSubmit={handleSubmit}>
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
              id='createPassword'
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