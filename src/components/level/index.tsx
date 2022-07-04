import { FunctionalComponent, h } from "preact";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";

import Shape from "src/components/shape";

const canvasStyle = {
  width: 300, height: 500
};

const c1 = "#3724db";
const c2 = "#C8DB24";

type Props = {
  level: number;
  shape1: IShape | IShapeGroup;
  shape2: IShape | IShapeGroup;
}


const Level: FunctionalComponent<Props> = (props: Props) => {
  const {
    level,
    shape1,
    shape2
  } = props;

  return (
    <div style={style.home}>
      <div style={style.container}>
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
      </div>
    </div>
  );
};

export default Level;

const style = {
  home: {
    backgroundColor: "#ebeeed",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  shapesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shapeContainer: {
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "10px",
    paddingRight: "10px"
  }
}
