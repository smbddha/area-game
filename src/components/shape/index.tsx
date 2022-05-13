import { FunctionalComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import style from "./style.css";

type Props = {
  setArea: (a: number) => void
};

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

const Shape: FunctionalComponent<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    console.log("HERE");

    const canvas = canvasRef.current;
    if (!canvas) return;


    const context = canvas.getContext("2d");
    if (!context) return;


    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(50, 100, 20, 0, 2 * Math.PI);
    context.fill();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Shape;
