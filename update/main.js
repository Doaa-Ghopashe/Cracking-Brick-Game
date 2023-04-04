//define variables
let gameFrame = document.getElementById("wall"); 
cxt = gameFrame.getContext('2d');

frameWidth = gameFrame.width;
frameHeight = gameFrame.height;

// img=new Image(),
// ballPattern;

//constants
const angle = 2*Math.PI;
const BAR_W = 70
const BAR_H = 10
const score = 0;
const scoreUnit = 10;
const ballRadius =8;
const life = 4;

//variables
let left = false
let right = false

//assign the url of the metal ball to the image src and use this img to create pattern for the arc
// img.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Shiny_steel_ball.png/937px-Shiny_steel_ball.png",
// ballPattern = cxt.createPattern(img,'repeat');

//creating the frame of the canvas

//with the beginpath and closepath we determine the start of this shape and its end
function path(){
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
}

//start of my code
const bar = {
    x: frameWidth/2 - BAR_W/2, //position on x
    y: frameHeight*0.75,      //position on y
    width: BAR_W,
    height: BAR_H
}

function drawBar() {
    cxt.fillStyle = 'black';
    
    cxt.fillRect(bar.x, bar.y, bar.width, bar.height)
}
function update() {
    if(bar.x+BAR_W< frameWidth){
    (right) ? bar.x += 10: bar.x=bar.x;    
    }
    if(bar.x>0){
    (left) ? bar.x -= 10: bar.x=bar.x;
    }
    

}

//control bar
document.addEventListener("keydown", function(event){
    //controller event
    if(event.key == "ArrowRight"){
        right = true
    }
    else if(event.key == "ArrowLeft"){
        left = true
    }

})
document.addEventListener("keyup", function(event){
    //controller event
    if(event.key == "ArrowRight"){
        right = false
    }
    else if(event.key == "ArrowLeft"){
        left = false
    }
})
 ///  ball  ///
const ball = {
    x: frameWidth/2,
    y: bar.y - ballRadius,
    radius:ballRadius,
    speed:5,
    dx:3,
    dy:-3
}
function drawBall(){
    cxt.beginPath();
        cxt.strokeStyle = "white";
        cxt.lineWidth = 2;
        //creating a fully arc with determining its position in the canvas
        
        //put a background for this arc using the image we create above
        cxt.fillStyle = "red";
        cxt.arc(ball.x,ball.y,ball.radius,0,angle);
        cxt.fill();
        cxt.stroke();
    cxt.closePath();
    }

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    
}

function ballWallCollision(){
    if(ball.x + ball.radius > frameWidth || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.radius > frameHeight){
        life-- ;
        resetBall();
    }
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
}
function resetBall(){
    ball.x = frameWidth/2;
    ball.y = bar.y - ballRadius;
    ball.dx = 3 *(math.random()*2-1);
    ball.dy = -3;
 }





////////////////////// bricks create //////////////////////



const brick = {
    row : 5,
    column : 10,
    width : 55,
    height : 20,
    offSetLeft :30,
    offSetTop :30,
    marginTop : 40,
    fillColor :'black',
    strokeColor : 'white'
    }
    
    let bricks =[];
    
    function createBricks(){
        for(let r=0 ; r< brick.row ; r++){
            bricks[r]=[];
            for(let c=0 ; c< brick.column ; c++){
                bricks[r][c]={
                    x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft ,
                    y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop ,
                    status : true
    
                }
            }
        }
    }
    
    // createBricks();
    
    
    function drawBricks (){
        for(let r=0 ; r< brick.row ; r++){
            for(let c=0 ; c< brick.column ; c++){
               if(bricks[r][c].status){
                  cxt.fillStyle = brick.fillColor;
                  cxt.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
                  cxt.strokeStyle = brick.strokeColor;
                  cxt.strokeRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
               }
            }
        }
    }
   
    
    function ballBrickcollision(){
        for(let r=0 ; r< brick.row ; r++){
            for(let c=0 ; c< brick.column ; c++){
               if(bricks[r][c].status){
                if(ball.x +ball.radius >bricks[r][c].x &&ball.x -ball.radius <bricks[r][c].x +brick.width &&
                    ball.y +ball.radius >bricks[r][c].y &&ball.y -ball.radius <bricks[r][c].y + brick.height){
                    // ball.x = bricks[r][c].x;
                    // ball.y = bricks[r][c].y;
                    ball.dy = -ball.dy;
                    bricks[r][c].status = false;
                    score += scoreUnit;
                }
               }
            }
        }
    }

    
    path();
    var dx =0 ;
    function loop() {
        const dedX = bar.x
        const dedY = bar.y
        update();
        dx = dedX-bar.x
            if(dx!==0){cxt.clearRect(dedX,dedY, BAR_W, BAR_H)}
            cxt.fillStyle = "rgba(0,0,0,0.3)"
            cxt.fillRect(dedX,dedY,BAR_W,BAR_H);
        moveBall();
        drawBall();
        drawBar();
        createBricks()
        ballBrickcollision()
        drawBricks ()
        requestAnimationFrame(loop)
    }
    
    
    loop();