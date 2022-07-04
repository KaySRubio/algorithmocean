import React from 'react';
import PropTypes from 'prop-types';
import swap from './img/swap1.png';
import undo from './img/undo2.png';
import insert from './img/insert1.png';
import mark from './img/mark1.png';
// import hint from './img/hint1.png'; // removed hints button for now
import video from './img/video1.png';
import questionMark from './img/q.png';
import checkmark from './img/checkmark.png';


class Toolbox extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onClick: PropTypes.func,
      enableSubmit: PropTypes.bool,
      sortType: PropTypes.string,
      activeTool: PropTypes.string, // Used to help button that's activeTool have inner shadow
      isQuiz: PropTypes.bool,
      hidden: PropTypes.bool,
    };
  }

  render(){
    return (
      <aside 
        aria-label='Toolbox'
        aria-hidden={this.props.hidden}
        id="toolbox"
        role='region'
      >
          <h2>Toolbox</h2>
          { this.props.sortType === 'Insertion' ? 
          <button
            aria-label='Insert an array element before another array element'
            aria-pressed={this.props.activeTool === 'Insert' ? true : false}
            className={`toolboxButton ${this.props.activeTool}`}
            id='Insert' 
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
          >
            <img src={insert} alt=''/>
            Insert
            </button> 
          : 
          <button
            aria-label='Swap array elements'
            aria-pressed={this.props.activeTool === 'Swap' ? true : false}
            className={`toolboxButton ${this.props.activeTool}`}
            id='Swap' 
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
          >
            <img src={swap} alt=''/>
            Swap
          </button> }
          <button 
            aria-label='Mark array elements as sorted'
            aria-pressed={this.props.activeTool === 'markSorted' ? true : false}
            className={`toolboxButton ${this.props.activeTool}`}
            id='markSorted' 
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
          >
            <img src={mark} alt=''/>
            Mark Sorted
          </button>
          <button 
            aria-label='Undo your last move'
            className='toolboxButton' 
            id='undo' 
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
          >
            <img src={undo} alt=''/>
            Undo
          </button>
          <button
            aria-label='Open directions'
            className='toolboxButton' 
            id='help' 
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
          >
            <img src={questionMark} alt=''/>
            Help
          </button>
          { !this.props.isQuiz && <button
            aria-label='Open help video'
            className='toolboxButton' 
            id='video' 
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
          >
            <img src={video} alt=''/>
            Show me a video
          </button> }

          <button
            aria-disabled={!this.props.enableSubmit}
            aria-label='Submit your answer when complete'
            className='toolboxButton' 
            disabled={!this.props.enableSubmit}
            id='submit'
            onClick={this.props.onClick}
            tabIndex={this.props.hidden ? '-1' : '0'}
            >
            <img src={checkmark} alt=''/>
              Submit
            </button>
      </aside>
    );
  }
}

// aria-pressed={this.props.activeTool}

/* Removed hints button for now
          <button 
            className='toolboxButton' 
            id='hint' 
            onClick={this.props.onClick}
          >
            <img src={hint} alt="Lightbulb for hints."/>
            Give me a hint
          </button>
*/

export default Toolbox;

