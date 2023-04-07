'use strict';
//---------------------------------------------------------Variables Declaration---------------------------------------------------
//Doaa declare those variables
let gameFrame = document.getElementById("wall"), 
cxt = gameFrame.getContext('2d'),
frameWidth = gameFrame.width,
frameHeight = gameFrame.height,
gameMusic = new Audio("Audio/GameMusic.mp3"),
startBtnSound = new Audio("Audio/StartButton.mp3"),
countDownSound = new Audio("Audio/Countdown.mp3"),
//Ahmed declare this two variables
left = false,
right = false,
score = 0,
scoreUnit = 5,
//Nourhan declare this variable
bricks =[];

//
gameMusic.loop = "true"
//

//decalaled variable
var dx = 0;
//

//Doaa declare those variables
const soundbtn = document.getElementById("soundbtn"),
playbtn = document.getElementById("playbtn"),
countDownBox = document.getElementById("countdown"),
startPage = document.getElementsByClassName("startPage")[0],
//Ahmed declare those variables
angle = 2*Math.PI,
BAR_W = 60,
BAR_H = 6,
ballRadius =3,
bar = {
    x: frameWidth/2 - BAR_W/2, //position on x
    y: frameHeight*0.85,      //position on y
    width: BAR_W,
    height: BAR_H
},
//Nourhan declare this variable
brick = {
    row : 4,
    column : 9,
    width : 22,
    height : 7,
    offSetLeft :10,
    offSetTop :10,
    marginTop : 8,
    fillColor :'black',
    strokeColor : 'whighter'
},
ball = {
    x: frameWidth/2,
    y: bar.y - ballRadius,
    radius:ballRadius,
    speed:4,
    dx:3,
    dy:-3
}

//--------------------------------------------------------Functions Declaration-----------------------------------------------------

//function to draw the canvas frame
function path(){
    cxt.beginPath();
    
        cxt.fillStyle = 'rgba(0,0,0,0.3)';

        cxt.strokeStyle = "rgba(0,0,0,0.2)";

        cxt.lineWidth = 3;

        cxt.strokeRect(0,0,frameWidth,frameHeight);
        cxt.fillRect(0,0,frameWidth,frameHeight);
    
    cxt.closePath();
}
//function play/pause sound
function play_pasue ()
{
    if(!gameMusic.muted)
    {
        gameMusic.muted = true;

        document.getElementById("soundicon").classList.remove("fa-volume-high");
        document.getElementById("soundicon").classList.add("fa-volume-xmark");
    }
    else
    {
        gameMusic.play();

        gameMusic.muted = false;

        document.getElementById("soundicon").classList.add("fa-volume-high");
        document.getElementById("soundicon").classList.remove("fa-volume-xmark");
    }
}
//function to start the game
function startGame ()
{
    gameMusic.pause();
    startBtnSound.play();
    countDownBox.style.display = "flex";
    
    setTimeout(()=>{
        countDownSound.play();
    },1000)

    setTimeout(()=>{
        startPage.style.display = "none";
        loop();
    },4000)
   
}
//function to draw the bar
function drawBar() {
    cxt.fillStyle = "black" 
  

    cxt.fillRect(bar.x, bar.y, bar.width, bar.height)
}
//function to move the bar left and right
function update() {
    if(bar.x+BAR_W< frameWidth){
        (right) ? bar.x += 3: bar.x=bar.x;    
    }
    if(bar.x>0){
        (left) ? bar.x -= 3: bar.x=bar.x;
    }
}
//function to create bricks
function createBricks(){
    for(let r=0 ; r< brick.row ; r++){
        bricks[r]=[];
        for(let c=0 ; c< brick.column ; c++){
            bricks[r][c]={
                x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft ,
                y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop ,
                status : true,
            }
        }
    }
}
//function to draw bricks
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
//function for the collision between the ball and the brick
function balBricol(){
    for(let r=0 ; r< brick.row ; r++){
        for(let c=0 ; c< brick.column ; c++){
           if(bricks[r][c].status){
            if(ball.x +ball.radius >bricks[r][c].x &&ball.x -ball.radius <bricks[r][c].x +brick.width &&
                ball.y +ball.radius >bricks[r][c].y &&ball.y -ball.radius <bricks[r][c].y + brick.height){
                ball.dy = -ball.dy;
                bricks[r][c].status = false;
                score += scoreUnit;
            }
           }
        }
    }
}
//function to draw ball
function drawBall(){
    cxt.beginPath();
    cxt.arc(ball.x,ball.y,ball.radius,0,angle);
    cxt.fillStyle = "red";
    cxt.fill();
    cxt.strokeStyle = "white";
   // cxt.stroke();
    cxt.lineWidth = 2; 
    cxt.closePath();
}
//function to move the ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    
}
//function for the collision between the wall and the ball
function balwalCol() {
    if (ball.x + ball.radius > frameWidth || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius <= 0) {
      ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius >= frameHeight) {
    //   life--;
      resetBall();
    }
}
//function for collision between bar and ball
function barCollision(){
    let touchBar =ball.y +ball.radius>=bar.y && ball.y -ball.radius<= bar.y +bar.height && ball.x +ball.radius>= bar.x && ball.x -ball.radius <= bar.x+bar.width;
    let touchEdgeL = (ball.x + ball.radius >= bar.x ) && ball.y +ball.radius > bar.y
    //let touchEdgeR = (ball.x - ball.radius <= bar.x + bar.width) && ball.y +ball.radius > bar.y
    console.log(touchBar) ;
   // console.log(bar.y);
    if(touchBar){
        if(touchEdgeL){
            console.log(ball.dx);
            (ball.dx >0 )? ball.x= bar.x-50: ball.x= bar.x+bar.width+50
            
            
            ball.dx = -ball.dx
            
            return
        }
    
        ball.dy= -ball.dy
        
    }
}
//function to reset the ball to its defualt position
function resetBall() {
    ball.x = frameWidth / 2;
    ball.y = bar.y - (ball.radius + 10);
    ball.dx = 2 * (Math.random() * 2 - 1);
    ball.dy = -2;
}
//function have no idea about its existing
function draw(){
            
}
//
function loop() {

    const dedX = bar.x
    const dedY = bar.y
    const ballDedX = ball.x
    const ballDedY = ball.y
    
    update() 
    balBricol()
    // cxt.clearRect(ballDedX - ball.radius, ballDedY - ball.radius, ball.radius*2, ball.radius*2) //to clear
    cxt.fillStyle = "rgba(0,0,0,0.3)"
    cxt.fillRect(ballDedX - (ball.radius )  , ballDedY - (ball.radius ) , ball.radius*2  , ball.radius*2  ) //to add the gray color to fit the background
    dx = dedX-bar.x
    if(dx!==0){cxt.clearRect(dedX,dedY, BAR_W, BAR_H)}
    cxt.fillStyle = "rgba(0,0,0,0.3)"

    cxt.fillRect(dedX,dedY,BAR_W,BAR_H);
    //cxt.clearRect(dedX,dedY, BAR_W, BAR_H)
    //cxt.strokeRect(dedX,dedY,BAR_W,BAR_H);
    moveBall()

    balwalCol();
    cxt.clearRect(0, 0, frameWidth, frameHeight);
    drawBall()
    drawBricks()
    drawBar()
    barCollision()
    update() 
    requestAnimationFrame(loop)
}

//-----------------------------------------------------Add Event Listeners---------------------------------------------------------

//add event listener to sound button if the user click it
soundbtn.addEventListener("click",play_pasue);

//add event listener to play button if the user click it
playbtn.addEventListener("click",startGame)

//add event listener to the web page to control the bar
document.addEventListener("keydown", function(event){
    //controller event
    if(event.key == "ArrowRight"){
        right = true;
    }
    else if(event.key == "ArrowLeft"){
        left = true;
    }

})

document.addEventListener("keyup", function(event){
    //controller event
    if(event.key == "ArrowRight"){
        right = false;
    }
    else if(event.key == "ArrowLeft"){
        left = false;
    }
})
//--------------------------------------------------------Calling Functions----------------------------------------------------------
path();
createBricks();