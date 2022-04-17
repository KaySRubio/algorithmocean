import React from 'react';
import PropTypes from 'prop-types';

class Toolbox extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onClick: PropTypes.func,
      showSubmit: PropTypes.bool,
    };
  }


  render(){
    return (
      <aside id="toolbox">
          <h2>Toolbox</h2>
          <button 
            className='toolboxButton' 
            id='Swap' 
            onClick={this.props.onClick}
          >Swap</button>
          <button 
            className='toolboxButton' 
            id='undo' 
            onClick={this.props.onClick}
          >Undo</button>
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

