import React from 'react';
import { Stage, Shape } from '@createjs/easeljs';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount = () => {
    this.init();
  }

  init() {
    let stage = new Stage('demoCanvas');
    let circle = new Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();  
  }

  render(){
    return (
        <div className="lesson">
            <h1>Lesson</h1>
            <div id="activity" //onLoad={init()}
            >
                <h2>Question 2</h2>
                <canvas id="demoCanvas" width="500" height="300">
                </canvas>
                <p>hello</p>
            </div>
        </div>
      );
  }

}

export default Lesson;