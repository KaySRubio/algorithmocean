import { Link } from 'react-router-dom'

import anemsmile from './img/anemsmile.png';

const ForgotPassword = () => {
  return (
    <div className="forgotPassword">
      <h2>Forgot Password</h2>
      <img src={anemsmile} alt="An anemone with green body and pink tentacles that is smiling"/>
      <Link className="link" to="/">Go back to the homepage</Link>
    </div>
  );
}
 
export default ForgotPassword;