import { FunctionalComponent, h, Fragment } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import { colors } from "src/style";

import { IShapeGroup, clamp } from "src/utils";
import { randomColor } from "src/utils/colors";

type Props = {
  key: number;
  shape: IShapeGroup;
  canvasStyle: any;
};

// TODO calculate these scales
const scaleLowerBound = 0.2;
const scaleUpperBound = 2.0;
// const scaleRange = scaleUpperBound - scaleLowerBound;

const DEBUG = true; // displays the areas over the shapes
// const DEBUG = false;

const Shape: FunctionalComponent<Props> = (props: Props) => {
  const { shape } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [val, setVal] = useState<number>(50);
  const [scale, setScale] = useState<number>(1.0);
  const [scaleRange, setScaleRange] = useState<number>(1.9);
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

    let ms = shape.getMaxScale(canvas.width, canvas.height);
    console.log(ms, ms - ms / 5);

    setScaleRange(ms - ms / 5);

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
    let s = scaleLowerBound + (val / 100) * (scaleRange - scaleLowerBound);

    setVal(val);
    setScale(s);
  };

  useEffect(() => {
    setVal(
      1 +
        Math.floor(
          99 * ((scale - scaleLowerBound) / (scaleRange - scaleLowerBound))
        )
    );
  }, [scaleRange]);

  const handleWheel = (e: WheelEvent) => {
    let d = e.deltaY;

    setVal(
      1 +
        Math.floor(
          99 * ((scale - scaleLowerBound) / (scaleRange - scaleLowerBound))
        )
    );
    setScale((s) => {
      let ns = s + d / 3500;
      return clamp(ns, scaleLowerBound, scaleRange);
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
            value={val}
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
  },
};
