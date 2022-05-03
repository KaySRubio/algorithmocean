import { Link } from 'react-router-dom'

import anemsmile from './img/anemsmile.png';

const NotFound = () => {
  return (
    <div className="notFound">
      <h2>Sorry, this page is still in development</h2>
      <img src={anemsmile} alt="An anemone with green body and pink tentacles that is smiling"/>
      <Link className="link" to="/">Go back to the homepage</Link>
    </div>
  );
}
 
export default NotFound;