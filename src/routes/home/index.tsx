import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";
import Shape from "src/components/shape";
import Timer from "src/components/timer";

const Game: FunctionalComponent = () => {
  const [level, setLevel] = useState<number>(0);

  const renderSlide = () => { }

  const advanceSlide = () => {
    setLevel(level + 1);
  }

  return (
    <div>
      <Slide advanceSlide={advanceSlide} level={level} />
      <div>
        <BoxButton onClick={handleSubmitButton} title="next ->" style={{}} />
      </div>
    </div>
  )
}

export default Game;
