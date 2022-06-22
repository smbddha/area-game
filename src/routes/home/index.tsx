import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";
import Shape from "src/components/shape";

const canvasStyle = {
  width: 300, height: 500
};

const c1 = "#3724db";
const c2 = "#C8DB24";

const score = (a1: number, a2: number) => {

}

type Props = {
  advanceSlide: () => void;
  level: number;
}


const Slide: FunctionalComponent<Props> = (props: Props) => {
  const {
    advanceSlide,
    level
  } = props;

  const [shape1, setShape1] = useState<IShape | IShapeGroup>(makeShape(ShapeEnum.Rectangle, 1))
  const [shape2, setShape2] = useState<IShape | IShapeGroup>(makeShape(ShapeEnum.Circle, 3))

  useEffect(() => {
  }, [level])

  const handleSubmitButton = () => {
    //let diff = area1 - area2;
    let diff = shape1.getArea() - shape2.getArea();
    console.log(shape1.getArea(), shape2.getArea(), diff);


    advanceSlide()

    setShape1(makeShape(ShapeEnum.Rectangle, 1));
    setShape2(makeShape(ShapeEnum.Circle, 3));
  }

  return (
    <div style={style.home}>
      <div style={style.shapesContainer}>

        <div style={style.shapeContainer}>
          {/* <Shape setArea={setArea1} shapeType={ShapeEnum.Circle} shapeCount={1} canvasStyle={canvasStyle} /> */}
          <Shape key={level} shape={shape1} canvasStyle={{ ...canvasStyle, backgroundColor: c2, shapeColor: c1 }} />
        </div>
        <div style={style.shapeContainer}>
          {/* <Shape setArea={setArea2} shapeType={ShapeEnum.Rectangle} shapeCount={2} canvasStyle={canvasStyle} /> */}
          <Shape key={level} shape={shape2} canvasStyle={{ ...canvasStyle, backgroundColor: c1, shapeColor: c2 }} />
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
    flexDirection: "column",
    backgroundColor: "#ebeeed",
    minHeight: "100%",
    width: "100%"
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
