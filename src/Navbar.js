import { Link } from 'react-router-dom';
import React from 'react';
import Toggle from './Toggle';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="navbar">
        <h2>Navbar</h2>
        <Link className="link" to="/">Back to the homepage...</Link>
        <Toggle />
      </div>
    );
  }
}

export default Navbar;