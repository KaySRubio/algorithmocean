import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';
import SubmissionFeedback from './SubmissionFeedback';
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
      userStack: [], // Stack will hold all moves of user, including operation, both numbers swapped, and resulting array
      showSubmit: false, // controls when the submit button will appear when array is sorted
      answerSubmitted: false, // controls when submission feedback appears
    };
    this.array = []; // original array of unsorted numbers will not change
    this.userArray = []; // parallel array of numbers user will sort
    this.programArray = []; // parallel array of numbers program will sort
    this.programStack = []; // Stack will hold all moves of program, including operation and both numbers swapped
  }

  componentDidMount = () => {
    this.initializeArray();
    this.sort(this.sortType, this.programArray);
    this.init();
  }

  // Global variables
  canvasClicks = 0;
  operandContainers = [];
  stage = {};
  userSP = 0; // Stack Pointer, will point to top of the stack and be used to remove move during undo operation
  programSP = 0; // program Stack Pointer
  sortType = 'Bubble'; 
  maxNumberOfOperations = 20;

  // Initialize an array of 6 elements with random numbers [10-100]
  initializeArray = () => {
    // get the first random number
    this.array[0] = this.randomNumBetween10and100();
    for (let i = 1; i < 6; i++ ) {
      let m = this.randomNumBetween10and100();
      // get a different random number if that number was already in the array
      while(this.array.includes(m)){
        m = this.randomNumBetween10and100();
      }
      this.array[i] = m;
    }
    // copy final array into userCopy and programCopy that will be modified with operations
    this.userArray = [...this.array];
    this.programArray = [...this.array];
  }

  // get a random number between 10 and 100
  randomNumBetween10and100 = () => {
      let m = Math.floor(Math.random()*100);
      while(m < 10) {
        m = Math.floor(Math.random()*100);
      }
      return m;
  }

  // todo sort array then re-call initializeArray if the list is too close to sorted

  sort = (type, array) => {
    switch(type) {
      case 'Bubble':
        this.bubbleSort(array);
        break;
      case 'Insertion':
        console.log("insertion sort");
        break;
      case 'Selection':
        console.log("selection sort");
        break;
      default:
        break;
    }

    // If the randomly generated array was almost sorted and only took 2 moves to re-sort, try again
    if(this.programSP < 4){
      console.log("Too easy");
      // reset SP and programStack, then re-initialize and re-sort array
      this.programSP = 0;
      this.programStack = [];
      this.initializeArray();
      this.sort(this.sortType, this.programArray);
    }
  }

  bubbleSort(array){
    let i, j;
    for (i = 0; i < array.length; i++) {
      for (j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // push the swap operation to the stack
          this.programStack.push(['Swap', array[j], array[j + 1]]);
          this.programSP++;
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
        }
      }
    }
    console.log("sorted array is: ", array);
    console.log("program stack is: ", this.programStack);
    console.log("program stack pointer: ", this.programSP);

  }
  
  // Initialize the createJS canvas
  init() {
    let x = 10;
    let y = 10;
    this.stage = new Stage('demoCanvas');

    let textSquares = [];

    for (let i = 0; i < this.array.length; i++ ) {
        textSquares[i] = this.makeTextSquare(x, y, this.array[i]);
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
          this.userSP > 0
          && ((
            this.operandContainers[0] === this.state.userStack[this.userSP-1][4]
            && this.operandContainers[1] === this.state.userStack[this.userSP-1][5]
          ) || (
            this.operandContainers[1] === this.state.userStack[this.userSP-1][4]
            && this.operandContainers[0] === this.state.userStack[this.userSP-1][5]
          )) 
        ) {
        this.undoLastMove()
        // don't allow more moves if they've hit 20
        } else if ( this.userSP >= this.maxNumberOfOperations ) {
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
    this.userSP++; // increment the stack pointer
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
    // show submit button when the userArray is sorted 
    if (  this.arrayEquals(this.userArray, this.programArray) ) { console.log("Array is sorted yay!"); this.setState({ showSubmit: true }); }
  }

  // Check if two arrays with same number of elements are equal
  arrayEquals(arr1, arr2) {
    let i;
    for (i = 0; i < arr1.length; i++) {
      if(arr1[i] !== arr2[i]) return false;
    }
    return true;
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

    // Get the array of what was swapped, make sure the larger one is in numA
    let containerA, containerB; 
    if(this.operandContainers[0].children[1].text > this.operandContainers[1].children[1].text) {
      containerA = this.operandContainers[0];
      containerB = this.operandContainers[1];
    } else {
      containerA = this.operandContainers[1];
      containerB = this.operandContainers[0];
    }

    // get the actual numbers inside
    const numA = containerA.children[1].text;
    const numB = containerB.children[1].text;

    // Swap the operands in the users copy of the array; get numeric operand's indices
    const indexA = this.userArray.indexOf(numA);
    const indexB = this.userArray.indexOf(numB);
    // swap
    [this.userArray[indexA], this.userArray[indexB]] = [this.userArray[indexB], this.userArray[indexA]]
    
    // Copy userArray into a static temporary version to write to stack
    const auditTrail = [...this.userArray];

    // Add 5 objects to the stack of user moves including 1) operation, 2-3) numeric operands in order from larger to smaller, 4) resulting array, 5-6) operand containers for visual swap
    this.setState(prevState => ({
      userStack: [...prevState.userStack, [ this.state.operation, numA, numB, auditTrail, containerA, containerB  ]]
    }))

    this.visualSwap(containerA, containerB);

  }

  // Click event on toolbox button will call setOperation which will 
  // set the operation state variable to the id of the button that was clicked 
    toolboxClickHandler = (event) => {
    if (event.target.id === 'submit') {
      this.handleSubmit();
    } else if (event.target.id === 'undo') {
      this.undoLastMove();
    } else {
      this.setState({ operation: event.target.id });
    }

  }

  // Submit event
  handleSubmit() {
    // set state of answerSubmitted to true to re-render DOM and show submissionFeedback
    this.setState( { operation: 'None', answerSubmitted: true} );
  }

  undoLastMove() {
    if (this.userSP > 0) {
      // swap the elements back visually
      this.visualSwap(this.state.userStack[this.userSP-1][4], this.state.userStack[this.userSP-1][5]);

      this.userSP--;

      // Revert userArray back to the move 1 before or back to the original array
      if(this.userSP > 0) { this.userArray = [...this.state.userStack[this.userSP-1][3]];} 
      else { this.userArray = [...this.array]; }

      // Pop off the last element on the stack of moves
      let arr = [...this.state.userStack];
      arr.length = this.userSP; // chop off last element of array copy
      this.setState( {userStack: arr } );
    }
  }

  render(){
    return (
        <div className="lesson">
            <Navbar/>
            <div className={this.state.operation} id="activity">
              <h1>Sort from left to right using {this.sortType} Sort</h1>
              {!this.state.answerSubmitted && <div id="yourMoves">
                <h3>Your moves:</h3>
                <ol className="movesList">
                  {this.state.userStack.map((item, index) => (
                    <li key={index}
                      className="movesListItem"
                    >
                      {item[0]} {item[1]} and {item[2]}: [{item[3].join(', ')}]
                    </li>
                  ))}
                </ol>
                </div>}
                <canvas id="demoCanvas" width="315"></canvas>
                {this.state.answerSubmitted && <SubmissionFeedback 
                  onClick={this.toolboxClickHandler}
                  userMoves={this.state.userStack}
                  programMoves={this.programStack}
                />}
            </div>
            {!this.state.answerSubmitted && <Toolbox onClick={this.toolboxClickHandler} showSubmit={this.state.showSubmit}/>}
        </div>
      );
  }

}

/* {item[0]} {item[1].children[1].text} and {item[2].children[1].text} */

export default Lesson;