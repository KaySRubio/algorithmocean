import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';
import SubmissionFeedback from './SubmissionFeedback';
import { Tween, Ease } from "@createjs/tweenjs";
import { useState } from 'react';
// import AccessibilityModule from 'CurriculumAssociates/createjs-accessibility';
// import AccessibilityModule from '@curriculumAssociates/createjs-accessibility';
// import { AccessibilityModule } from '@curriculumassociates/createjs-accessibility/src'; // does not work, babel error unresolvable


class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.sortType = 'Insertion'; // todo - set from url
    if (this.sortType === 'Bubble') { this.defaultOperation = 'Swap'; this.length = 6; }
    else { this.defaultOperation = 'Insert'; this.length = 7; }
    this.array = []; // original array of unsorted numbers will not change
    this.userArray = []; // parallel array of numbers user will sort
    this.programArray = []; // parallel array of numbers program will sort
    this.programStack = []; // Stack will hold all moves of program, including operation and both numbers swapped

    this.state = { 
      operation: this.defaultOperation,
      userStack: [], // Stack will hold all moves of user, including operation, both numbers swapped, and resulting array
      showSubmit: false, // controls when the submit button will appear when array is sorted
      answerSubmitted: false, // controls when submission feedback appears
    };
  }

  componentDidMount = () => {
    this.initializeArray();
    this.sort(this.sortType, this.programArray);
    this.init();
  }

  // Global variables
  swapClicks = 0;
  insertClicks = 0;
  operandContainers = [];
  stage = {};
  textSquares = [];
  userSP = 0; // Stack Pointer, will point to top of the stack and be used to remove move during undo operation
  programSP = 0; // program Stack Pointer
  maxNumberOfOperations = 20;
  triangleFillCommands = [];

  // Initialize an array of 6 elements with random numbers [10-100]
  initializeArray = () => {
    // this.array = [10, 30, 40, 20, 50, 60]; // testing
   
    // get the first random number
    this.array[0] = this.randomNumBetween10and100();
    for (let i = 1; i < this.length; i++ ) {
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

  // sort array then re-call initializeArray if the list is too close to sorted
  sort = (type, array) => {
    switch(type) {
      case 'Bubble':
        this.bubbleSort(array);
        break;
      case 'Insertion':
        this.insertionSort(array);
        break;
      case 'Selection':
        console.log("selection sort");
        break;
      default:
        break;
    }

    // If the randomly generated array was almost sorted and only took 2 moves to re-sort, try again
    if(this.programSP < 3){
      console.log("Too easy");
      // reset SP and programStack, then re-initialize and re-sort array
      this.programSP = 0;
      this.programStack = [];
      this.initializeArray(); // Kay turn back on
      this.sort(this.sortType, this.programArray); // Kay turn back on
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
  }

  insertionSort(array) {

    // Operation is Insert operand1 right before operand2
    // When examining a number, if that number causes other numbers to shift right that number becomes operand1
    // When if numbers shifted right, the first one that shifted right becomes operand2
    let operand1;
    let operand2;

    for (let i = 1; i < array.length; i++) {
      // Choosing the first element in our unsorted subarray
      let current = array[i];
      // The last element of our sorted subarray
      let j = i-1; 
      while ((j > -1) && (current < array[j])) {
        operand1 = current; // store operands
        operand2 = array[j]; 
        array[j+1] = array[j]; // move this item to the right
        j--; // check the item next
      }
      // check if anything was moved
      if ( array[j+1] !== current ) {
        array[j+1] = current; // store current item in the new spot
        this.programSP++;
        this.programStack.push(['Insert', operand1, operand2]);
      }
    }
    console.log("sorted array is: ", array);
    console.log("program stack is: ", this.programStack);
  }
  
  // Initialize the createJS canvas
  init() {
    let x = 10;
    let y = 10;
    this.stage = new Stage('demoCanvas');

    for (let i = 0; i < this.array.length; i++ ) {
        this.textSquares[i] = this.makeTextSquare(x, y, this.array[i]);
        this.stage.addChild(this.textSquares[i]);
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
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(x, y, 46, 35); // x,y,width,height
    square.addEventListener('click', this.handleCanvasSquareClick) // click event on square

    let triangle = new Shape();

    if (this.state.operation === 'Insert') {
      this.triangleFillCommands.push(triangle.graphics.beginFill("white").command);
      triangle.graphics.drawPolyStar(x, y+50, 10, 3, 0, 270); // x, y, size, #sides, 0, angle
      triangle.addEventListener('click', this.handleCanvasTriangleClick) // click event on triangle
    }

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

    // put the square and the text in the container
    if (this.state.operation === 'Insert') { textSquare.addChild(square, text, triangle); }
    else textSquare.addChild(square, text);

    return textSquare;
  }


  handleCanvasSquareClick = (event) => {
    if (this.state.operation === 'Swap') {
      // increment swapClicks since the user clicked on a canvas element
      this.swapClicks++;

      // Store the clicked number and the element location
      this.operandContainers[this.swapClicks-1] = event.target.parent;
      
      // first canvasClick just move the element down a little
      this.operandContainers[this.swapClicks-1].y+=10;
      this.stage.update();

      if (this.swapClicks===1) {
        // 
      } else { // second canvasClick run operation if clicked on 2 different elements
        this.swapClicks = 0; // reset swapClicks to 0
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
    } else if (this.state.operation === 'Insert') {

      // if the user already clicked on another square, move the previous square back to it's original place
        if (this.operandContainers[0]) {
        this.operandContainers[0].y=0;
        let i = this.array.findIndex(e => e === this.operandContainers[0].children[1].text);
        
        this.triangleFillCommands[i].style = "white";
        // this.changeTriangleColor("black");
        this.stage.update();
      }
      // if user clicked on same square twice move it back to it's original place then clear it out 
      if (this.operandContainers[0] === event.target.parent) {
        this.operandContainers[0].y=0;
        this.operandContainers[0] = 0;
        let i = this.array.findIndex(e => e === event.target.parent.children[1].text);
        this.triangleFillCommands[i].style = "white";
        this.stage.update();
      }
      else {
        // Store the currently clicked square as the first operand. Second operand must be an insert triangle symbol
        this.operandContainers[0] = event.target.parent;
        this.stage.update();
        // tween the box down
        Tween.get(this.operandContainers[0])
        .to({ y: 60}, 500, Ease.getPowIn(4));
        let i = this.array.findIndex(e => e === event.target.parent.children[1].text);
        this.triangleFillCommands[i].style = "black";
        Ticker.addEventListener("tick", this.stage); // doto - need to remove ticker at some point?

      }

    } else { alert("Please select a tool from the toolbox"); }

  }

  changeTriangleColor(color) {
    for(let i = 0; i < this.array.length; i++) {
      this.triangleFillCommands[i].style = color;
    }
  }

  handleCanvasTriangleClick = (event) => {
    
    // if user has clicked on a square already, store the second operand (the triangle's parent) and run operation
    if (this.operandContainers[0]) {
      
      // Find the indices of these operands in the users's working copy of hte array 
      const opAIndex = this.userArray.findIndex(e => e === this.operandContainers[0].children[1].text)
      const opBIndex = this.userArray.findIndex(e => e === event.target.parent.children[1].text)

      // if user tried to move square in the wrong direction (to the right) don't run operation  
      if (opAIndex < opBIndex ) {alert("Hint: You can only move squares to the left");}
      else {
        this.operandContainers[1] = event.target.parent;
        this.runOperation();
      }
    } else { alert("Please first click on a square with a number to insert into this location"); }
  }

  runOperation(){
    this.userSP++; // increment the stack pointer
    switch (this.state.operation) {
      case 'Swap':
        this.swap();
        break;
      case 'Insert':
        this.insert();
        break;
      case 'Split':
        console.log("splitting");
        break;
      case 'Merge':
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

  swap(){
    // Store the larger number in containerA and smaller number in containerB
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

  insert(){
    // retrieve the containers holding the number to be inserted, and the number where it will be inserted
    const containerA = this.operandContainers[0];
    const containerB = this.operandContainers[1];

    // get the numbers for these operands
    const numA = containerA.children[1].text;
    const numB = containerB.children[1].text;

    // get the indices of both operands for calculations below
    const indexA = this.userArray.indexOf(numA);
    const indexB = this.userArray.indexOf(numB);
    let shiftToRight = []; // keep track of all numbers pushed to the right

    let j = indexA-1;

    // Update the user's array
    // Push all numbers in between the operands to the right
    while (j >= indexB) {
      // find the corresonding container for this element that will be shifted to the right
      const container = this.textSquares.find(ele => ele.children[1].text === this.userArray[j]);
      // Put it an array that will be used in the visual insert operation
      shiftToRight.push(container);
      this.userArray[j+1] = this.userArray[j]; // move this item to the right
      j--; // check the item next
    }
    this.userArray[j+1] = numA; // store operand1 in the new spot

    // Copy userArray into a static temporary version to write to stack
    const auditTrail = [...this.userArray];


    // Add 5 objects to the stack of user moves including 1) operation, 2-3) numeric operands in order from larger to smaller, 4) resulting array, 5-6) operand containers for visual swap
    this.setState(prevState => ({
      userStack: [...prevState.userStack, [ this.state.operation, numA, numB, auditTrail, containerA, shiftToRight ]]
    }))

    // Clear out the this.operandContainers array so that the user will need to start over clicking on a square then a triangle
    this.operandContainers = [];

    this.visualInsert(containerA, shiftToRight);

    // after the visualInsert, clear the shiftToRight array
    shiftToRight = [];
  }

  visualSwap(containerA, containerB){
    // Get the distance between them on the screen for visual swapping
    const distance = containerA.getTransformedBounds().x - containerB.getTransformedBounds().x;
    // Tween the createJS containers for a visual swap
    Tween.get(containerA)
      .to({ y: 40, x: containerA.x+distance/2*-1 }, 500, Ease.getPowIn(4))
      .to({ y: 0, x: containerA.x+distance*-1 }, 500, Ease.getPowOut(4)); 
    Tween.get(containerB)
      .to({ y: 80, x: containerB.x+distance/2 }, 500, Ease.getPowIn(4))
      .to({ y: 0, x: containerB.x+distance }, 500, Ease.getPowOut(4));
    
    Ticker.addEventListener("tick", this.stage);
    // todo - remove event listener at some point after animations are done?
  }

  visualInsert(containerA, shiftToRight){
    this.changeTriangleColor("black");

    // get the distance between containerA and the last element in shiftToRight, which is the place that containerA is going
    const distance = containerA.getTransformedBounds().x - shiftToRight[shiftToRight.length-1].getTransformedBounds().x;

    // tween all containers in shiftToRight to the right
    for(let i = 0; i < shiftToRight.length; i++) {
      const container = shiftToRight[i];
      Tween.get(container)
      .to({ x: container.x+50 }, 500, Ease.getPowIn(4));
    }
    
    // tween containerA into it's new location
    Tween.get(containerA)
    .to({ y: 60, x: containerA.x+distance/2*-1 }, 500, Ease.getPowIn(4))
    .to({ y: 0, x: containerA.x+distance*-1 }, 500, Ease.getPowOut(4)); 
    
    Ticker.addEventListener("tick", this.stage);
    setTimeout(() => {this.changeTriangleColor("white")}, 1001);
  }

  visualUndoInsert(containerA, shiftToRight){
    this.changeTriangleColor("black");

    // get the distance between containerA and the first element in shiftToRight, which is the place that containerA is going
    const distance = containerA.getTransformedBounds().x - shiftToRight[0].getTransformedBounds().x;

    // tween all containers in shiftToRight to the left
    for(let i = 0; i < shiftToRight.length; i++) {
      const container = shiftToRight[i];
      Tween.get(container)
      .to({ x: container.x-50 }, 500, Ease.getPowIn(4));
    }
    
    // tween containerA into it's new location
    Tween.get(containerA)
    .to({ y: 60, x: containerA.x+distance/2*-1 }, 500, Ease.getPowIn(4))
    .to({ y: 0, x: containerA.x+distance*-1 }, 500, Ease.getPowOut(4)); 
    
    Ticker.addEventListener("tick", this.stage);
    setTimeout(() => {this.changeTriangleColor("white")}, 1001);
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

      // Get the most recent operation from the top of the stack
      const operation = this.state.userStack[this.userSP-1][0];
      let arr
      switch (operation) {
        case 'Swap':
            // swap the elements back visually using the containers stored on the top of the stack
            this.visualSwap(this.state.userStack[this.userSP-1][4], this.state.userStack[this.userSP-1][5]);

          break;
        case 'Insert':
          // swap elements back visually using the containers stored on the top of the stack
          this.visualUndoInsert(this.state.userStack[this.userSP-1][4], this.state.userStack[this.userSP-1][5])
          break;
        default:
          console.log("cannot undo ", operation);

      }

      this.userSP--; // decrement user stack pointer

      // Revert userArray back to the move 1 before or back to the original array
      if(this.userSP > 0) { this.userArray = [...this.state.userStack[this.userSP-1][3]];} 
      else { this.userArray = [...this.array]; }

      // Pop off the last element on the stack of moves
      arr = [...this.state.userStack];
      arr.length = this.userSP; // chop off last element of array copy
      this.setState( {userStack: arr } ); // call set state to update the list of moves that displays for user

    }
  }

  /* Structure of stack of moves to be printed should be:
     item[0] = Operation (e.g., 'Insert' or 'Swap')
     item[1] = Operand1
     item[2] = Operand2
     item[3] = Updated array after the operation
  */
  render(){
    return (
        <div className="lesson">
            <Navbar/>
            <div className={this.state.operation} id="activity">
              <h1>Sort from left to right using {this.sortType} Sort</h1>
              {!this.state.answerSubmitted && <div id="yourMoves">
                <h3>Your moves:</h3>
                {this.state.userStack>0} && <ol className="movesList">
                  {this.state.userStack.map((item, index) => (
                    <li key={index}
                      className="movesListItem"
                    >
                      {item[0]} {item[1]} 
                      {item[0]==='Insert' ? ' before ' : ' and '}
                      {item[2]}: [{item[3].join(', ')}] 
                    </li>
                  ))}
                </ol>
                </div>}
                {!this.state.answerSubmitted && <canvas id="demoCanvas" width="400" height="120"></canvas> }
                {this.state.answerSubmitted && <SubmissionFeedback 
                  onClick={this.toolboxClickHandler}
                  array={this.array}
                  userMoves={this.state.userStack}
                  programMoves={this.programStack}
                />}
            </div>
            {!this.state.answerSubmitted && <Toolbox onClick={this.toolboxClickHandler} showSubmit={this.state.showSubmit}/>}
        </div>
      );
  }

}

export default Lesson;