import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import style from "./style.css";

import Shape from "src/components/shape";

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
      <p>This is the Home component. {area}</p>

      <Shape setArea={setArea1} />
      <Shape setArea={setArea2} />

      <button onClick={handleButtonClick} />
    </div>
  );
};

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
