import React from 'react';
import PropTypes from 'prop-types';


class VideoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onClick: PropTypes.func,
      sortType: PropTypes.string,
    };
  }

  getVideo() {
    if(this.props.sortType === 'Insertion') return "https://www.youtube.com/embed/JU767SDMDvA";
    else if (this.props.sortType === 'Selection') return "https://www.youtube.com/embed/g-PGLbMth_g";
    else if (this.props.sortType === 'Bubble') return "https://www.youtube.com/embed/xli_FI7CuzA";
    else console.warn("Invalid sort type ", this.props.sortType, " passed to VideoModal");
  }

  render(){
    return (
      <aside
        aria-label='Help Video'
        id="videoModal"
        role='region'
      >
        <button 
          id='closeVideo' 
          className="closeButton" 
          onClick={this.props.onClick} 
        >X</button>
        <iframe 
          src={this.getVideo()}
          title='Video Explaining how to do the algorithm'
        ></iframe> 
      </aside>
    );
  }
}

export default VideoModal;

