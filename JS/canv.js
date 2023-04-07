// const canvasName = "canv" //Id of the canvas tag
// cnv = document.getElementById(canvasName)
// ctx = cnv.getContext("2d")


// const W = cnv.width
// const H  = cnv.height

// const BAR_W = 70
// const BAR_H = 10

// let left = false
// let right = false

// const bar = {
//     x: W/2 - BAR_W/2, //position on x
//     y: H*0.75,      //position on y
//     width: BAR_W,
//     height: BAR_H
// }


// function drawBar() {
//     //ctx.fillStyle = "" color
//     ctx.fillRect(bar.x, bar.y, bar.width, bar.height)
// }
// function update() {
//     if(bar.x+BAR_W< W){
//     (right) ? bar.x += 10: bar.x=bar.x;    
//     }
//     if(bar.x>0){
//     (left) ? bar.x -= 10: bar.x=bar.x;
//     }
    

// }

// //control bar
// document.addEventListener("keydown", function(event){
//     //controller event
//     if(event.key == "ArrowRight"){
//         right = true
//     }
//     else if(event.key == "ArrowLeft"){
//         left = true
//     }

// })
// document.addEventListener("keyup", function(event){
//     //controller event
//     if(event.key == "ArrowRight"){
//         right = false
//     }
//     else if(event.key == "ArrowLeft"){
//         left = false
//     }
// })

// function loop() {
//     const dedX = bar.x
//     const dedY = bar.y
//     update()
//     ctx.clearRect(dedX,dedY, BAR_W, BAR_H)
//     drawBar()
    
    
//     requestAnimationFrame(loop)
// }
// loop()



