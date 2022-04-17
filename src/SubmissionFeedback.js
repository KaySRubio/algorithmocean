import React from 'react';
import PropTypes from 'prop-types';

class SubmissionFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      answerCorrect: false, // controls what submission feedback looks like
    };
    console.log("programMoves", this.props.programMoves);
  }

  static get propTypes() {
    return {
      onClick: PropTypes.func,
      userMoves: PropTypes.array,
      programMoves: PropTypes.array,
    };
  }

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


  render(){
    return (
      <div>
        <div>
          <h2>Your Moves</h2>
          <ol className="movesList">
            {this.props.userMoves.map((item, index) => (
              <li key={index}
                className="movesListItem"
              >
                {item[0]} {item[1]} and {item[2]}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Program Moves</h2>
          <ol className="movesList">
            {this.props.programMoves.map((item, index) => (
              <li key={index}
                className="movesListItem"
              >
                {item[0]} {item[1]} and {item[2]}
              </li>
            ))}
          </ol>
        </div>
        { this.state.answerCorrect && <h3>Great job!</h3>}
      </div>
    );
  }
}

/* 

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