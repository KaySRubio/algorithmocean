import { Link } from 'react-router-dom';
import React from 'react';
import Toggle from './Toggle';
import wave1 from './img/wave1.png';
import wave2 from './img/wave2.png';
import { setTheme } from './utils/themes';
import toggle1 from './img/toggle1.png';
import toggle2 from './img/toggle2.png';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      theme: 'theme-light',
    }
  }

  componentDidMount = () => {
    this.setState({ theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme-light' });
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


  render(){
    return (
      <div className="navbar">
        <div id="logo">
          <p><strong>AlgorithmOcean</strong></p>
          { this.state.theme === 'theme-light' && <img src={wave1} className="logowave" title="dark blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
          { this.state.theme === 'theme-dark' && <img src={wave2} className="logowave" title="light blue wave" alt="Algorithm Ocean logo that includes a blue ocean wave"/> }
        </div>
        <Link className="link navbarlink" to="/">Home</Link>
        <Link className="link navbarlink" to="/contact">Contact</Link>
        <Link className="link navbarlink" to="/login">Login</Link>
        <Link className="link navbarlink" to="/createaccount">Create Account</Link>
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