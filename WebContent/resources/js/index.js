
/*let canvas= document.getElementById("canvas-element");
let ctx= canvas.getContext("2d");*/

/*colision_button.addEventListener("change", function(){
	console.log("Promena");
});
*/

/* JSF - JS comunication*/
/*const colisionValue= document.getElementById("j_idt6:colision_button").addEventListener("click", function(){
	let tmp= document.getElementById("j_idt6:colision_value");
	console.log(tmp.value)
});*/

/*Kod implementacije voditi racuna o id-u moze poceti i sa j_idt7:*/

const IMG_WIDTH = 700;
const IMG_HEIGHT = 600;
const IMG_POS_X= 0;
const IMG_POS_Y= 0;

let canvas= document.getElementById("canvas-element");
let ctx= canvas.getContext("2d");

function getCanvasCoordinates(event){
    let x= event.clientX - canvas.getBoundingClientRect().left;
    let y= event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}

//---------------------------------------------------------------------OBJECTS--------------------------------------------------------------

const inputBtn= document.getElementById("input-container__img-input");
let hotSpotObjects= [];


//---------------------------------------------------------------------EVENT LISTENERS---------------------------------------------------------


inputBtn.addEventListener("change", uploadPic);

//--------------------------------------------------------------------BUTTONS HANDLE CLICK----------------------------------------------------

const colisionBtn= document.getElementById("j_idt6:colision_button");
let colisionState= false;
let selectedShape= "Rect";

function updateColision(){
	colisionState= !colisionState;
	console.log(colisionState + " :Colision state updated~~");
}

function updateShape(){
	selectedShape= PF("shape").getSelectedValue();
	console.log(selectedShape);
}

document.getElementById("j_idt6:undo_button").addEventListener("click", function(){
	console.log("UNDO CLICKED");
});
document.getElementById("j_idt6:submit_button").addEventListener("click", function(){
	console.log("SUBMIT CLICKED");
});

//------------------------------------------------------------------------UPLOAD PIC-----------------------------------------------------------

let image= new Image();

let dra= false;

function uploadPic(){
    const file= this.files[0];
    const reader= new FileReader();
    reader.addEventListener("load",function(){
        // previewImage.setAttribute("src",this.result);
        image.src= this.result;
        canvas.style.width= "700px";
        canvas.style.height= "350px";
        document.getElementById("j_idt6:input-container").setAttribute("style","width:0px");
        canvas.style.borderWidth= "3px 0 3px 3px";
        inputBtn.style.visibility= "hidden";
    });
    canvas.style.visibility = "visible";
    reader.readAsDataURL(file);
/*	-webkit-background-size: contain;
	-moz-background-size: contain;
	-o-background-size: contain;*/
    canvas.style.backgroundSize= "contain";
    canvas.style.mozBackgroundSize= "contain";
    canvas.style.backgroundPosition= "center";
    canvas.style.backgroundRepeat= "no-repeat";
}

//------------------------------------------------------------------------PROCESS LOOP------------------------------------------------------------

function draw(ctx){
    ctx.clearRect(IMG_POS_X,IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT); 
    ctx.drawImage(image,IMG_POS_X,IMG_POS_Y,IMG_WIDTH,IMG_HEIGHT);
    for(let i= 0; i < hotSpotObjects.length; i++){
        hotSpotObjects[i].draw(ctx);
   }
    /*     if(showDragObj && dragObj)
        dragObj.draw(ctx);
    if(clickAnimation.isAnimActive() && infoClickActive){
        clickAnimation.draw(ctx);
        clickAnimation.updateTimer();
    }
    if(submitAnimation.isAnimActive()){
        submitAnimation.draw(ctx);
        submitAnimation.updateTimer();
        if(!submitAnimation.isAnimActive()){
            finishSession();
        }
    }*/
}

function appLoop(timeStamp){
    lastTime= timeStamp;

    draw(ctx);
    requestAnimationFrame(appLoop);
}
requestAnimationFrame(appLoop);







