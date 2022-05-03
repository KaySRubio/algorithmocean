


/* NOT IN USE ANYMORE? */

import React, { useEffect, useState } from 'react';
import { setTheme } from './utils/themes';
import toggle1 from './img/toggle1.png';
import toggle2 from './img/toggle2.png';

function Toggle() {
  const [togClass, setTogClass] = useState('light');
  let theme = localStorage.getItem('theme');

  const handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-dark');
        setTogClass('dark')
    } else {
        setTheme('theme-light');
        setTogClass('light')
    }
  }
  
  // running when component mounts or updates, kinda like componentDidMount/componentDidUpdate for a functional component
  useEffect(() => {

    if (localStorage.getItem('theme') === 'theme-light') {
        setTogClass('light')
    } else if (localStorage.getItem('theme') === 'theme-dark') {
        setTogClass('dark')
    }
  }, [theme])

  return (
    <div>
        
        <button id="toggleButton" onClick={handleOnClick}>
          { togClass==='light' && <img src={toggle2} className="toggle" alt="A toggle switch that changes the background color from light to dark"/> }
          { togClass==='dark' && <img src={toggle1} className="toggle" alt="A toggle switch that changes the background color from light to dark"/> }
        </button>
    </div>
  )
}

export default Toggle;