export interface IShape {
    x: number;
    y: number;
    s: number;
    dims: any;

    draw: (ctx: CanvasRenderingContext2D) => void;
    getArea: () => number;
    scale: (s: number) => void;
    randomize: (range: { low: number, high: number }) => void;
}

export interface IShapeGroup extends IShape {
    shapes: IShape[]
    draw: (ctx: CanvasRenderingContext2D, x?: number, y?: number) => void;
    getArea: () => number;
}

export enum ShapeEnum {
    Circle = "CIRCLE",
    Rectangle = "RECTANGLE",
    Triangle = "TRIANGLE"
}

export class ShapeGroup implements IShapeGroup {
    x: number; y: number; s: number; dims: any
    shapes: IShape[];

    constructor(x: number, y: number, shapes: IShape[] = []) {
        this.x = x; this.y = y; this.s = 1.0;
        this.shapes = shapes;

        let shape_cnt = this.shapes.length;
        let ny = (this.y * 2) / (shape_cnt + 1);
        for (let i = 0; i < shape_cnt; i++) {
            this.shapes[i].x = this.x;
            this.shapes[i].y = ny * (i + 1);
        }
    }

    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
        //if (x) this.x = 
        this.shapes.map(s => s.draw(ctx));
    }

    getArea() {
        return this.shapes.map(a => a.getArea()).reduce((a, b) => a + b, 0);
    }

    scale(s: number) {
        this.shapes.map(a => a.scale(s));
    }

    randomize(range: { low: number, high: number }) {
        this.shapes.map(s => s.randomize(range));
    }
}

export class Circle implements IShape {
    x: number;
    y: number;
    s: number;

    dims: {
        r: number;
    }

    constructor(r: number) {
        this.x = 0; this.y = 0; this.s = 1.0;
        this.dims = {
            r: r
        };
    }

    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
        if (x) this.x = x; if (y) this.y = y;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.dims.r * this.s, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    getArea() {
        return 2 * Math.PI * this.dims.r * this.s;
    }

    scale(s: number) { this.s = s; }

    randomize(range: { low: number, high: number }) {
        Object.keys(this.dims).map((k) => {
            //@ts-ignore
            this.dims[k] = Math.random() * (range.high - range.low) + range.low
        });
    }
}

export class Rectangle implements IShape {
    x: number;
    y: number;
    s: number;

    dims: {
        w: number;
        h: number;
    }

    constructor(w: number, h: number) {
        this.x = 0; this.y = 0; this.s = 1.0;
        this.dims = {
            w: w,
            h: h
        }
    }

    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
        if (x) this.x = x; if (y) this.y = y;
        let sw = this.dims.w * this.s;
        let sh = this.dims.h * this.s;

        ctx.fillRect(this.x - (sw / 2), this.y - (sh / 2), sw, sh);
    }

    getArea() {
        return this.dims.w * this.dims.h * this.s;
    }

    scale(s: number) { this.s = s; }

    randomize(range: { low: number, high: number }) {
        Object.keys(this.dims).map((k) => {
            //@ts-ignore
            this.dims[k] = Math.random() * (range.high - range.low) + range.low
        });
    }
}
export class Triangle implements IShape {
    x: number;
    y: number;
    s: number;

    dims: {
        b: number;
        h: number;
    }

    constructor(b: number, h: number) {
        this.x = 0; this.y = 0; this.s = 1.0;
        this.dims = {
            b: b,
            h: h
        }
    }

    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
        if (x) this.x = x; if (y) this.y = y;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - (this.dims.h / 2));
        ctx.lineTo(this.x + (this.dims.b / 2), this.y + (this.dims.h / 2));
        ctx.lineTo(this.x - (this.dims.b / 2), this.y + (this.dims.h / 2));
        ctx.closePath();
    }

    getArea() {
        return 0.5 * this.dims.b * this.dims.h * this.s;
    }

    scale(s: number) { this.s = s; }

    randomize(range: { low: number, high: number }) {
        Object.keys(this.dims).map((k) => {
            //@ts-ignore
            this.dims[k] = Math.random() * (range.high - range.low) + range.low
        });
    }
}

export const makeShape = (shapeType: ShapeEnum, shapeCount: number): IShape | IShapeGroup | null => {
    let shape = null;
    switch (shapeType) {
        case ShapeEnum.Circle:
            shape = new Circle(10);
            break;
        case ShapeEnum.Rectangle:
            shape = new Rectangle(10, 10);
            break;
        case ShapeEnum.Triangle:
            shape = new Triangle(10, 10);
            break;
        default:
            break;
    }

    if (!shape) return null;

    shape.randomize({ low: 20, high: 70 })

    return shape;
}
