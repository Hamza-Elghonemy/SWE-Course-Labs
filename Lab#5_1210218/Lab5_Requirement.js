class Database {
    save(data) {
        console.log(`Saving data to the database: ${JSON.stringify(data)}`);
    }
}

class LocalFile {
    save(data) {
        console.log(`Saving data to the local file: ${JSON.stringify(data)}`);
    }
}

class Shape {
    constructor(type, dimensions) {
        this.type = type;
        this.dimensions = dimensions;
    }

    draw() {}

    calculateArea() {}
    save(){}
    
}

class Circle extends Shape {
    constructor(dimensions) {
        super('Circle', dimensions);
    }
    draw() {
        console.log(`Drawing a circle with radius ${this.dimensions.radius}`);
    }
    calculateArea() {
        return Math.PI * Math.pow(this.dimensions.radius, 2);
    }
    save() {
        const database = new Database();
        database.save(this.dimensions);
    }
}

class Rectangle extends Shape {
    constructor(dimensions) {
        super('Rectangle',dimensions);
    }
    draw() {
        console.log(`Drawing a rectangle with width ${this.dimensions.width} and height ${this.dimensions.height}`);
    }
    calculateArea() {
        return this.dimensions.width * this.dimensions.height;
    }
    save() {
        const database = new Database();
        localFile.save(this.dimensions);
    }
}

class Triangle extends Shape {
    constructor(dimensions) {
        super('Triangle', dimensions);
    }
    draw() {
        console.log(`Drawing a triangle with side lengths ${this.dimensions.sideA}, ${this.dimensions.sideB}, ${this.dimensions.sideC}`);
    }
    calculateArea() {
        const s = (this.dimensions.sideA + this.dimensions.sideB + this.dimensions.sideC) / 2;
        return Math.sqrt(s * (s - this.dimensions.sideA) * (s - this.dimensions.sideB) * (s - this.dimensions.sideC));
    }
    save() {
        const database = new Database();
        database.save(this.dimensions);
        localFile.save(this.dimensions);
    }
}

// Example usage
// create a circle with radius 5, a rectangle with width 4 and height 6, and a triangle with side lengths 3, 4, and 5
// save dimensions of circle to database, rectangle to local file, and triangle to both database and local file
const localFile = new LocalFile();

const circle = new Circle({ radius: 5 });
circle.draw();
console.log(`Area of the circle: ${circle.calculateArea()}`);
circle.save();

const rectangle = new Rectangle({ width: 4, height: 6 });
rectangle.draw();
console.log(`Area of the rectangle: ${rectangle.calculateArea()}`);
rectangle.save();

const triangle = new Triangle({ sideA: 3, sideB: 4, sideC: 5 });
triangle.draw();
console.log(`Area of the triangle: ${triangle.calculateArea()}`);
triangle.save();
