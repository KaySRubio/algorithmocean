import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';



class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.numbers = []; // array for the numbers that will be sorted
    // this.targetClicks = 0;
  }
  
  componentDidMount = () => {
    this.initializeArray();
    this.init();
  }

  // Global variables
  canvasClicks = 0;
  operation = 'swap';
  operands = [];
  operandLocations = [];

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
    console.log('array is ', this.numbers);
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
    let stage = new Stage('demoCanvas');


    /* Move the whole button around
    //Update stage will render next frame
    Ticker.addEventListener("tick", handleTick);

    function handleTick() {
    //button will move 10 units to the right.
      button1.x += 10;
      //Will cause the circle to wrap back
      if (button1.x > stage.canvas.width) { button1.x = 0; }
      stage.update();
    } */
    
    let textSquares = [];

    for (let i = 0; i < this.numbers.length; i++ ) {
        textSquares[i] = this.makeTextSquare(x, y, this.numbers[i]);
        stage.addChild(textSquares[i]);
        x += 50;
    }

    // textSquares[0].addEventListener('click', function(event) {console.log("type: ", event.target, ", stageX: ", event.stageX); })

    stage.update(); 
    
  }

  handleCanvasClick = (event) => {
    // console.log("hellow");
    console.log("type: ", event.target);
    console.log("x-location: ", event.target.graphics.command.x);
    console.log("y-location: ", event.target.graphics.command.y);
    console.log("inner text: ", event.target.parent.children[1].text);

    // increment canvasClicks since the user clicked on a canvas element
    this.canvasClicks++;
    console.log("Increased targetClicks to: ", this.canvasClicks);

    // Store the clicked number and the element location
    this.operands[this.canvasClicks-1] = event.target.parent.children[1].text;
    this.operandLocations[this.canvasClicks-1] = event.target.graphics.command;

    // If there have been 2 canvasClicks, run the operation and reset canvasClicks
    if(this.canvasClicks===2) {

        // run the operation
        this.runOperation();
        // resent canvasClicks to 0
        this.canvasClicks = 0;
        // todo store both operands on a stack of what was switched


    } else {
        // todo put a highlight around the first clicked element?
    }
  }

  runOperation(){
      console.log("Running the operation");
      switch (this.operation) {
          case 'swap':
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
    console.log("running a swap operation with operands ", this.operands);
    // monkey - need to program the animation to move these
  }

  makeTextSquare(x, y, num){
    let textSquare = new Container();
    let square = new Shape();
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(x, y, 46, 35);
    // square.addEventListener('click', function(event) {console.log("type: ", event.target); })
    
    // square.addEventListener('click', function(event){ this.handleClick(event);})
    square.addEventListener('click', this.handleCanvasClick)

    let text = new Text(num, '30px Arial', 'white');
    text.textBaseline = "alphabetic";
    text.x = x+6;
    text.y = y+28;

    textSquare.addChild(square, text);
    return textSquare;
  }

  render(){
    return (
        <div className="lesson">
            <Navbar/>
            <h1>Lesson</h1>
            <div id="activity">
                <h2>Question 2</h2>
                <canvas id="demoCanvas" width="1000" height="400">
                </canvas>
                <p>hello</p>
            </div>
            <Toolbox/>
        </div>
      );
  }

}

export default Lesson;