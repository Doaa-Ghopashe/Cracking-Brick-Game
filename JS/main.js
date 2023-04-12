"use strict";
//---------------------------------------------------------Variables Declaration---------------------------------------------------
//Doaa declare those variables
let frameWidth = gameFrame.width,
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
  lvl = 1,
  extraLife = false,
  //Nourhan declare this variable
  bricks = [],
  //Ahmaaa94 Declare this variables
  arry = [],
  index = 1,
  fillArr = [
    fil_1,
    fil_2,
    fil_3,
    fil_4,
    fil_5,
    fil_6,
    fil_7,
    fil_8,
    fil_9,
    fil_10,
    fil_1,
  ],
  fillBrArr = [
    filBr_1,
    filBr_2,
    filBr_3,
    filBr_4,
    filBr_5,
    filBr_6,
    filBr_7,
    filBr_8,
    filBr_9,
    filBr_10,
    filBr_1,
  ],
  bks = [
    "Images/bk.jpg",
    "Images/bk2.jpg",
    "Images/bk3.jpg",
    "Images/bk4.jpg",
    "Images/bk5.jpg",
    "Images/bk.jpg",
  ];
//
gameMusic.loop = "true";
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
  angle = 2 * Math.PI,
  BAR_W = 150,
  BAR_H = 25,
  ballRadius = 8,
  bar = {
    x: frameWidth / 2 - BAR_W / 2, //position on x
    y: frameHeight * 0.85, //position on y
    width: BAR_W,
    height: BAR_H,
  },
  //Nourhan declare this variable
  brick = {
    row: 3,
    column: 6,
    width: 70,
    height: 30,
    offSetLeft: 37,
    offSetTop: 30,
    marginTop: 40,
    fillColor: fil_1,
    brokColor: filBr_1,
    filUnBr: balPattern,
  },
  ball = {
    x: frameWidth / 2,
    y: bar.y - ballRadius,
    radius: ballRadius,
    dx:2,
    dy: -2,
    fil: balPattern,
  },
  health = {
    x: frameWidth / 2,
    y: 0,
    radius: 30,
    speed: 2,
    dx: 2,
    dy: -1,
  };
let randRow = Math.floor(Math.random() * brick.row);
let randCol = Math.floor(Math.random() * brick.column);
//--------------------------------------------------------Functions Declaration-----------------------------------------------------
//function play/pause sound
function play_pasue() {
  if (!gameMusic.muted) {
    gameMusic.muted = true;
    document.getElementById("soundicon").classList.remove("fa-volume-high");
    document.getElementById("soundicon").classList.add("fa-volume-xmark");
  } else {
    gameMusic.play();
    gameMusic.muted = false;
    document.getElementById("soundicon").classList.add("fa-volume-high");
    document.getElementById("soundicon").classList.remove("fa-volume-xmark");
  }
}
//function to start the game
function startGame() {
  gameMusic.pause();
  startBtnSound.play();
  countDownBox.style.display = "flex";

  setTimeout(() => {
    countDownSound.play();
  }, 1000);

  setTimeout(() => {
    startPage.style.display = "none";
    loop();
  }, 4000);
}
//function to draw the bar
function drawBar() {
 
  cxt.fillStyle = brick.fillColor;
  cxt.fillRect(bar.x, bar.y, bar.width, bar.height);
}
//function to move the bar left and right
function update() {
  if (bar.x + bar.width < frameWidth) {
    right ? (bar.x += 3) : (bar.x = bar.x);
  }
  if (bar.x > 0) {
    left ? (bar.x -= 3) : (bar.x = bar.x);
  }
}
//function to create bricks
function createBricks() {
  for (let r = 0; r < brick.row; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.column; c++) {
      bricks[r][c] = {
        x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y:
          r * (brick.offSetTop + brick.height) +
          brick.offSetTop +
          brick.marginTop,
        cracked: 2,
        index: index,
        status: true,
        color: brick.fillColor,
        life: false,
      };
      index++;
    }
   
  }
  bricks[randRow][randCol].life = true;
}
createBricks();
// testing extralife
//function to draw bricks
function drawBricks() {
  
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      if (bricks[r][c].status) {
        if (bricks[r][c].cracked == 2) {
          cxt.fillStyle = bricks[r][c].color;
          cxt.fillRect(
            bricks[r][c].x,
            bricks[r][c].y,
            brick.width,
            brick.height
          );
        } else {
          cxt.fillStyle = brick.filUnBr;
          cxt.fillRect(
            bricks[r][c].x,
            bricks[r][c].y,
            brick.width,
            brick.height
          );
        }
       
      }
    }
  }

}
//function for the collision between the ball and the brick
function balBricol() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      if (bricks[r][c].status) 
      {
        if (
          ball.x > bricks[r][c].x &&
          ball.x < bricks[r][c].x + brick.width &&
          ball.y + ball.radius > bricks[r][c].y &&
          ball.y - ball.radius < bricks[r][c].y + brick.height
        ) {
          ball.dy = -ball.dy;
          brickCollSound.play();
          if (arry.includes(bricks[r][c].index)) {
            bricks[r][c].cracked++;
          } else if (bricks[r][c].color == brick.brokColor) {
            if (bricks[r][c].life) {
              health.x = bricks[r][c].x + brick.width / 2;
              health.y = bricks[r][c].y + brick.height;
              extraLife = true;
            }
            bricks[r][c].status = false;
          } else {
            bricks[r][c].color = brick.brokColor;
          }
        } 
        else if (
          ball.y < bricks[r][c].y + brick.height &&
          ball.y > bricks[r][c].y &&
          ball.x + ball.radius > bricks[r][c].x &&
          ball.x - ball.radius < bricks[r][c].x + brick.width
        ) {
          ball.dx = -ball.dx;
          brickCollSound.play();
          if (arry.includes(bricks[r][c].index)) {
            bricks[r][c].cracked++;
          } else if (bricks[r][c].color == brick.brokColor) {
            if (bricks[r][c].life) {
              health.x = bricks[r][c].x + brick.width / 2;
              health.y = bricks[r][c].y + brick.height;
              extraLife = true;
            }
            bricks[r][c].status = false;
          } else {
            bricks[r][c].color = brick.brokColor;
          }
        }
      }
    }
  }
}
//function to draw ball
function drawBall() {
  cxt.beginPath();
  cxt.fillStyle = balPattern;
  cxt.arc(ball.x, ball.y, ball.radius, 0, angle);
  cxt.fill();
  cxt.closePath();
}
//function to draw health
function drawHealth() {
  cxt.beginPath();
  cxt.arc(health.x, health.y, health.radius, 0, angle);
  cxt.fillStyle = "pink";
  cxt.fill();
  cxt.closePath();
}
function moveHealth() {
  health.y -= health.dy;
}
//function to move the ball
function moveBall() {
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
    loseLife();
    resetBall();
    resetBar();
  }
}
//function for collision between bar and ball
function barCollision() {
  let touchBar =
    ball.y + ball.radius >= bar.y &&
    ball.y - ball.radius <= bar.y + bar.height &&
    ball.x + ball.radius >= bar.x &&
    ball.x - ball.radius <= bar.x + bar.width;
  if (touchBar) {
    bouncedSound.play();
    if (
      ball.x >= bar.x + bar.width / 3 &&
      ball.x < bar.x + (bar.width / 3) * 2
    ) {
      //middle of the bar
      ball.dy = -ball.dy;
    } else if (ball.x < bar.x + bar.width / 3) {
      //the first third of the bar
      ball.dx = (1 - (ball.x - bar.x) / bar.width) * -3;
      ball.dy = -ball.dy;
    } else {
      // the last third of the bar
      ball.dx = ((ball.x - bar.x) / bar.width) * 3;
      ball.dy = -ball.dy;
    }
  }
}
function barHealthCol() {
  let touchBar =
    health.y + health.radius >= bar.y &&
    health.y - health.radius <= bar.y + bar.height &&
    health.x + health.radius >= bar.x &&
    health.x - health.radius <= bar.x + bar.width;
  if (touchBar) {
    //increase the health variable here ==>
    addLife();
    health.y += frameHeight;
  }
}
//function to reset the ball to its defualt position
function resetBall() {
  ball.x = frameWidth / 2;
  ball.y = bar.y - ball.radius - 50;
  ball.dy = -ball.dy;

}

function loop() {
  const dedX = bar.x;
  const dedY = bar.y;
  const ballDedX = ball.x;
  const ballDedY = ball.y;

  update();
  balBricol();
  cxt.fillStyle = "rgba(0,0,0,0.3)";
  cxt.fillRect(
    ballDedX - ball.radius,
    ballDedY - ball.radius,
    ball.radius * 2,
    ball.radius * 2
  ); //to add the gray color to fit the background
  dx = dedX - bar.x;
  if (dx !== 0) {
    cxt.clearRect(dedX, dedY, BAR_W, BAR_H);
  }
  cxt.fillStyle = "rgba(0,0,0,0.3)";

  cxt.fillRect(dedX, dedY, BAR_W, BAR_H);
  moveBall();
  balwalCol();
  cxt.clearRect(0, 0, frameWidth, frameHeight);
  drawBall();
  let lifs = document.querySelectorAll("img[id='lif']");
  if (extraLife && lifs.length < 3) {
    drawHealth();
    moveHealth();
    barHealthCol();
  }
  drawBricks();
  drawBar();
  barCollision();
  update();
  lvlDon();
  requestAnimationFrame(loop);
}
//-----------------------------------------------------Add Event Listeners---------------------------------------------------------
//add event listener to sound button if the user click it
soundbtn.addEventListener("click", play_pasue);

//add event listener to play button if the user click it
playbtn.addEventListener("click", startGame);

//add event listener to the web page to control the bar
document.addEventListener("keydown", function (event) {
  //controller event
  if (event.key == "ArrowRight") {
    right = true;
  } else if (event.key == "ArrowLeft") {
    left = true;
  }
});

document.addEventListener("keyup", function (event) {
  //controller event
  if (event.key == "ArrowRight") {
    right = false;
  } else if (event.key == "ArrowLeft") {
    left = false;
  }
});
//--------------------------------------------------------Calling Functions----------------------------------------------------------


function rand(bk) {
  for (let i = 0; i < bk; i++) {
    let m = Math.floor(Math.random() * (brick.row * brick.column) + 1);
    if (arry.includes(m)) {
      i--;
    } else {
      arry[i] = m;
    }
  }
}
function rand_2() {
  let randNum = Math.floor(Math.random() * 10) + 1;
  return randNum;
}
function rand_3() {
  let randNum = Math.floor(Math.random() * 5) + 1;
  return randNum;
}
function backChang() {
  let x = rand_3();
  gameFrame.style.backgroundImage = "url(" + bks[x] + ")";
}
function resetBar() {
  bar.x = (frameWidth - bar.width) / 2;
}
function speedInc() {
  ball.dx =  ball.dx*1.1;
  ball.dy = ball.dy*1.1;
}
function lvlDon() {
  let lvlDone = true;
  let indx = 0;
  let unBreak = 0;
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let blc = bricks[r][c];
      lvlDone =
        (lvlDone && !blc.status) || (lvlDone && arry.includes(blc.index));
    }
  }
  if (lvlDone) {
    lvl++;
    switch (lvl) {
      case 2:
        levels[9].setAttribute("src", "Images/star_.png");
        brick.row++;
        index = 1;
        unBreak = 3;
        rand(unBreak);
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 3:
        levels[8].setAttribute("src", "Images/star_.png");
        brick.row++;
        index = 1;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 4:
        levels[7].setAttribute("src", "Images/star_.png");
        brick.row++;
        index = 1;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        unBreak = 6;
        rand(unBreak);
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 5:
        levels[6].setAttribute("src", "Images/star_.png");
        brick.row -= 2;
        // index = 1;
        bar.width = 100;
        brick.height = 50;
        // unBreak = 4;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 6:
        levels[5].setAttribute("src", "Images/star_.png");
        brick.row++;
        // index = 1;
        brick.height = 30;
        // unBreak = 4;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 7:
        levels[4].setAttribute("src", "Images/star_.png");
        // brick.row++;
        index = 1;
        bar.y = frameHeight - BAR_H - 250;
        // unBreak = 5;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        // rand(unBreak);
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 8:
        levels[3].setAttribute("src", "Images/star_.png");
        // brick.row++;
        index = 1;
        // unBreak = 6;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 9:
        levels[2].setAttribute("src", "Images/star_.png");
        // brick.row++;
        // index = 1;
        // unBreak = 6;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      case 10:
        levels[1].setAttribute("src", "Images/star_.png");
        // brick.row++;
        // index = 1;
        // unBreak = 8;
        backChang();
        indx = rand_2();
        brick.fillColor = fillArr[indx];
        brick.brokColor = fillBrArr[indx];
        // rand(unBreak);
        createBricks();
        speedInc();
        resetBall();
        resetBar();
        break;
      default:
        levels[0].setAttribute("src", "Images/star_.png");
        win();
        break;
    }
  }
}
function addLife() {
  // let lifs = document.querySelectorAll("img[id='lif']");
  let extraLife = document.createElement("img");
  extraLife.setAttribute("src", "images/love.png");
  extraLife.setAttribute("id", "lif");
  document.getElementById("life").appendChild(extraLife);
}
function loseLife() {
  let last = document.getElementById("life").lastChild;
  last.remove();
  last = document.getElementById("life").lastChild;
  last.remove();
  let lifs = document.querySelectorAll("img[id='lif']");
  if (lifs.length == 0) {
    gameOver();
  }
}
let paddleX = (frameWidth - bar.width) / 2;
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - gameFrame.offsetLeft;
  if (relativeX > 0 && relativeX < frameWidth) {
    bar.x = relativeX - bar.width / 2;
  }
}
