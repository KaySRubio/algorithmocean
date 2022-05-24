import * as React from 'react';
import scuba from './img/scuba.png';
import { validateFormElement } from './utils/utils';

class CreateAccount extends React.Component {

  displayClassCode = (value) => {
    const classCode = document.getElementById('classCode');
    const dontHaveOne = document.getElementById('dontHaveOne');

    if (value === 'student') {
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
        <form action="" method="get">
          <p>
            <input 
              className='textInputSmall' 
              placeholder='First Name *' 
              type="text" 
              name="firstname"
              onChange={validateFormElement}
              size="20" 
              maxLength="30"
              required 
              aria-required="true"
            />
          </p>
          <p>
            <input 
              className='textInputSmall' 
              placeholder='Last Name *' 
              type="text" 
              name="lastname"
              onChange={validateFormElement}
              size="20" 
              maxLength="30" 
              required 
              aria-required="true"
            />
          </p>
          <p>
            <input 
              aria-required="true"
              className='textInputSmall'
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
            <input type="radio" name="accountType" value="student" required onChange={e => this.displayClassCode(e.target.value)}/>Student
            <input type="radio" name="accountType" value="teacher" required onChange={e => this.displayClassCode(e.target.value)}/>Teacher
          </p>

          <p id='selectState'>State/Territory *</p>
          <select defaultValue="MA" required aria-required="true">
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

          <p id='classCode' className='hidden'>
            <input 
              className='textInputSmall' 
              placeholder='Class Code' 
              type="text" 
              name="classCode" 
              size="20" 
              maxLength="30" />
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

*/
 
export default CreateAccount;