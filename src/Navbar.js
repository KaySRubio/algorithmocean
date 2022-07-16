import { Link } from 'react-router-dom';
import React from 'react';
import wave1 from './img/wave1.png';
import wave2 from './img/wave2.png';
import { setTheme } from './utils/themes';
import toggle1 from './img/toggle1.png';
import toggle2 from './img/toggle2.png';
import hamburgDark from './img/hamburgDark.png';
import hamburgLight from './img/hamburgLight.png';
import PropTypes from "prop-types";
import { checkIfLoggedIn, frontendUrl } from './utils/utils';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      theme: 'theme-light',
      loggedIn: false,
    }
  }
  static get propTypes() {
    return {
      updateLiveMessage: PropTypes.func,
    };
  }

  componentDidMount = () => {
    this.setState({ 
      theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme-light',
      location: '',
    });
    this.setState({ loggedIn: checkIfLoggedIn() });
  }

  handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-dark');
        this.setState({ theme: 'theme-dark' });
    } else {
        setTheme('theme-light');
        this.setState({ theme: 'theme-light' });
    }
  }

  openClosePhoneMenu = () => {
    const phoneDropdown = document.getElementById('phoneDropdown');
    if ( phoneDropdown.getAttribute('class') === 'notHidden' ) {
      phoneDropdown.setAttribute('class', 'hidden');
      document.getElementById('menuButton').setAttribute('aria-label', 'Open menu');
    } else {
      phoneDropdown.setAttribute('class', 'notHidden');
      document.getElementById('menuButton').setAttribute('aria-label', 'Close menu');
    }
  }

  logout = () => {
    localStorage.clear(); // for now logging out just clears out account info from local storage. In future may send logout to django
    this.props.updateLiveMessage('You have been logged out. Redirecting to the home page.');
    this.setState({ loggedIn: false });
    window.location.replace(frontendUrl); 
  }

  render(){
    return (
      <header className="navbar">
        <div className='phone-only'>
          { this.state.theme==='theme-light' && <button aria-label='Open menu' id="menuButton" onClick={this.openClosePhoneMenu}><img src={hamburgDark} className="hamburg" alt="A menu button"/></button> }
          { this.state.theme==='theme-dark' && <button aria-label='Open menu' id="menuButton" onClick={this.openClosePhoneMenu}><img src={hamburgLight} className="hamburg" alt="A menu button"/></button> }
          <nav aria-label='Mobile Menu' className='hidden' id='phoneDropdown' role='navigation'>

            { this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/dashboard">Dashboard</Link>}
            { this.state.loggedIn && <br /> }
            <Link className="link navbarlink phoneDropdownLink" to="/">Home</Link>
            <br />
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/bubble">Bubble Sort</Link>}
            { !this.state.loggedIn && <br /> }
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/insertion">Insertion Sort</Link>}
            { !this.state.loggedIn && <br /> }
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/selection">Selection Sort</Link>}
            { !this.state.loggedIn && <br /> }
            <Link className="link navbarlink phoneDropdownLink" to="/account">Account</Link>
            <br />
            <Link className="link navbarlink phoneDropdownLink" to="/about">About</Link>
            <br />
            <br />
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/createaccount">Create Account</Link>}
            <br />
            { !this.state.loggedIn && <Link className="link navbarlink phoneDropdownLink" to="/login">Login</Link>}
            { this.state.loggedIn && <button className="navbarButton navbarlink phoneDropdownLink" onClick={this.logout}>Logout</button>}
          </nav>
        </div>
        <div id="logo">
          <p><strong>AlgorithmOcean</strong></p>
          { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that looks like a blue ocean wave"/> }
          { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that looks like a blue ocean wave"/> }
        </div>
        <button id="toggleButton" onClick={this.handleOnClick}>
          { this.state.theme==='theme-light' && <img src={toggle2} className="toggle" alt="A toggle switch that changes the background color from light to dark"/> }
          { this.state.theme==='theme-dark' && <img src={toggle1} className="toggle" alt="A toggle switch that changes the background color from light to dark"/> }
        </button>
        <nav aria-label='Menu' id='menurow1' role='navigation'>
            { this.state.loggedIn && <Link className="link navbarlink" to="/dashboard">Dashboard</Link>}
            <Link className="link navbarlink" to="/">Home</Link>
            { this.state.loggedIn && <Link className="link navbarlink" to="/account">Account</Link>}
            { !this.state.loggedIn && <Link className="link navbarlink" to="/createaccount">Create Account</Link>}
            { !this.state.loggedIn && <Link className="link navbarlink" to="/login">Login</Link>}
            <Link className="link navbarlink" to="/about">About</Link>
            { this.state.loggedIn && <button className="navbarButton navbarlink" onClick={this.logout}>Logout</button>}
        </nav>
      </header>
    );
  }
}

export default Navbar;