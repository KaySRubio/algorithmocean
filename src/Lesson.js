import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';
import { Tween, Ease } from "@createjs/tweenjs";
import { useState } from 'react';


class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      operation: 'None',
      stack: [], // Stack will hold all moves of user, with each move being it's own 2-number array
    };
    this.numbers = []; // array for the numbers that will be sorted
  }



  componentDidMount = () => {
    this.initializeArray();
    this.init();
  }

  // Global variables
  canvasClicks = 0;
  operandContainers = [];
  stage = {};
  stackPointer = 0; // Will point to top of the stack and be used to remove move during undo operation

  // Initialize an array of 6 elements with random numbers [10-100]
  initializeArray = () => {
    this.numbers[0] = this.randomNumBetween10and100();
    for (let i = 1; i < 6; i++ ) {
      let m = this.randomNumBetween10and100();
      while(this.numbers.includes(m)){
        m = this.randomNumBetween10and100();
      }
      this.numbers[i] = m;
    }
    // console.log('array is ', this.numbers);
  }

  randomNumBetween10and100 = () => {
      let m = Math.floor(Math.random()*100);
      while(m < 10) {
        m = Math.floor(Math.random()*100);
      }
      return m;
  }

  // todo sort array then re-call initializeArray if the list is too close to sorted

  // Initialize the createJS canvas
  init() {
    let x = 10;
    let y = 10;
    this.stage = new Stage('demoCanvas');

    let textSquares = [];

    for (let i = 0; i < this.numbers.length; i++ ) {
        textSquares[i] = this.makeTextSquare(x, y, this.numbers[i]);
        this.stage.addChild(textSquares[i]);
        x += 50;
    }
    this.stage.update(); 
  }

  makeTextSquare(x, y, num){
    let textSquare = new Container();
    let square = new Shape();
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(x, y, 46, 35);
    square.addEventListener('click', this.handleCanvasClick)

    let text = new Text(num, '30px Arial', 'white');
    text.textBaseline = "alphabetic";
    text.x = x+6;
    text.y = y+28;

    textSquare.addChild(square, text);
    return textSquare;
  }


  handleCanvasClick = (event) => {

    if (this.state.operation === 'None') {
      alert("Hint: Choose a tool from the toolbox");
    } else {
      // increment canvasClicks since the user clicked on a canvas element
      this.canvasClicks++;

      // Store the clicked number and the element location
      this.operandContainers[this.canvasClicks-1] = event.target.parent;
      
      // first canvasClick just move the element down a little
      this.operandContainers[this.canvasClicks-1].y+=10;
      this.stage.update();

      if (this.canvasClicks===1) {
        // 
      } else { // second canvasClick run operation if clicked on 2 different elements
        this.canvasClicks = 0; // reset canvasClicks to 0
        // if the clicked on the same element twice move it back to where it was
        if (this.operandContainers[0] === this.operandContainers[1]) {
            this.operandContainers[0].y=0;
            this.stage.update();
        // if the two clicks were the same as the last 2 clicks (without regard to order), run the undo operation
        } else if (
          this.stackPointer > 0
          && ((
            this.operandContainers[0] === this.state.stack[this.stackPointer-1][1]
            && this.operandContainers[1] === this.state.stack[this.stackPointer-1][2]
          ) || (
            this.operandContainers[1] === this.state.stack[this.stackPointer-1][1]
            && this.operandContainers[0] === this.state.stack[this.stackPointer-1][2]
          )) 
        ) {
        this.undoLastMove()
      // process two unique clicks
        } else {
            this.operandContainers[1].y+=10;
            this.stage.update();
            // todo store both operands on a stack of what was switched
            let operandA = this.operandContainers[0].children[1].text;
            let operandB = this.operandContainers[1].children[1].text;
            // Add them both to stateful stack variable in order from larger to smaller
            if (operandA > operandB) { 
              this.setState(prevState => ({
                stack: [...prevState.stack, [ this.state.operation, this.operandContainers[0], this.operandContainers[1] ]]
              }))
            } else { 
              this.setState(prevState => ({
                stack: [...prevState.stack, [ this.state.operation, this.operandContainers[1], this.operandContainers[0] ]]
              }))
            }
            this.stackPointer++; // increment the stack pointer
            this.runOperation();

        }
      }
    }
  }

  runOperation(){
      switch (this.state.operation) {
          case 'Swap':
            this.swap();
            break;
          case 'split':
              console.log("splitting");
              break;
          case 'merge':
            console.log('splitting');
            break;
          default:
              break;
      }
  }

  swap(){

    let operandA = this.state.stack[this.stackPointer-1][1];
    let operandB = this.state.stack[this.stackPointer-1][2];

    let distance = operandA.getTransformedBounds().x - operandB.getTransformedBounds().x;
    let pow = 4;

    Tween.get(operandA)
      .to({ y: 40, x: operandA.x+distance/2*-1 }, 500, Ease.getPowIn(pow))
      .to({ y: 0, x: operandA.x+distance*-1 }, 500, Ease.getPowOut(pow)); 
    Tween.get(operandB)
      .to({ y: 80, x: operandB.x+distance/2 }, 500, Ease.getPowIn(pow))
      .to({ y: 0, x: operandB.x+distance }, 500, Ease.getPowOut(pow));

    Ticker.addEventListener("tick", this.stage);

    // todo - remove event listener at some point after animations are done?

  }

  // Click event on toolbox button will call setOperation which will 
  // set the operation state variable to the id of the button that was clicked 
    toolboxClickHandler = (event) => {
    if (event.target.id === 'undo') {
      this.undoLastMove();
    } else {
      this.setState({
        operation: event.target.id
      });
    }

  }

  undoLastMove() {
    if (this.stackPointer > 0) {
      this.swap(); // swap the elements back
      this.stackPointer--;
      // Pop off the last element on the stack of moves
      let arr = [...this.state.stack];
      arr.length = this.stackPointer; // chop off last element of array copy
      this.setState( {stack: arr } );
    }
  }
  

  render(){
    return (
        <div className="lesson">
            <Navbar/>
            <h1>Lesson</h1>
            <div id="activity">
                <h2>Question 2</h2>
                <div>
                  <h3>Your moves:</h3>
                  <ol className="movesList">
                    {this.state.stack.map((item, index) => (
                      <li key={index}
                        className="movesListItem"
                      >
                        {item[0]} {item[1].children[1].text} and {item[2].children[1].text}
                      </li>
                    ))}
                  </ol>
                  </div>
                <canvas id="demoCanvas" className={this.state.operation} width="1000" height="100">
                </canvas>
                <p>hello</p>
            </div>
            <Toolbox onClick={this.toolboxClickHandler}/>
        </div>
      );
  }

}

export default Lesson;