import React from 'react';
import { Stage, Shape, Container, Text, Ticker } from '@createjs/easeljs';
import Navbar from './Navbar';
import Toolbox from './Toolbox';


class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
}

  componentDidMount = () => {
    this.init();
  }

  init() {

    let xposition = 10;
    let yposition = 10;
    let number = 25;
    let stage = new Stage('demoCanvas');

    // Original code to add a shape and text inside a container 
    let button1 = new Container();
    let square = new Shape();
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(xposition, yposition, 34, 25);

    let text = new Text(number, '20px Arial', 'white');
    text.textBaseline = "alphabetic";
    text.x = xposition+6;
    text.y = yposition+19;

    button1.addChild(square, text);
    stage.addChild(button1);
    
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
    

    let button2 = this.makeButton();
    stage.addChild(button2);


    stage.update(); 
    

  }

  makeButton(){
    let button1 = new Container();
    let square = new Shape();
    square.graphics.setStrokeStyle(3).beginStroke("white").beginFill("black").drawRect(30, 30, 34, 25);

    // let text = new Text(number, '20px Arial', 'white');
    // text.textBaseline = "alphabetic";

    button1.addChild(square);
    return button1;
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