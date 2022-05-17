import { FunctionalComponent, h } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";

type Props = {
  //matchArea: number;
  shape: IShape | IShapeGroup;
  setArea: (a: number) => void;
  /* shapeType: ShapeEnum;
   * shapeCount: number; */
  canvasStyle: any;
};

/* const useShape = (shapeType, shapeCount) => {
 *   const [shape, setShape] = useState<IShape | null>(null);
 *   const [scale, setScale] = useState<number>(1.0);
 * 
 *   useEffect(() => {
 *     setShape(new Circle(50, 50, 20));
 *   });
 * 
 *   useEffect(() => {
 * 
 *   })
 * 
 *   const drawShape = () => shape?.draw();
 *   const scaleShape = (s) => shape?.scale(s);
 * 
 *   return {
 *     drawShape,
 *     scaleShape
 *   }
 * };
 *  */

const Shape: FunctionalComponent<Props> = (props: Props) => {
  const {
    //matchArea,
    shape,
    canvasStyle
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  //const [shape, setShape] = useState<IShape | IShapeGroup | null>(makeShape(shapeType, shapeCount));
  const [scale, setScale] = useState<number>(1.0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
    draw();
  }, []);

  useEffect(() => {
    if (!ctx) return;

    draw();
  }, [ctx])


  useEffect(() => {
    if (!ctx) return;

    draw();
  }, [ctx])

  const draw = () => {
    if (!shape || !ctx) return;
    ctx.fillStyle = "white";

    //@ts-ignore
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = "black";

    console.log(shape)

    //@ts-ignore
    shape.draw(ctx, canvasRef.current.width / 2, canvasRef.current.height / 2);
    //setArea(shape.getArea());
  }

  const handleInput = (e: any) => {
    if (!shape) return;

    let val = e.target.valueAsNumber;
    let s = val / 50;

    setScale(s);
    //@ts-ignore
    shape.scale(s);

    draw();
  };


  return (
    <div>
      <canvas ref={canvasRef} width={canvasStyle.width} height={canvasStyle.height} />
      <div class="slidecontainer">
        <input type="range" min="1" max="100" value={scale * 50} class="slider" id="myRange" onInput={handleInput} />
      </div>
    </div>
  )
}

export default Shape;
