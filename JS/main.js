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
brickCollSound = new Audio("Audio/Stone Crack.mp3"),
bouncedSound = new Audio("Audio/popedUp.wav"),
brickBreaked = new Audio("Audio/Cracked Stone.mp3"),
gameOverSound = new Audio("Audio/Game Over.mp3"),
startAgainBtn = new Audio("Audio/New Trail.mp3"),
//Ahmed declare this two variables
left = false,
right = false,
score = 0,
scoreUnit = 5,
lvl=1,
extraLife = false,
randRow = Math.ceil(3*Math.random()),
randCol = Math.ceil(8*Math.random()),
//Nourhan declare this variable
bricks =[],
unbricks = [];

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
    fillColor :"gray",
    strokeColor : 'white'
},
ball = {
    x: frameWidth/2,
    y: bar.y - ballRadius,
    radius:ballRadius,
    speed:4,
    dx:3,
    dy:-3
},
health = {
    x: frameWidth/2,
    y: 0,
    radius:ballRadius,
    speed:4,
    dx:2,
    dy:-1
},
unbrick = {
    row : 1,
    column : 9,
    width : 25,
    height : 7,
    offSetLeft :10,
    offSetTop :10,
    marginTop : 8,
    fillColor :"blue",
    strokeColor : 'white'
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
   // BAR_W = 30
    cxt.fillStyle = "black" 
    lvl>1 ? bar.width=30: 0;
    

    cxt.fillRect(bar.x, bar.y, bar.width, bar.height)
}
//function to move the bar left and right
function update() {
    if(bar.x+bar.width< frameWidth){
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
                cracked:0,
                status : true,
                color : 'gray',
                life: false
            }
        }
    }
    bricks[randRow][randCol].life = true;
}
function createUnBricks(){
    for(let r=0 ; r< unbrick.row ; r++){
        unbricks[r]=[];
        for(let c=0 ; c< unbrick.column ; c++){
            unbricks[r][c]={
                x : c * (unbrick.offSetLeft + unbrick.width) + unbrick.offSetLeft ,
                y : r * (unbrick.offSetTop + unbrick.height) + unbrick.offSetTop + unbrick.marginTop ,
                cracked:0,
                status : true,
                color : 'blue',
                life: false
            }
        }
    }
    unbricks[randRow][randCol].life = true;
}
// testing extralife

//function to draw bricks
function drawBricks (){
    let newLvl = true;
    for(let r=0 ; r< brick.row ; r++){
        for(let c=0 ; c< brick.column ; c++){
           if(bricks[r][c].status){
              newLvl = false;
              cxt.fillStyle = bricks[r][c].color;
              cxt.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
              cxt.strokeStyle = brick.strokeColor;
              cxt.strokeRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
           }
        }
    }
    
    if(newLvl){
        lvl++;
        randRow = Math.ceil(3*Math.random())
        randCol = Math.ceil(8*Math.random())
        createBricks();
    }   
    console.log(lvl);
}
function drawunBricks (){
    let newLvl = true;
    for(let r=0 ; r< unbrick.row ; r++){
        for(let c=0 ; c< unbrick.column ; c++){
           if(bricks[r][c].status){
              newLvl = false;
              cxt.fillStyle = unbricks[r][c].color;
              cxt.fillRect(unbricks[r][c].x, unbricks[r][c].y, unbrick.width, unbrick.height);
              cxt.strokeStyle = unbrick.strokeColor;
              cxt.strokeRect(unbricks[r][c].x, unbricks[r][c].y, unbrick.width, unbrick.height);
           }
        }
    }
    
    if(newLvl){
        lvl++;
        randRow = Math.ceil(3*Math.random())
        randCol = Math.ceil(8*Math.random())
        createBricks();
    }   
    console.log(lvl);
}

//function for the collision between the ball and the brick
function balBricol(){
    for(let r=0 ; r< brick.row ; r++){
        for(let c=0 ; c< brick.column ; c++){
           if(bricks[r][c].status){
            if(ball.x +ball.radius >bricks[r][c].x &&ball.x -ball.radius <bricks[r][c].x +brick.width &&
                ball.y +ball.radius >bricks[r][c].y &&ball.y -ball.radius <bricks[r][c].y + brick.height){
                ball.dy = -ball.dy;
                brickCollSound.play();

                //(bricks[r][c].color == 'red')?bricks[r][c].status = false:bricks[r][c].color = 'red';
                if(bricks[r][c].color == 'red'){
                    if(bricks[r][c].life){
                        health.x = bricks[r][c].x +brick.width/2;
                        health.y = bricks[r][c].y +brick.height;
                        extraLife = true;
                        
                    }
                    bricks[r][c].status = false;
                    score += scoreUnit;
                }
                else{
                    bricks[r][c].color='red'
                }

               
            }
           }
        }
    }
}
function balUnBricol(){
    for(let r=0 ; r< unbrick.row ; r++){
        for(let c=0 ; c< unbrick.column ; c++){
           if(unbricks[r][c].status){
            if(ball.x +ball.radius >unbricks[r][c].x &&ball.x -ball.radius <unbricks[r][c].x +unbrick.width &&
                ball.y +ball.radius >unbricks[r][c].y &&ball.y -ball.radius <unbricks[r][c].y + unbrick.height){
                ball.dy = -ball.dy;
                brickCollSound.play();

                //(bricks[r][c].color == 'red')?bricks[r][c].status = false:bricks[r][c].color = 'red';
                if(bricks[r][c].color == 'red'){
                    if(bricks[r][c].life){
                        health.x = bricks[r][c].x +brick.width/2;
                        health.y = bricks[r][c].y +brick.height;
                        extraLife = true;
                        
                    }
                    bricks[r][c].status = false;
                    score += scoreUnit;
                }
                else{
                    bricks[r][c].color='red'
                }

               
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
//function to draw health
function drawHealth(){
    cxt.beginPath();
    cxt.arc(health.x,health.y,ball.radius,0,angle);
    cxt.fillStyle = "pink";
    cxt.fill();
    cxt.strokeStyle = "white";
   // cxt.stroke();
    cxt.lineWidth = 2; 
    cxt.closePath();
}
function moveHealth(){
    health.y -= health.dy;
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
    // console.log(touchBar) ;
   // console.log(bar.y);
    if(touchBar){
        if(touchEdgeL){

            // console.log(ball.dx);
            (ball.dx >0 )? ball.x= bar.x-50: ball.x= bar.x+bar.width+50
            
            
            ball.dx = -ball.dx
            
            return
        }
        bouncedSound.play();
    
        if(ball.x >= bar.x+(bar.width/3) && ball.x < bar.x+(bar.width/3)*2){ //middle of the bar
            ball.dy= -ball.dy
        }
        else if(ball.x < bar.x+(bar.width/3)){                              //the first third of the bar
            ball.dx = (1-((ball.x - bar.x)/bar.width)) *-3      
            ball.dy= -ball.dy
            console.log(ball.dx);
        }
        else{                                                       // the last third of the bar
            ball.dx = (((ball.x - bar.x)/bar.width)) *3
            ball.dy= -ball.dy
            console.log(ball.dx);
        }
        
        
    }
}
function barHealthCol(){
    let touchBar =health.y +health.radius>=bar.y && health.y -health.radius<= bar.y +bar.height && health.x + health.radius>= bar.x && health.x -health.radius <= bar.x+bar.width;
    if(touchBar){
        //increase the health variable here ==>
        health.y += frameHeight;
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
    if(extraLife){
        drawHealth()
        moveHealth()
        barHealthCol()
    }
    
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
