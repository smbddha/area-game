import { FunctionalComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import style from "./style.css";

type Props = {
  setArea: (a: number) => void
};

interface IShape {
  draw: (ctx: any) => void;
  getArea: () => number;
}

class Circle implements IShape {
  constructor() {

  }

  draw(ctx: any) {

  }

  getArea() {
    return 0;
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
