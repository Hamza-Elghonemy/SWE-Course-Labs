/*IMPORTANT NOTES
1- you are using JS Name Casing (camelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

//-----------------Width/Height Validation Function--------------------//
function validateParameters(height,width)
{
  if (!height || height <= 0 || !width || width <= 0)
    return false
}

//-----------------Class Definitions--------------------//
class Point 
{ 
  //this constructor is used to construct the pt class
  constructor(coordX, coordY)
  {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}
class Rectangle 
{
  constructor(startingPoint, width, height)
  {
     if(!validateParameters(height,width))
    {
      throw Error("invalid Width and Height"); // throws an error in case of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.width = width; 
    this.height = height; 
  }

// ************** Rectangle Methods **************//
  calculateArea() 
  {
    return this.width * this.height;
  }

  calculatePerimeter()
  {
    return 2 * this.width + 2 * this.height;
  }
  

  updateHeight(height)
  {
    if (height && height > 0) 
    {
      this.height = height;
    }
  }

  updateParamaters({ startingPoint, width, height })
  {
    if (!validateParameters(height,width))
    {
      throw Error("invalid Width and Height"); // throws an error in case of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getHeight() 
  {
    return this.height;
  }

  getWidth() 
  {
    return this.width;
  }

  //function that print the endpoints
  printEndPoints() 
  {
    const topRight = this.startingPoint.coordX + this.broad;
    const bottomLeft = this.startingPoint.coordY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

}


//---------------------Construction Functions-----------------------//
function constructRectangle(width, x, height, y) 
{
  const mainPoint = new Point(x, y);
  const rect = new Rectangle(mainPoint, width, height);
  return rect;
}

function constructSquare(coordX, coordY, squareHeight) 
{
  let square;
  if (!squareHeight || squareHeight <= 0)
  {
    square = constructRectangle(squareHeight, coordX, squareHeight, coordY);
  }
  const squareArea = square.calculateArea();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", squareArea);
  console.log("square Perimeter ", squarePerimeter);
}


//----------------------Examples----------------------------//
const myRect = constructRectangle(2, 3, 5, 4);
const mySquare = constructSquare();

console.log(mySquare.calculatePerimeter());
mySquare.endPoints();

myRect.updateHeight(3);
