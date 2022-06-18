import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import wave1 from './img/wave1.png';
import wave2 from './img/wave2.png';
import { setTheme } from './utils/themes';
import toggle1 from './img/toggle1.png';
import toggle2 from './img/toggle2.png';
import hamburgDark from './img/hamburgDark.png';
import hamburgLight from './img/hamburgLight.png';
// import PropTypes from "prop-types";
// import { withRouter } from "react-router";

class Navbar extends React.Component {

  /*
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }; */

  constructor(props) {
    super(props);
    this.state = { 
      theme: 'theme-light',
      loggedIn: false,
    }

  }

  componentDidMount = () => {
    this.setState({ 
      theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme-light',
      location: '',
    });
    // console.log("theme starting as: ", this.state.theme);

    // Check if they are logged in based on their name being in local storage
    const first_name = localStorage.getItem('first_name');
    console.log('first_name', first_name);
    if (first_name !== null && first_name !== undefined && first_name !== 'undefined') {
      console.log('setting state to loggedIn');
      this.setState({ loggedIn: true });
    }

  }

  handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-dark');
        this.setState({ theme: 'theme-dark' });
    } else {
        setTheme('theme-light');
        this.setState({ theme: 'theme-light' });
    }
    console.log("updated theme to: ", this.state.theme);
  }

  openClosePhoneMenu = () => {
    const phoneDropdown = document.getElementById('phoneDropdown');
    if ( phoneDropdown.getAttribute('class') === 'notHidden' ) {
      phoneDropdown.setAttribute("class", "hidden");
    }
    else phoneDropdown.setAttribute("class", "notHidden");
  }

  logout = () => {
    localStorage.clear(); // for now logging out just clears out account info from local storage. In future may send logout to django
    // window.location.replace('http://localhost:3000/'); // Development
    window.location.replace('https://stormy-sierra-07970.herokuapp.com/'); // Production
  }

  render(){
    return (
      <div className="navbar">
        <div className='phone-only'>
          { this.state.theme==='theme-light' && <button id="menuButton" onClick={this.openClosePhoneMenu}><img src={hamburgDark} className="hamburg" alt="A menu button"/></button> }
          { this.state.theme==='theme-dark' && <button id="menuButton" onClick={this.openClosePhoneMenu}><img src={hamburgLight} className="hamburg" alt="A menu button"/></button> }
          <div id='phoneDropdown' className='hidden' >
            { this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/dashboard">Dashboard</Link>}
            { this.state.loggedIn && <br /> }
            <Link className="link navbarlink phoneDropdownLink" to="/">Home</Link>
            <br />
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/bubble">Demo Bubble Sort</Link>}
            { !this.state.loggedIn && <br /> }
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/insertion">Demo Insertion Sort</Link>}
            { !this.state.loggedIn && <br /> }
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/selection">Demo Selection Sort</Link>}
            { !this.state.loggedIn && <br /> }
            <Link className="link navbarlink phoneDropdownLink" to="/account">Account</Link>
            <br />
            <Link className="link navbarlink phoneDropdownLink" to="/contact">Contact</Link>
            <br />
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/createaccount">Create Account</Link>}
            <br />
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/login">Login</Link>}
            { this.state.loggedIn && <button className="navbarButton navbarlink phoneDropdownLink" onClick={this.logout}>Logout</button>}
          </div>
        </div>

        <div id="logo">
          <p><strong>AlgorithmOcean</strong></p>
          { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
          { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        </div>
        <div id='menu'>
          { !this.state.loggedIn && <Link className="link navbarlink" to="/login">Login</Link>}
          { this.state.loggedIn && <button className="navbarButton navbarlink" onClick={this.logout}>Logout</button>}
          <Link className="link navbarlink" to="/contact">Contact</Link>
          { !this.state.loggedIn && <Link className="link navbarlink" to="/login">Login</Link>}
          { !this.state.loggedIn && <Link className="link navbarlink" to="/createaccount">Create Account</Link>}
          
          { !this.state.loggedIn && <div className='dropdown'>
            <p>Try one!</p>
            <div className='dropdownContent'>
                <Link className="link" to="/demo-lesson/bubble">Bubble Sort</Link>
                <br />
                <Link className="link" to="/demo-lesson/insertion">Insertion Sort</Link>
                <br />
                <Link className="link" to="/demo-lesson/selection">Selection Sort</Link>
            </div> 
          </div> }

          { this.state.loggedIn && <Link className="link navbarlink" to="/account">Account</Link>}
          
          
          <Link className="link navbarlink" to="/">Home</Link>
          { this.state.loggedIn && <Link className="link navbarlink" to="/dashboard">Dashboard</Link>}
        </div>

        <button id="toggleButton" onClick={this.handleOnClick}>
          { this.state.theme==='theme-light' && <img src={toggle2} className="toggle" alt="A toggle switch that changes the background color from light to dark"/> }
          { this.state.theme==='theme-dark' && <img src={toggle1} className="toggle" alt="A toggle switch that changes the background color from light to dark"/> }
        </button>

        
      </div>
    );
  }
}

/*
<Toggle />

{ this.state.theme === 'theme-light' && <p>dark blue wave</p> }
        { this.state.theme === 'theme-dark' && <p>light blue wave</p> }

        { this.state.theme === 'theme-light' && <img src={wave1} className="toggle" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        { this.state.theme === 'theme-dark' && <img src={wave2} className="toggle" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }

*/

export default Navbar;