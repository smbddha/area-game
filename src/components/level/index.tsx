import { FunctionalComponent, h } from "preact";
import { useRef } from "preact/hooks";

import { IShapeGroup } from "src/utils";

import Shape from "src/components/shape";

// const canvasRatio = 3.0 / 2.0;

type Props = {
  level: number;
  shape1: IShapeGroup;
  shape2: IShapeGroup;
};

const Level: FunctionalComponent<Props> = (props: Props) => {
  const { level, shape1, shape2 } = props;

  const shapesContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div style={style.container}>
      <div ref={shapesContainerRef} style={style.shapesContainer}>
        <div style={style.shapeContainer}>
          <Shape
            key={level}
            shape={shape1}
            canvasStyle={{}}
          />
        </div>
        <div style={style.shapeContainer}>
          <Shape
            key={level}
            shape={shape2}
            canvasStyle={{}}
          />
        </div>
      </div>
    </div>
  );
};

export default Level;

const style = {
  home: {
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
