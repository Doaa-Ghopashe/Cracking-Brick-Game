let gameFrame = document.getElementById("wall"), 
cxt = gameFrame.getContext('2d'),
frameWidth = gameFrame.width,
frameHeight = gameFrame.height,
gameMusic = new Audio("Audio/GameMusic.mp3");
gameMusic.loop = "true",
startBtnSound = new Audio("Audio/StartButton.mp3"),
countDownSound = new Audio("Audio/Countdown.mp3");

//constants
const soundbtn = document.getElementById("soundbtn"),
playbtn = document.getElementById("playbtn"),
countDownBox = document.getElementById("countdown"),
startPage = document.getElementsByClassName("startPage")[0];


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
    },4000)
   
}
path();

//add event listener to sound button if the user click it
soundbtn.addEventListener("click",play_pasue);
//add event listener to play button if the user click it
playbtn.addEventListener("click",startGame)