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
  x: number; y: number;
  shapes: IShape[];

  constructor(x: number, y: number) {
    this.x = x; this.y = y;
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
    draw();
  }, []);

}

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
