//define variables
let gameFrame = document.getElementById("wall"), 
cxt = gameFrame.getContext('2d'),

frameWidth = gameFrame.width,
frameHeight = gameFrame.height,

img=new Image(),
ballPattern;

//constants
const angle = 2*Math.PI;
const BAR_W = 200
const BAR_H = 20
const ballRadius =8;
//variables
let left = false
let right = false

//assign the url of the metal ball to the image src and use this img to create pattern for the arc
img.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Shiny_steel_ball.png/937px-Shiny_steel_ball.png",
ballPattern = cxt.createPattern(img,'repeat');

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
    //cxt.fillStyle = "" color
  

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


///////////////////////////////// create  bricks ///////////////////////////////////////////



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
    ////////////// ///////////////////  create Ball //////////////////////////////////////
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
        cxt.arc(ball.x,ball.y,ball.radius,0,angle);
        cxt.fillStyle = "red";
        cxt.fill();
        cxt.strokeStyle = "white";
        cxt.stroke();
        cxt.lineWidth = 2; 
        cxt.closePath();
        }
        function moveBall(){
            ball.x += ball.dx;
            ball.y += ball.dy;
            
        }
        function draw(){
            
        }
        

    path()
    createBricks();
    var dx = 0
    function loop() {

        const dedX = bar.x
        const dedY = bar.y
        
        update()
        dx = dedX-bar.x
        if(dx!==0){cxt.clearRect(dedX,dedY, BAR_W, BAR_H)}
        cxt.fillStyle = "rgba(0,0,0,0.3)"
        cxt.fillRect(dedX,dedY,BAR_W,BAR_H);
        //cxt.clearRect(dedX,dedY, BAR_W, BAR_H)
        //cxt.strokeRect(dedX,dedY,BAR_W,BAR_H);
        
        
        
        
       
        drawBall()
        moveBall()
        drawBricks()
        drawBar()
       
        requestAnimationFrame(loop)
    }
    
    
    loop()
    