import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import style from "./style.css";

import { Circle, ShapeGroup, ShapeEnum } from "src/utils";
import Shape from "src/components/shape";



const canvasStyle = {
  width: 300, height: 500
};

//const circleGroup = new ShapeGroup(canvasStyle.width / 2, canvasStyle.height / 2, [Circle2, Circle3])

const Slide: FunctionalComponent = () => {
  const [area1, setArea1] = useState<number>(0);
  const [area2, setArea2] = useState<number>(0);

  useEffect(() => {
    if (area1 === area2) {
      console.log("MATCHING");
    }
  }, [area1, area2]);

  const handleButtonClick = () => {

  }

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>Area 1: {area1} Area 2: {area2}</p>

      <Shape setArea={setArea1} shapeType={ShapeEnum.Circle} shapeCount={1} canvasStyle={canvasStyle} />
      <Shape setArea={setArea2} shapeType={ShapeEnum.Rectangle} shapeCount={1} canvasStyle={canvasStyle} />

      <button onClick={handleButtonClick} />
    </div>
  );
};

const style = {

}

const Game: FunctionalComponent = () => {

  const renderSlide = () => {

  }

  const handleNext = () => {

  }

  return (
    <div>
      <Slide />
      <button onClick={handleNext} />
    </div>
  )
}

export default Game;
