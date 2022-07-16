import * as React from 'react';
import scuba from './img/scuba.png';
import { validateFormElement, backendUrl } from './utils/utils';
import axios from "axios";
import PropTypes from 'prop-types';

class CreateAccount extends React.Component {
  constructor(props) {
    const axios = require('axios').default;
    axios.defaults.baseURL = backendUrl;
    super(props);
    
    this.state = { 
      operation: this.defaultOperation, // Holds operation for user, with a default value, and updated by user clicks in ToolBox
      error: false,
      accountCreated: false,
    };
    this.errorMsg = '';
  }

  static get propTypes() {
    return {
      updateLiveMessage: PropTypes.func,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: false });
    this.setState({ accountCreated: false });
    
    // Get account information that was entered in the form
    const newAccount = {};
    newAccount.first_name = document.getElementById('firstNameField').value; // temporarily commenting out for django
    newAccount.last_name = document.getElementById('lastNameField').value; // temporarily commenting out for django
    newAccount.email = document.getElementById('emailField').value; // temporarily commenting out for django
    newAccount.password = document.getElementById('createPassword').value;
    newAccount.username = document.getElementById('emailField').value;
    newAccount.accountType = document.querySelector('input[name="accountType"]:checked').value; // temporarily commenting out for django
    newAccount.classCode = document.getElementById('classCodeField').value; // temporarily commenting out for django
    
    // Send to the server
    axios.post("/customusers/", newAccount )
      .then(res => {
        this.setState({ accountCreated: true });
        this.props.updateLiveMessage('Account created successfully. Please go to login page.');
      })
        .catch(err => {
          let rawError = ''
          if (err.response.data) {
            rawError = JSON.stringify(err.response.data);
          }
          if (rawError.includes('A user with that username already exists')) {
            this.errorMsg = 'Error! A user with that email already exists';
            this.props.updateLiveMessage('Error! A user with that email already exists.'); 
          } else {
            this.errorMsg = 'An error has occurred. Please check with your system administrator.';
            this.props.updateLiveMessage('An error has occurred. Please check with your system administrator.');
            console.log(rawError);
          }
          this.setState({ error: true });
        });
  }

  displayClassCode = (value) => {
    const classCode = document.getElementById('classCode');
    const dontHaveOne = document.getElementById('dontHaveOne');

    if (value === '1') {
      classCode.setAttribute('class', 'notHidden');
      dontHaveOne.setAttribute('class', 'notHidden');
    }
    else {
      classCode.setAttribute('class', 'hidden');
      dontHaveOne.setAttribute('class', 'hidden');
    }
  }

  render(){
    return (
    <main className="createAccountModal">
      {this.state.error && <div className='invalidCredentials'><p>{this.errorMsg}</p></div> }
      {this.state.accountCreated && <div className='successMsg'><p>Success! Your account has been created. Please go to login page.</p></div> }
      <div className='col1of2'>
        <img src={scuba} className="leftSidePic" id='leftSidePicCreateAccount' alt="A scuba diver in the ocean among some fish, rocks, and seaweed. The scuba diver is holding a clipboard and looking at a fish."/>
      </div>
      <div className='col2of2'>
        <h1 className="signupTitle">Create Account</h1>
        <form action="" method="post" onSubmit={this.handleSubmit}>
          <p className="smallText">All fields marked with * are required</p>
          <p>
            <input 
              aria-label='First Name'
              aria-required="true"
              autoComplete='given-name'
              className='textInputSmall'
              id='firstNameField'
              maxLength="30"
              name="firstname"
              onChange={validateFormElement}
              placeholder='First Name *' 
              size="20" 
              type="text" 
            />
          </p>
          <p>
            <input
              aria-label='Last Name'
              aria-required="true"
              autoComplete='family-name'
              className='textInputSmall' 
              id='lastNameField'
              maxLength="30"
              name="lastname"
              onChange={validateFormElement}
              placeholder='Last Name *'
              required
              size="20"
              type="text" 
            />
          </p>

          <p>
            <input 
              aria-label='Email'
              aria-required="true"
              autoComplete='email'
              className='textInputSmall'
              id='emailField'
              maxLength="30"
              minLength='8'
              name="email" 
              onChange={validateFormElement}
              placeholder='Email *'
              required 
              size="20"  
              type="email" 
            />
          </p>
          <p>
            <input
              aria-label='Password'
              aria-required="true"
              autoComplete='new-password'
              className='textInputSmall'
              id='createPassword'
              maxLength="30" 
              name="password"
              onChange={validateFormElement}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder='Password *'
              required 
              size="20"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              type="password"
            />
          </p>
          <div id="passwordRequirements" className='hidden'>
            <p>Password must contain:</p>
            <p
              className="invalid" 
              id="pwdletter" 
              >
              <span aria-hidden='true'>&#10006;</span>
              &nbsp;A <b>lowercase</b> letter
              <span className='sr-only'>. Your password does not yet meet this requirement. Please update.</span>
            </p>
            <p
              className="invalid"
              id="pwdcapital" 
              >
              <span aria-hidden='true'>&#10006;</span>
              &nbsp;A <b>capital (uppercase)</b> letter
              <span className='sr-only'>. Your password does not yet meet this requirement. Please update.</span>
            </p>
            <p
              className="invalid"
              id="pwdnumber" 
              >
              <span aria-hidden='true'>&#10006;</span>
              &nbsp;A <b>number</b>
              <span className='sr-only'>. Your password does not yet meet this requirement. Please update.</span>
            </p>
            <p
              className="invalid"
              id="pwdlength" 
              >
              <span aria-hidden='true'>&#10006;</span>
              &nbsp;Minimum <b>8 characters</b>
              <span className='sr-only'>. Your password does not yet meet this requirement. Please update.</span>
            </p>
          </div>

          <fieldset id='accountTypeQ'>
            <legend>Account Type *</legend>
            <label htmlFor='studentRadio'>Student</label>
            <input
              id='studentRadio'
              name="accountType"
              onChange={e => this.displayClassCode(e.target.value)}
              required 
              type="radio" 
              value="1" 
            /><br />
            <label htmlFor='teacherRadio'>Teacher</label>
            <input
              id='teacherRadio'
              name="accountType"
              onChange={e => this.displayClassCode(e.target.value)}
              required 
              type="radio" 
              value="2" 
            />
          </fieldset>
          <p id='classCode' className='hidden'>
            <input
              aria-label='Class Code'
              className='textInputSmall' 
              id='classCodeField'
              maxLength="30"
              name="classCode" 
              placeholder='Class Code'
              size="20"
              type="text" 
              />
          </p>
          <p className="smallText hidden" id="dontHaveOne">If you do not have a class code, please leave blank. You can enter one later.</p>
          <input className='createAccountButton' type="submit" name="login" value="Create Account" />
        </form>
      </div>
    </main>
  );}
}
 
export default CreateAccount;