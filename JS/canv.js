let gameFrame = document.getElementById("wall");
  cxt = gameFrame.getContext("2d");

// ball pattern
let balPat = document.getElementById("img4");
balPattern = cxt.createPattern(balPat, "no-repeat");

// Blocks BackgroundS
let blc1 = document.getElementById("blc1");
let blc2 = document.getElementById("blc2");
let blc3 = document.getElementById("blc3");
let blc4 = document.getElementById("blc4");
let blc5 = document.getElementById("blc5");
let blc6 = document.getElementById("blc6");
let blc7 = document.getElementById("blc7");
let blc8 = document.getElementById("blc8");
let blc9 = document.getElementById("blc9");
let blc10 = document.getElementById("blc10");

// Broken BlockS BackgroundS
let brok1 = document.getElementById("brok1");
let brok2 = document.getElementById("brok2");
let brok3 = document.getElementById("brok3");
let brok4 = document.getElementById("brok4");
let brok5 = document.getElementById("brok5");
let brok6 = document.getElementById("brok6");
let brok7 = document.getElementById("brok7");
let brok8 = document.getElementById("brok8");
let brok9 = document.getElementById("brok9");
let brok10 = document.getElementById("brok10");

fil_1 = cxt.createPattern(blc1, "repeat");
fil_2 = cxt.createPattern(blc2, "repeat");
fil_3 = cxt.createPattern(blc3, "repeat");
fil_4 = cxt.createPattern(blc4, "repeat");
fil_5 = cxt.createPattern(blc5, "repeat");
fil_6 = cxt.createPattern(blc6, "repeat");
fil_7 = cxt.createPattern(blc7, "repeat");
fil_8 = cxt.createPattern(blc8, "repeat");
fil_9 = cxt.createPattern(blc9, "repeat");
fil_10 = cxt.createPattern(blc10, "repeat");

filBr_1 = cxt.createPattern(brok1, "repeat");
filBr_2 = cxt.createPattern(brok2, "repeat");
filBr_3 = cxt.createPattern(brok3, "repeat");
filBr_4 = cxt.createPattern(brok4, "repeat");
filBr_5 = cxt.createPattern(brok5, "repeat");
filBr_6 = cxt.createPattern(brok6, "repeat");
filBr_7 = cxt.createPattern(brok7, "repeat");
filBr_8 = cxt.createPattern(brok8, "repeat");
filBr_9 = cxt.createPattern(brok9, "repeat");
filBr_10 = cxt.createPattern(brok10, "repeat");

let extra = document.getElementById("lif");
filExtra = cxt.createPattern(extra, "repeat-x");
levels=document.querySelectorAll("img[id='lvl']");


function gameOver() {
  overDiv =document.createElement("div");
  overDiv.style.position = "absolute";
  overDiv.style.top = "0";
  overDiv.style.left = "0";
  overDiv.style.width = "100%";
  overDiv.style.height = "100%";
  overDiv.style.zIndex = "1000";
  overDiv.style.textAlign="center";
  overDiv.style.backgroundColor = "rgba(17, 8, 8, 0.607)";
  over =document.createElement("img");
  over.src = "images/game_over.jpg";
  over.style.width = "850px";
  over.style.height = "860px";
  over.style.zIndex = "1001";
  again=document.createElement("button");
  again.style.position = "absolute";
  again.style.top = "75%";
  again.style.left = "44.5%";
  again.style.width = "200px";
  again.style.height = "60px";
  again.style.zIndex = "1002";
  again.style.backgroundColor = "#232f74";
  again.style.color = "white";
  again.style.border = "none";
  again.style.borderRadius = "5px";
  again.style.cursor = "pointer";
  again.style.textAlign = "center";
  again.style.fontSize = "30px";
  again.style.fontWeight = "bold";
  again.innerHTML = "Try Again";
  again.onclick = function() {
      location.reload();
  }
  overDiv.appendChild(again);
  overDiv.appendChild(over);
  document.body.appendChild(overDiv);

}
function win() {
  overDiv =document.createElement("div");
  overDiv.style.position = "absolute";
  overDiv.style.top = "0";
  overDiv.style.left = "0";
  overDiv.style.width = "100%";
  overDiv.style.height = "100%";
  overDiv.style.zIndex = "1000";
  overDiv.style.textAlign="center";
  overDiv.style.backgroundColor = "rgba(17, 8, 8, 0.607)";
  over =document.createElement("img");
  over.src = "images/win.jpg";
  over.style.width = "850px";
  over.style.height = "860px";
  over.style.zIndex = "1001";
  again=document.createElement("button");
  again.style.position = "absolute";
  again.style.top = "75%";
  again.style.left = "44.5%";
  again.style.width = "200px";
  again.style.height = "60px";
  again.style.zIndex = "1002";
  again.style.backgroundColor = "#154360";
  again.style.color = "white";
  again.style.border = "none";
  again.style.borderRadius = "5px";
  again.style.cursor = "pointer";
  again.style.textAlign = "center";
  again.style.fontSize = "30px";
  again.style.fontWeight = "bold";
  again.innerHTML = "Play Again";
  again.onclick = function() {
      location.reload();
  }
  overDiv.appendChild(again);
  overDiv.appendChild(over);
  document.body.appendChild(overDiv);

}




