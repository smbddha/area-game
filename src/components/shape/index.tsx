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
  draw: (ctx: CanvasRenderingContext2D) => void;
  getArea: () => number;
}

class ShapeGroup implements IShapeGroup {
  shapes: IShape[];
  constructor() {
    this.shapes = [];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.shapes.map(s => s.draw(ctx));
  }

  getArea() {
    return this.shapes.map(a => a.getArea()).reduce((a, b) => a + b, 0);
  }
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


class Triangle implements IShape {
  x: number;
  y: number;
  b: number;
  h: number;

  constructor(x: number, y: number, b: number, h: number) {
    this.x = x; this.y = y;
    this.b = b; this.h = h;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - (this.h / 2));
    ctx.lineTo(this.x + (this.b / 2), this.y + (this.h / 2));
    ctx.lineTo(this.x - (this.b / 2), this.y + (this.h / 2));
    ctx.closePath();
  }

  getArea() {
    return 0.5 * this.b * this.h;
  }
}

let circle = new Circle(50, 50, 20);

type Props = {
};

const Game: FunctionalComponent<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    console.log("HERE");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
    draw();
  }, []);

  const draw = (s: number = 1) => {
    if (!ctx) return null
    ctx.fillStyle = "white";

    //@ts-ignore
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = "black";
    circle.draw(ctx);
    console.log(circle.getArea());

  }

  const handleInput = (e: any) => {
    console.log(e.target.valueAsNumber);
    if (!ctx) return null

    //ctx.scale(e.target.valueAsNumber / 50, e.target.valueAsNumber / 50);
    circle.r = (e.target.valueAsNumber / 50.0) * 20;
    draw();
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  return (
    <div>
      <canvas ref={canvasRef} />
      <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" onInput={handleInput} />
      </div>
    </div>
  )
}

export default Game;
