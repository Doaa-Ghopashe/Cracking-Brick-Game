//define variables
let gameFrame = document.getElementById("wall"), 
cxt = gameFrame.getContext('2d'),

frameWidth = gameFrame.width,
frameHeight = gameFrame.height,

img=new Image(),
ballPattern;

//constants
const angle = 2*Math.PI;

//assign the url of the metal ball to the image src and use this img to create pattern for the arc
img.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Shiny_steel_ball.png/937px-Shiny_steel_ball.png",
ballPattern = cxt.createPattern(img,'repeat');

//creating the frame of the canvas

//with the beginpath and closepath we determine the start of this shape and its end
cxt.beginPath();

    //fill this rectangle with a semi transparent black color
    cxt.fillStyle = 'rgba(0,0,0,0.3)';
    //styling the border with a semi transparent black color
    cxt.strokeStyle = "rgba(0,0,0,0.2)";
    //determine the thickness of this border
    cxt.lineWidth = 3;
    //create a border srrounding this rectangle
    cxt.strokeRect(0,0,frameWidth,frameHeight);
    //create a solid rectangle with the width and the height of the canvas
    cxt.fillRect(0,0,frameWidth,frameHeight);

cxt.closePath();

//creating the ball with styling
cxt.beginPath();
    
    cxt.strokeStyle = "rgba(0,0,0,0.2)";

    cxt.lineWidth = 2;
    //creating a fully arc with determining its position in the canvas
    cxt.arc(100,frameHeight - 50,15,0,angle);
    //put a background for this arc using the image we create above
    cxt.fillStyle = "rgba(255,255,255,0.9)";

    cxt.fill();
    
    cxt.stroke();
cxt.closePath();