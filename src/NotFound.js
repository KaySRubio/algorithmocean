import { Link } from 'react-router-dom'

import anem2 from './img/anem2.png';

const NotFound = () => {
  return (
    <div className="notFound">
      <h2>Sorry, this page is still in development</h2>
      <img src={anem2} alt-text="An anemone with green body and pink tentacles that is smiling"/>
      <Link className="link" to="/">Go back to the homepage</Link>
    </div>
  );
}
 
export default NotFound;