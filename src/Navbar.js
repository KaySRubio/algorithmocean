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
    }
  }

  componentDidMount = () => {
    this.setState({ 
      theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme-light',
      location: '',
    });
    console.log("theme starting as: ", this.state.theme);


    
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

  render(){
    return (
      <div className="navbar">
        <div className='phone-only'>
          { this.state.theme==='theme-light' && <button id="menuButton" onClick={this.openClosePhoneMenu}><img src={hamburgDark} className="hamburg" alt="A menu button"/></button> }
          { this.state.theme==='theme-dark' && <button id="menuButton" onClick={this.openClosePhoneMenu}><img src={hamburgLight} className="hamburg" alt="A menu button"/></button> }
          <div id='phoneDropdown' className='hidden' >
            <Link className="link navbarlink phoneDropdownLink" to="/">Home</Link> <br />
            <Link className="link navbarlink phoneDropdownLink" to="/contact">Contact</Link> <br />
            <Link className="link navbarlink phoneDropdownLink" to="/login">Login</Link> <br />
            <Link className="link navbarlink phoneDropdownLink" to="/createaccount">Create Account</Link> <br />
            <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/bubble">Demo Bubble Sort</Link> <br /> 
            <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/insertion">Demo Insertion Sort</Link> <br />
            <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/selection">Demo Selection Sort</Link> <br />
          </div>
        </div>

        <div id="logo">
          <p><strong>AlgorithmOcean</strong></p>
          { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
          { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        </div>
        <div id='menu'>

          <Link className="link navbarlink" to="/">Home</Link>
          <Link className="link navbarlink" to="/contact">Contact</Link>
          <Link className="link navbarlink" to="/login">Login</Link>
          <Link className="link navbarlink" to="/createaccount">Create Account</Link>
          
          <div className='dropdown'>
            <p>Try one!</p>
            <div className='dropdownContent'>
                <Link className="link" to="/demo-lesson/bubble">Bubble Sort</Link>
                <br />
                <Link className="link" to="/demo-lesson/insertion">Insertion Sort</Link>
                <br />
                <Link className="link" to="/demo-lesson/selection">Selection Sort</Link>
            </div>
          </div>
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