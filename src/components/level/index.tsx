import { FunctionalComponent, h } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";

import Shape from "src/components/shape";
import { randomColor } from "src/utils/colors";

const canvasRatio = 3.0 / 2.0;

type Props = {
  level: number;
  shape1: IShape | IShapeGroup;
  shape2: IShape | IShapeGroup;
};

const Level: FunctionalComponent<Props> = (props: Props) => {
  const { level, shape1, shape2 } = props;

  const shapesContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (shapesContainerRef.current) {
  //   }
  // });

		console.log("rendering");
  return (
    <div style={style.container}>
      <div ref={shapesContainerRef} style={style.shapesContainer}>
        <div style={style.shapeContainer}>
          <Shape
            key={level}
            shape={shape1}
            canvasStyle={{
              // ...canvasStyle,
              // backgroundColor: c2,
								// shapeColor: randomColor(),
            }}
          />
        </div>
        <div style={style.shapeContainer}>
          <Shape
            key={level}
            shape={shape2}
            canvasStyle={{
              // ...canvasStyle,
              // backgroundColor: c1,
								// shapeColor: randomColor(),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Level;

const style = {
  home: {
    // backgroundColor: "#ebeeed",
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  shapesContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shapeContainer: {
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
};
