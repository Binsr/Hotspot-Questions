
let image= new Image();
image.src= document.getElementById("j_idt6:answering_image").value;

console.log(image);
let canvas= document.getElementById("canvas-answer");
let ctx= canvas.getContext("2d");


function draw(ctx){
    ctx.clearRect(0,0, 700, 350);    
    ctx.drawImage(image,0,0,700,350);
}

function appLoop(timeStamp){
    lastTime= timeStamp;
    draw(ctx);
    requestAnimationFrame(appLoop);
}
requestAnimationFrame(appLoop);