import React from 'react';
import PropTypes from 'prop-types';
import arrow from './img/arrow.png';

class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      directionNum: -1, // Will hold current place of the direction number. 
                        // Starts at -1 so directions don't try to render before initialized
    };
  }

  static get propTypes() {
    return {
      onClick: PropTypes.func,
      sortType: PropTypes.string,
      closeModal: PropTypes.func,
      isQuiz: PropTypes.bool,
    };
  }

  componentDidMount(){
    this.createDirections();
    document.getElementById('helpModal').focus();
  }

  directions = []; // Array will hold algorithm-specific directions, arrow positions, and button IDs

  createDirections() {
    let submitButtonArrowLocation;
    if (this.props.isQuiz) submitButtonArrowLocation = '435px';
    else submitButtonArrowLocation = '605px';

    if (this.props.sortType === 'Insertion') {
      /* array of directions will hold 
         (0) Direction that displays on the screen
         (1) Text for the button below the direction that either moves to the next direction or closes the modal
         (2) Additional direction text for screen-reader users who may not be able to see the arrow/visual setup
         (3-4) Top and left position of the arrow that pertains to this direction
         (5) Name of CSS animation for the arrow including it's rotation
      */

      this.directions = [
        ['Click on a number',       'Next', 
          '. The number buttons are in the activity region.', 
          '145px', '485px', 'grow 1s ease-in-out infinite',
        ],
        ['Click on a triangle where you want to insert the number',     'Next', 
          '. The triangle buttons are in the activity region.', 
          '225px', '130px', 'growRotate45 1s ease-in-out infinite'
        ],
        ['You can undo your moves anytime',     'Next', 
          '. The undo button is in the toolbox region.', 
          '405px', '245px', 'growRotate270 1s ease-in-out infinite'
        ],
        ['You can mark what numbers you sorted with the \'Mark Sorted\' tool',      'Next', 
          '. The mark sorted button is in the toolbox region. After selecting it, click on a number button in the activity region.', 
          '405px', '130px', 'growRotate270 1s ease-in-out infinite'
        ],
        ['Make sure you click on \'Insert\' again to keep sorting',       'Next', 
          '. The Insert button is in the toolbox region.', 
          '405px', '10px', 'growRotate270 1s ease-in-out infinite'
        ],
        ['When the array is sorted, a Submit button will appear. Click it when you are done',       'Next', 
          '. The submit button is in the toolbox region', 
          '405px',  submitButtonArrowLocation, 'growRotate270 1s ease-in-out infinite'
        ],
        ['Check out the other tools in the toolbox. The \'Help\' button will bring back these directions. Happy sorting!',     'Got it!', 
          '. The help button is in the toolbox region.', 
          '405px', '335px', 'growRotate270 1s ease-in-out infinite'
        ],
      ];
    }

    else {
      this.directions = [
        ['Click on a number',       'Next', 
          '. The number buttons are in the activity region.', 
          '215px', '130px', 'growRotate90 1s ease-in-out infinite'
        ],
        ['Click on another number to swap them',      'Next', 
          '. The number buttons are in the activity region.', 
          '215px', '180px', 'growRotate90 1s ease-in-out infinite'
        ],
        ['You can undo your moves anytime',       'Next', 
          '. The undo button is in the toolbox region.',  
          '405px', '245px', 'growRotate270 1s ease-in-out infinite'
        ],
        ['You can mark what numbers you sorted with the \'Mark Sorted\' tool',      'Next', 
          '. The mark sorted button is in the toolbox region. After selecting it, click on a number button in the activity region.',
          '405px', '130px', 'growRotate270 1s ease-in-out infinite'
        ],
        ['Make sure you click on \'Swap\' again to keep sorting',       'Next', 
          '. The swap button is in the toolbox region.',
          '405px', '10px', 'growRotate270 1s ease-in-out infinite'
        ],
        ['When the array is sorted, a Submit button will appear in the toolbox. Click it when you are done',       'Next', 
          '. The submit button is in the toolbox region',  
          '405px', submitButtonArrowLocation, 'growRotate270 1s ease-in-out infinite'
        ],
        ['Check out the other tools in the toolbox. The \'Help\' button will bring back these directions. Happy sorting!',     'Got it!', 
          '. The help button is in the toolbox region.', 
          '405px', '335px', 'growRotate270 1s ease-in-out infinite'
        ],
      ];
    }
    this.setState({ directionNum: 0 }); // Allow first direction to render by updating directionNum
  }

  directionClickHandler = () => {
    if(this.state.directionNum >= this.directions.length-1) {
      this.props.closeModal();
    // else go to next direction by updating directionNum state variable
    } else {
      this.setState((prevState) => ({
        directionNum: prevState.directionNum + 1
      })); 
      document.getElementById('directionText').focus();
    }
  }

  render(){
    return (
      <>
        <aside
          aria-label='Directions'
          id="helpModal"
          role='region'
          tabIndex='-1'
        >
          <h2>Directions</h2>
          <button
            aria-label='close directions'
            id='closeHelp' 
            className="closeButton" 
            onClick={this.props.onClick} >
              X
          </button>

          <p id='directionText' tabIndex='-1'>
            {this.state.directionNum > -1 ? this.directions[this.state.directionNum][0] : ''}
            <span className='sr-only'>{this.state.directionNum > -1 ? this.directions[this.state.directionNum][2] : ''}</span>
          </p>
          <button
            aria-label={this.state.directionNum >= this.directions.length-1 ? 'This was the last direction. Close directions.' : 'Next direction'}
            onClick={this.directionClickHandler}
            className="nextButton" 
          >
            {this.state.directionNum > -1 ? this.directions[this.state.directionNum][1] : 'Next'}
          </button>

        </aside>
        <img
          alt=''
          className='helpArrow' 
          src={arrow}
          style={{
            top: this.state.directionNum > -1 ? this.directions[this.state.directionNum][3] : '500px',
            left: this.state.directionNum > -1 ? this.directions[this.state.directionNum][4] : '335px', 
            animation: this.state.directionNum > -1 ? this.directions[this.state.directionNum][5] : 'growRotate270 1s ease-in-out infinite'
          }}
          />
      </>
    );
  }
}

// alt={this.state.directionNum > -1 ? this.directions[this.state.directionNum][2] : 'An arrow'}

export default HelpModal;
