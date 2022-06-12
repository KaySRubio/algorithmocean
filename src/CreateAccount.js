import * as React from 'react';
import scuba from './img/scuba.png';
import { validateFormElement } from './utils/utils';
import axios from "axios";

class CreateAccount extends React.Component {
  constructor(props) {


    const axios = require('axios').default;
    //axios.defaults.baseURL = 'http://localhost:8000/';
    axios.defaults.baseURL = 'https://algorithmoceanbackend.herokuapp.com/';

    super(props);
    
    this.state = { 
      operation: this.defaultOperation, // Holds operation for user, with a default value, and updated by user clicks in ToolBox
    };
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    // Get account information that was entered in the form
    const newAccount = {};
    newAccount.first_name = document.getElementById('firstNameField').value;
    newAccount.last_name = document.getElementById('lastNameField').value;
    newAccount.email = document.getElementById('emailField').value;
    newAccount.password = document.getElementById('createPassword').value;
    newAccount.username = document.getElementById('emailField').value;
    newAccount.accountType = document.querySelector('input[name="accountType"]:checked').value;
    newAccount.classCode = document.getElementById('classCodeField').value;
    
    // Send to the server
    axios.post("/customusers/", newAccount )
    // axios.post("/api/customusers/", newAccount )
    // axios.post("/api/accounts/", newAccount )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        .catch(err => console.log(err));
      
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
    <div className="createAccountModal">
      <div className='col1of2'>
        <img src={scuba} className="leftSidePic" alt="A scuba diver in the ocean among some fish, rocks, and seaweed. The scuba diver is holding a clipboard and looking at a fish."/>
      </div>
      <div className='col2of2'>
        <h1 className="signupTitle">Create Account</h1>
        <form action="" method="post" onSubmit={this.handleSubmit}>
          <p>
            <input 
              aria-required="true"
              className='textInputSmall'
              id='firstNameField'
              maxLength="30"
              name="firstname"
              onChange={validateFormElement}
              placeholder='First Name *' 
              required 
              size="20" 
              type="text" 
            />
          </p>
          <p>
            <input
              aria-required="true"
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
              aria-required="true"
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
              aria-required="true"
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
            <p id="pwdletter" className="invalid">&nbsp;A <b>lowercase</b> letter</p>
            <p id="pwdcapital" className="invalid">&nbsp;A <b>capital (uppercase)</b> letter</p>
            <p id="pwdnumber" className="invalid">&nbsp;A <b>number</b></p>
            <p id="pwdlength" className="invalid">&nbsp;Minimum <b>8 characters</b></p>
          </div>
          <p id='accountTypeQ'>Account Type *<br />
            <input id='studentRadio' type="radio" name="accountType" value="1" required onChange={e => this.displayClassCode(e.target.value)}/>Student
            <input id='teacherRadio' type="radio" name="accountType" value="2" required onChange={e => this.displayClassCode(e.target.value)}/>Teacher
          </p>
          <p id='classCode' className='hidden'>
            <input 
              className='textInputSmall' 
              id='classCodeField'
              maxLength="30"
              name="classCode" 
              placeholder='Class Code'
              size="20"
              type="text" 
              />
          </p>
          <p className="smallText hidden" id="dontHaveOne">If you do not have one, please leave blank. You can always enter one later.</p>
          
          <input className='createAccountButton' type="submit" name="login" value="Create Account" />

        </form>

      </div>

    </div>
  );}
}

/* Taking out for now to keep it short 

          <p>
            <input className='textInputSmall' placeholder='School or University *' type="text" name="school" size="20" maxLength="30" />
          </p>
          <p>
            <input className='textInputSmall' placeholder='City *' type="text" name="city" size="20" maxLength="30" required aria-required="true"/>
          </p>

                    <p id='selectState'>State/Territory *</p>
          <select
            aria-required="true"
            id='stateField'
            defaultValue="MA" 
            required 
            >
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AS">American Samoa</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="GU">Guam</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="PR">Puerto Rico</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UM">US Minor Outlying Islands</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VI">Virgin Islands</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
            <option value="OUTSIDEUS">Outside the US</option>
          </select>	

*/
 
export default CreateAccount;