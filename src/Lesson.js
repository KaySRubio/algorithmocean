import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.numbers = []; // array for the numbers that will be sorted
  }
  
  componentDidMount = () => {
    this.initializeArray();
    this.init();
  }

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

  // todo program another method to re-call initializeArray if the list is too close to sorted


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
    
    for (let i = 0; i < this.numbers.length; i++ ) {
        let textSquare1 = this.makeTextSquare(x, y, this.numbers[i]);
        stage.addChild(textSquare1);
        x += 50;
    }

    stage.update(); 
    
  }

  makeTextSquare(x, y, num){
    let textSquare = new Container();
    let square = new Shape();
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(x, y, 46, 35);

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