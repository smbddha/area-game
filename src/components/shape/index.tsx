import { FunctionalComponent, h, Fragment } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import { colors } from "src/style";

import { IShape, IShapeGroup, clamp } from "src/utils";
import { randomColor } from "src/utils/colors";

type Props = {
  key: number;
  shape: IShape | IShapeGroup;
  canvasStyle: any;
};

// TODO calculate these scales
const scaleLowerBound = 0.2;
const scaleUpperBound = 2.0;
const scaleRange = scaleUpperBound - scaleLowerBound;

// const DEBUG = true;
const DEBUG = false;

const Shape: FunctionalComponent<Props> = (props: Props) => {
  const { shape } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [scale, setScale] = useState<number>(1.0);
  const [color, _] = useState(randomColor());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.height = "90%";
    canvas.style.width = "100%";

    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
  }, []);

  useEffect(() => {
    if (!ctx) return;

    draw();
  }, [ctx]);

  useEffect(() => {
    shape.scale(scale);
    draw();
  }, [scale]);

  const draw = () => {
    if (!shape || !ctx) return;
    if (!canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // ctx.fillStyle = canvasStyle?.shapeColor || colors.white;
    ctx.fillStyle = color;

    shape.draw(ctx, canvasRef.current.width / 2, canvasRef.current.height / 2);

    if (DEBUG) {
      ctx.font = "20px sans-serif";
      // ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.fillText(
        `${shape.getArea().toFixed(1)}`,
        canvasRef.current.width / 2 - 30,
        canvasRef.current.height / 2
      );
    }
  };

  const handleInput = (e: any) => {
    if (!shape) return;

    let val = e.target.valueAsNumber;
    let s = scaleLowerBound + ((val - 1) / 99) * scaleRange;

    setScale(s);
  };

  const handleWheel = (e: WheelEvent) => {
    let d = e.deltaY;

    setScale((s) => {
      let ns = s + d / 3500;
      return clamp(ns, scaleLowerBound, scaleUpperBound);
    });
  };

  return (
    <>
      <canvas ref={canvasRef} onWheel={handleWheel} />
      {/* <div>{shape.getArea()}</div>*/}
      <div style={styles.sliderContainer}>
        <div class="slidecontainer" style={{ ...styles.slider }}>
          <input
            type="range"
            min="1"
            max="100"
            value={1 + Math.ceil(99 * ((scale - scaleLowerBound) / scaleRange))}
            class="slider"
            id="myRange"
            onInput={handleInput}
          />
        </div>
      </div>
    </>
  );
};

export default Shape;

const styles = {
  sliderContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  slider: {
    flex: 1,
    maxWidth: 200,
    float: "center",
  },
};
