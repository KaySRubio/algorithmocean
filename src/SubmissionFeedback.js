import React from 'react';
import PropTypes from 'prop-types';
import video from './img/video1.png';
import incorrectX from './img/incorrectX.png';
import correctCheck from './img/correctCheck.png';
import { Link } from 'react-router-dom';
import { checkIfLoggedIn } from './utils/utils';

class SubmissionFeedback extends React.Component {
  constructor(props) {
    super(props);
    /* this.state = { 
      answerCorrect: false, // controls what submission feedback looks like
    }; */

    console.log("correct?", this.props.correct);
  }

  componentDidMount() {
    document.getElementById('feedback').focus();
  }

  static get propTypes() {
    return {
      userMoves: PropTypes.array,
      programMoves: PropTypes.array,
      array: PropTypes.array,
      sortType: PropTypes.string,
      correct: PropTypes.bool,
      onClick: PropTypes.func,
    };
  }

  /* 
  componentDidMount = () => {
    this.setState({ answerCorrect: this.UserVsProgram() });
  } 

  UserVsProgram() {
    console.log("userMoves: ", this.props.userMoves);
    console.log("programMoves: ", this.props.programMoves);

    if (this.props.userMoves.length !== this.props.programMoves.length) return false;
    let i;
    for(i = 0; i < this.props.userMoves.length; i++) {
      if( this.props.userMoves[i][0] !== this.props.programMoves[i][0]) return false;
      if( this.props.userMoves[i][1] !== this.props.programMoves[i][1]) return false;
      if( this.props.userMoves[i][2] !== this.props.programMoves[i][2]) return false;
    }

    console.log("Great job");


    return true;
  }
  */


  render(){
    return (
      <main 
        aria-label='Feedback After Activity Completion'
        id="feedback"
        role='region'
        tabIndex='-1'
      >
        <h1>{this.props.sortType} Sort</h1>
        <p className='center'>Sort from left to right, smallest to biggest</p>
        <br />
        <p className="center">
          <span className='sr-only'>Original array was&nbsp;</span>
          [{this.props.array.join(', ')}]
        </p>
        <div id="movesListLeft" className="movesList">
          <h2>Your Moves</h2>
          <ol>
            {this.props.userMoves.map((item, index) => (
              <li key={index}
                className="movesListItem"
              >
                {item[0]}ed {item[1]}
                {item[0]==='Insert' ? ' before ' : ' and '}
                {item[2]}
              </li>
            ))}
          </ol>
        </div>
        <div id="movesListRight" className="movesList">
          <h2>Program Moves</h2>
          <ol>
            {this.props.programMoves.map((item, index) => (
              <li key={index}
                className="movesListItem"
              >
                {item[0]} {item[1]} 
                {item[0]==='Insert' ? ' before ' : ' and '}
                {item[2]}
              </li>
            ))}
          </ol>
        </div>
        {this.props.correct ? 
          <div id="correctFeedback">
            <p className="center" id="greatJob">Great job!</p>
            <img src={correctCheck} className="feedbackImg" alt="Green checkmark for answer correct."/>
          </div> :
          
          <div id="incorrectFeedback">
            <img src={incorrectX} className="feedbackImg" alt="Red X mark for incorrect answer."/>
            <button
              aria-label='Watch a video to learn more'
              className='toolboxButton' 
              id='video' 
              onClick={this.props.onClick}
            >
            <img src={video} alt=''/>
            Learn more here
            </button>
          </div>
          
        }
        {checkIfLoggedIn() ? 
          <Link className="link submissionFeedbackReturn" to="/dashboard">Return to Dashboard</Link> :
          <Link className="link submissionFeedbackReturn" to="/">Return Home</Link>
        }
        
      </main>
    );
  }
}


/* 
{item[2]}: [{item[3].join(', ')}] 
{ this.state.answerCorrect && <h3 className="center" id="greatJob">Great job!</h3>}


          <ol className="movesList">
            {this.props.userMoves.map((item, index) => (
              <li key={index}
                className="movesListItem"
              >
                {item[0]} {item[1]} and {item[2]}: [{item[3].join(', ')}]
              </li>
            ))}
          </ol>

          <ol className="movesList">
            {this.props.programMoves.map((item, index) => (
              <li key={index}
                className="movesListItem"
              >
                {item[0]} {item[1]} and {item[2]}
              </li>
            ))}
          </ol>
*/

export default SubmissionFeedback;