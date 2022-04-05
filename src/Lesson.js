
import React from 'react';
// import { Stage, Shape, TraceShape } from '@createjs/easeljs';
import { Stage, Shape } from '@createjs/easeljs';
// import { Stage } from '@createjs/easeljs/src/display/Stage.js';

// import { Stage } from '/Users/KRubio/Documents/Algorithms-Learning-App/learn-algorithms/node_modules/@createjs/easeljs/src/display/Stage.js';
// import { Stage } from 'node_modules/@createjs/easeljs/src/display/Stage.js';
// eslint-disable-next-line no-unused-vars
// import { Stage } from '@createjs/easeljs/src/display/Stage.js';
const Lesson = () => {

  function init(){

    console.log("init got called");

    let stage = new Stage('demoCanvas');
    let circle = new Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    stage.update(); 
    // stage.update();

  }

  /*
  // eslint-disable-next-line no-undef
  componentDidMount = () => {
    init();
  }*/
init();
  return (
    <div className="lesson">
        <h1>Lesson</h1>
        <div id="activity" onLoad={init()}>
        {/*<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>*/}
            <h2>Question 2</h2>
            <canvas id="demoCanvas" width="500" height="300"></canvas>
        </div>
    </div>
  );
}
 
export default Lesson;