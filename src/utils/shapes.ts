export interface IShape {
    x: number;
    y: number;
    s: number;
    dims: any;

    draw: (ctx: CanvasRenderingContext2D, x?: number, y?: number) => void;
    getArea: () => number;
    scale: (s: number) => void;
    randomize: (range: { low: number, high: number }) => void;
}

export interface IShapeGroup extends IShape {
    shapes: IShape[]
    //draw: (ctx: CanvasRenderingContext2D, x?: number, y?: number) => void;
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

    constructor(shapes: IShape[] = []) {
        this.x = 0; this.y = 0; this.s = 1.0;
        this.shapes = shapes;

        let shape_cnt = this.shapes.length;
        let ny = (this.y * 2) / (shape_cnt + 1);
        for (let i = 0; i < shape_cnt; i++) {
            this.shapes[i].x = this.x;
            this.shapes[i].y = ny * (i + 1);
        }
    }

    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
        let shapeCnt = this.shapes.length
        let ystep = ((y || this.y) * 2) / (shapeCnt + 1);

        let nx = x || this.x;
        for (let i = 0; i < shapeCnt; i++) {
            let ny = ystep * (i + 1);
            this.shapes[i].draw(ctx, nx, ny)
        }
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
        console.log("CIRCLE", this.dims.r, this.s)
        let sr = this.dims.r * this.s
        return Math.PI * (sr * sr);
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
        console.log("RECT", this.dims.w, this.dims.h, this.s)
        return (this.dims.w * this.s) * (this.dims.h * this.s);
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
        let sh = this.s * this.dims.h;
        let sb = this.s * this.dims.b;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y - (sh / 2));
        ctx.lineTo(this.x + (sb / 2), this.y + (sh / 2));
        ctx.lineTo(this.x - (sb / 2), this.y + (sh / 2));
        ctx.fill();
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

// function randomEnum<T>(anEnum: T): T[keyof T] {
//     const enumValues = Object.values(anEnum)
//         .map(n => +n)
//         .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
//     const randomIndex = Math.floor(Math.random() * enumValues.length)
//     const randomEnumValue = enumValues[randomIndex]
//     return randomEnumValue;
// }

function sample<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const makeShape = (shapeType: ShapeEnum, shapeCount: number): IShape | IShapeGroup => {
    let shape: IShape | IShapeGroup = new Circle(0);

    console.log("MAKING SHAPE");

    if (shapeCount > 1) {
        //@ts-ignore
        shape = new ShapeGroup([...Array(shapeCount).keys()].map(() => {
            let st = sample<ShapeEnum>(Object.values(ShapeEnum));
            console.log(st)
            let s = makeShape(st, 1);
            if (s) s.randomize({ low: 10, high: 50 });
            return s
        }))

    }
    else {

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
        shape.randomize({ low: 20, high: 70 })

    }
    return shape;
}
