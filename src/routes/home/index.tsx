import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { Circle, IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";
import Shape from "src/components/shape";



const canvasStyle = {
  width: 300, height: 500
};

//const circleGroup = new ShapeGroup(canvasStyle.width / 2, canvasStyle.height / 2, [Circle2, Circle3])

type Props = {
  advanceSlide: () => void;
  level: number;
}

const Slide: FunctionalComponent<Props> = (props: Props) => {
  const {
    advanceSlide,
    level
  } = props;

  const [area1, setArea1] = useState<number>(0);
  const [area2, setArea2] = useState<number>(0);

  const [shape1, setShape1] = useState<IShape | IShapeGroup>(makeShape(ShapeEnum.Rectangle, 1))
  const [shape2, setShape2] = useState<IShape | IShapeGroup>(makeShape(ShapeEnum.Circle, 3))

  useEffect(() => {
    if (area1 === area2) {
      console.log("MATCHING");
    }
  }, [area1, area2]);

  useEffect(() => {
    console.log("HERE resetting shapes", level);
    setShape1(makeShape(ShapeEnum.Rectangle, 1));
    setShape2(makeShape(ShapeEnum.Circle, 3));
  }, [level])

  const handleSubmitButton = () => {
    //let diff = area1 - area2;
    let diff = shape1.getArea() - shape2.getArea();
    console.log(shape1.getArea(), shape2.getArea(), diff);

    advanceSlide()
  }

  return (
    <div style={style.home}>
      <p>Area 1: {area1} Area 2: {area2}</p>
      <div style={style.shapesContainer}>

        <div style={style.shapeContainer}>
          {/* <Shape setArea={setArea1} shapeType={ShapeEnum.Circle} shapeCount={1} canvasStyle={canvasStyle} /> */}
          <Shape key={level} setArea={setArea1} shape={shape1} canvasStyle={canvasStyle} />
        </div>
        <div style={style.shapeContainer}>
          {/* <Shape setArea={setArea2} shapeType={ShapeEnum.Rectangle} shapeCount={2} canvasStyle={canvasStyle} /> */}
          <Shape key={level} setArea={setArea2} shape={shape2} canvasStyle={canvasStyle} />
        </div>

      </div>
      <div>
        <button onClick={handleSubmitButton}>Submit</button >
      </div>
    </div>
  );
};

const style = {
  home: {
    display: "flex",
    flexDirection: "column"
  },
  shapesContainer: {
    padding: "56px 20px",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  shapeContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  }
}

const Game: FunctionalComponent = () => {
  const [level, setLevel] = useState<number>(0);

  const renderSlide = () => { }

  const advanceSlide = () => {
    setLevel(level + 1);
  }

  return (
    <div>
      <Slide advanceSlide={advanceSlide} level={level} />
    </div>
  )
}

export default Game;
