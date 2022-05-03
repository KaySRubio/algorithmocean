import React from 'react';
import PropTypes from 'prop-types';
import swap from './img/swap1.png';
import undo from './img/undo1.png';
import insert from './img/insert1.png';
import mark from './img/mark1.png';


class Toolbox extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onClick: PropTypes.func,
      showSubmit: PropTypes.bool,
      sortType: PropTypes.string,
      activeTool: PropTypes.string, // Used to help button that's activeTool have inner shadow
    };
  }

  render(){
    return (
      <aside id="toolbox">
          <h2>Toolbox</h2>
          { this.props.sortType === 'Insertion' ? 
          <button 
            className={`toolboxButton ${this.props.activeTool}`}
            id='Insert' 
            onClick={this.props.onClick}
          >
            <img src={insert} alt="Insert symbol that looks a single arrow pointing up."/>
            Insert
            </button> 
          : 
          <button 
          className={`toolboxButton ${this.props.activeTool}`}
          id='Swap' 
          onClick={this.props.onClick}
          >
            <img src={swap} alt="Swap symbol that looks like a U-shaped curve with arrows pointing up."/>
            Swap
          </button> }
          <button 
            className={`toolboxButton ${this.props.activeTool}`}
            id='markSorted' 
            onClick={this.props.onClick}
          >
            <img src={mark} alt="Paintbrush symbol for marking an element as sorted."/>
            Mark Sorted
          </button>
          <button 
            className='toolboxButton' 
            id='undo' 
            onClick={this.props.onClick}
          >
            <img src={undo} alt="Undo symbol that looks an arrow pointing backwards."/>
            Undo
          </button>
          {this.props.showSubmit && <button 
            className='toolboxButton' 
            id='submit'
            onClick={this.props.onClick}
            >Submit</button>}
      </aside>
    );
  }
}

export default Toolbox;

