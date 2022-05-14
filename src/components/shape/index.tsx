import { FunctionalComponent, h } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import style from "./style.css";


interface IShape {
  x: number;
  y: number;

  draw: (ctx: CanvasRenderingContext2D) => void;
  getArea: () => number;
}

interface IShapeGroup extends IShape {
  shapes: IShape[]
}

class Circle implements IShape {
  x: number;
  y: number;
  r: number;

  constructor(x: number, y: number, r: number) {
    this.x = x; this.y = y;
    this.r = 20;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(50, 100, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  getArea() {
    return 2 * Math.PI * this.r;
  }
}

class Rectangle implements IShape {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x; this.y = y;
    this.w = w; this.h = h;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  getArea() {
    return this.w * this.h;
  }
}

type Props = {
  matchArea: number;
  setArea: (a: number) => void;
};

const Shape: FunctionalComponent<Props> = (props: Props) => {
  const {
    matchArea,
    setArea
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [shape, setShape] = useState<IShape | null>(null);

  useEffect(() => {
    console.log("HERE");

    const canvas = canvasRef.current;
    if (!canvas) return;


    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
  }, []);

  const draw = () => {
    shape.draw(ctx);
  }

  const handleSliderChange = (e: any) => {
    let val = e.target.valueAsNumber;
    shape.scale(val / 50);

    setArea(shape.getArea());
  }

  return (
    <div>
      <canvas ref={canvasRef} />
      <input onChange={handleSliderChange} />
    </div>
  )
}

export default Shape;
