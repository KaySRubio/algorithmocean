import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';
import { Tween, Ease } from "@createjs/tweenjs";
import { useState } from 'react';
// import AccessibilityModule from 'CurriculumAssociates/createjs-accessibility';
// import AccessibilityModule from '@curriculumAssociates/createjs-accessibility';
// import { AccessibilityModule } from '@curriculumassociates/createjs-accessibility/src'; - does not work, babel error unresolvable


class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      operation: 'None',
      stack: [], // Stack will hold all moves of user, including operation, both numbers swapped, and resulting array
    };
    this.numbers = []; // array for the numbers that will be sorted
    this.workingNumbers = []; // parallel array of numbers user will sort
    // this.workingNumbersAuditTrail = []; // A non-state variable to hold the workingNumbers at any point in time
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
  sortType = 'Bubble'; 
  maxNumberOfOperations = 20;

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
    // copy final array into userCopy
    this.workingNumbers = [...this.numbers];

  }

  randomNumBetween10and100 = () => {
      let m = Math.floor(Math.random()*100);
      while(m < 10) {
        m = Math.floor(Math.random()*100);
      }
      return m;
  }

  // todo sort array then re-call initializeArray if the list is too close to sorted

  /* 
  sort(this.sortType);

  sort(type) = () => {
    switch(type)
  } */
  /*
  BubbleSort(array){
    for i -> 0 to arrayLength 
       for j -> 0 to (arrayLength - i - 1)
        if arr[j] > arr[j + 1]
          swap(arr[j], arr[j + 1])
  }
  */




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

  // Method to make a CreateJS text square which consists of a container, square, and text
  makeTextSquare(x, y, num){
    let textSquare = new Container(); // create container
    /* CANNOT USE CAM DOES NOT RUN 
    AccessibilityModule.register({ // Register it to HTML for accessiblity for KN/SR users
      displayObject: textSquare,
      role: AccessibilityModule.ROLES.NONE,
    }); */

    let square = new Shape(); // create square
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(x, y, 46, 35);
    square.addEventListener('click', this.handleCanvasClick) // click event on square

    let text = new Text(num, '30px Arial', 'white'); // create text
    text.textBaseline = "alphabetic";
    text.x = x+6; // positioning text so it's in the center of the square
    text.y = y+28;

    /* CANNOT USE CAM DOES NOT RUN
    AccessibilityModule.register({ // Register text to HTML for accessiblity for KN/SR users
      displayObject: text,
      role: AccessibilityModule.ROLES.HEADING3,
      parent: textSquare,
      accessibleOptions: {
        text: num,
      },
    });*/

    textSquare.addChild(square, text); // put the square and the text in the container
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
        // don't allow more moves if they've hit 20
        } else if ( this.stackPointer >= this.maxNumberOfOperations ) {
          alert("You should not need more than 20 operations");
          this.operandContainers[0].y=0;
          this.operandContainers[1].y=0;
          this.stage.update();
        // process two unique clicks 
        } else {
            this.operandContainers[1].y+=10;
            this.stage.update();
            this.runOperation();

        }
      }
    }
  }

  runOperation(){
    this.stackPointer++; // increment the stack pointer
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

  visualSwap(containerA, containerB){
    // Get the distance between them on the screen for visual swapping
    const distance = containerA.getTransformedBounds().x - containerB.getTransformedBounds().x;
    const pow = 4;
    // Tween the createJS containers for a visual swap
    Tween.get(containerA)
      .to({ y: 40, x: containerA.x+distance/2*-1 }, 500, Ease.getPowIn(pow))
      .to({ y: 0, x: containerA.x+distance*-1 }, 500, Ease.getPowOut(pow)); 
    Tween.get(containerB)
      .to({ y: 80, x: containerB.x+distance/2 }, 500, Ease.getPowIn(pow))
      .to({ y: 0, x: containerB.x+distance }, 500, Ease.getPowOut(pow));
    
    Ticker.addEventListener("tick", this.stage);
    // todo - remove event listener at some point after animations are done?
  }

  swap(){

    // Get the numbers of what was swapped, make sure the larger one is in numA

    let numA, numB; 
    if(this.operandContainers[0].children[1].text > this.operandContainers[1].children[1].text) {
      numA = this.operandContainers[0];
      numB = this.operandContainers[1];
    } else {
      numA = this.operandContainers[1];
      numB = this.operandContainers[0];
    }

    // Swap the operands in the users copy of the array; get numeric operand's indices
    let indexA = this.workingNumbers.indexOf(numA.children[1].text);
    let indexB = this.workingNumbers.indexOf(numB.children[1].text);
    // swap
    [this.workingNumbers[indexA], this.workingNumbers[indexB]] = [this.workingNumbers[indexB], this.workingNumbers[indexA]]
    
    // Copy workingNumbers into a static temporary version to write to stack
    const auditTrail = [...this.workingNumbers];

    // Add 4 objects to the stack of user moves including 1) operation, 2-3) numeric operands in order from larger to smaller, 4) resulting array
    this.setState(prevState => ({
      stack: [...prevState.stack, [ this.state.operation, numA, numB, auditTrail ]]
    }))

    this.visualSwap(numA, numB);

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
      // swap the elements back visually
      this.visualSwap(this.state.stack[this.stackPointer-1][1], this.state.stack[this.stackPointer-1][2]);

      this.stackPointer--;

      // Revert workingNumbers back to the move 1 before or back to the original array
      if(this.stackPointer > 0) { this.workingNumbers = [...this.state.stack[this.stackPointer-1][3]];} 
      else { this.workingNumbers = [...this.numbers]; }

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
            <div className={this.state.operation} id="activity">
              <h1>Sort from left to right using {this.sortType} Sort</h1>
              <div id="yourMoves">
                <h3>Your moves:</h3>
                <ol className="movesList">
                  {this.state.stack.map((item, index) => (
                    <li key={index}
                      className="movesListItem"
                    >
                      {item[0]} {item[1].children[1].text} and {item[2].children[1].text}: [{item[3].join(', ')}]
                    </li>
                  ))}
                </ol>
                </div>
                <canvas id="demoCanvas" width="315">
                </canvas>
            </div>
            <Toolbox onClick={this.toolboxClickHandler}/>
        </div>
      );
  }

}

/* {item[0]} {item[1].children[1].text} and {item[2].children[1].text} */

export default Lesson;