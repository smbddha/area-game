import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";
import 
import Level from "src/components/level";
import Shape from "src/components/shape";
import Timer from "src/components/timer";
import BoxButton from "src/components/BoxButton";

const Game: FunctionalComponent = () => {
  const [level, setLevel] = useState<number>(0);

  const renderSlide = () => { }

  const advanceSlide = () => {
    setLevel(level + 1);
  }

  return (
    <div style={styles.container}>
      <div >
        <Timer />
      </div>
      <Level advanceLevel={advanceLevel} level={level} />
      <div>
        <BoxButton onClick={handleSubmitButton} title="next ->" style={{}} />
      </div>
    </div>
  )
}

export default Game;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}
