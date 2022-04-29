import React, { useEffect, useState } from 'react';
import './styles/colors.css';
import { setTheme } from './utils/themes';

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
  
  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTogClass('light')
    } else if (localStorage.getItem('theme') === 'theme-dark') {
        setTogClass('dark')
    }
  }, [theme])

  return (
        <div className="container--toggle">
           <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
        </div>
    )
}

export default Toggle;