
//------------------------------------------------SHAPE--------------------------------------------------------------------

class Shape{

    constructor(id){
    	this.shape= "Rect";
        this.id= id;
        this.colorInColision= "red";
        this.defaultColor= "green";
        this.colision= null;
        this.color= this.defaultColor;
        this.lineWidth= 4;
        
    }

    inColision(){
        return this.colision;
    }

    setColor(status){
        if(status == "colision"){
            this.color= this.colorInColision;
            this.colision= true;
        }
        else{
            this.color= this.defaultColor;
            this.colision= false;
        }
    }

    draw(ctx){}
}

// ----------------------------------------------------------------CIRCLE------------------------------------------------------------------------

class Circle extends Shape{

    constructor(positions,id){
        super(id);
        this.shape= "Circle";
        this.centerX= (positions.startX + positions.endX)/2;
        this.centerY= (positions.startY + positions.endY)/2;
        this.r= (Math.sqrt(Math.pow(positions.startX-positions.endX,2) + Math.pow(positions.startY - positions.endY,2)))/2;
    }

    updateCord(positions){
        this.centerX= (positions.startX + positions.endX)/2;
        this.centerY= (positions.startY + positions.endY)/2;
        this.r= (Math.sqrt(Math.pow(positions.startX-positions.endX,2) + Math.pow(positions.startY - positions.endY,2)))/2;
    }

    getElements(){
        return {r: this.r, cx: this.centerX, cy: this.centerY};
    }


    draw(ctx){
        ctx.lineWidth= this.lineWidth;
        ctx.strokeStyle= this.color;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * Math.PI);
        ctx.stroke(); 
    }


}

// ----------------------------------------------------------------COLISION CHECK-------------------------------------------------------------------

class CollisionCheck{
    // 0 za Y kordinatu je vrhs stranice ne dno

    static doesObjsCollide(dragObj,hotSpotObjects){

        if(dragObj instanceof Rect){ // IZMENI kad dodas koliziju za krug
										// //SVE PREBACI U CHECK COLLISION KLASU
                for(let i= 0; i < hotSpotObjects.length; i++){
                    if(hotSpotObjects[i] instanceof Circle) 
                        if(this.doesCircleRectCol(hotSpotObjects[i],dragObj)){
                            return true;
                        }else{
                            continue;
                        }
                    
                    if(this.doesRectRectCol(hotSpotObjects[i],dragObj)){
                        return true;
                    }
                    else
                        continue;
                }
                return false;
            }
        if(dragObj instanceof Circle){
                for(let i= 0; i < hotSpotObjects.length; i++){
                    if(hotSpotObjects[i] instanceof Circle) 
                        if(this.doesCircleCircleCol(dragObj,hotSpotObjects[i])){
                            return true;
                        }else{
                            continue;
                        }
                    
                    if(this.doesCircleRectCol(dragObj,hotSpotObjects[i])){
                        return true;
                    }else{
                        continue;
                    }
                }
                return false;
        }  
    }


    static doesCircleRectCol(circle,rect){

        let rectAngleCoord= rect.getCoordOfAllAngles();
        let circleElements= circle.getElements();

        if(circleElements.cx > rectAngleCoord.rightUp.x){
            if(circleElements.cy > rectAngleCoord.rightUp.y && circleElements.cy < rectAngleCoord.rightDown.y){ // 1
                if(circleElements.cx - circleElements.r < rectAngleCoord.rightUp.x){
                    return true;
                }else
                    return false;
            }
            if(circleElements.cy < rectAngleCoord.rightUp.y){
                let x1= rectAngleCoord.rightUp.x;
                let y1= rectAngleCoord.rightUp.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }else{
                let x1= rectAngleCoord.rightDown.x;
                let y1= rectAngleCoord.rightDown.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }

        }else if(circleElements.cx > rectAngleCoord.leftUp.x){
            if(circleElements.cy < rectAngleCoord.leftUp.y){ // 2
                if(circleElements.cy + circleElements.r > rectAngleCoord.leftUp.y){ // KONTRA
																					// SU
																					// UP
																					// AND
																					// DOWN
                    return true;
                }else
                    return false;
            }else if(circleElements.cy > rectAngleCoord.leftDown.y){ // 4
                if(circleElements.cy - circleElements.r < rectAngleCoord.leftDown.y){
                    return true;
                }else{ // 3
                    return false;
                }
            }else{
                return true;
            }

        }else{
            if(circleElements.cy > rectAngleCoord.leftUp.y && circleElements.cy < rectAngleCoord.leftDown.y){
                if(circleElements.cx + circleElements.r > rectAngleCoord.leftDown.x){// 5
                    return true;
                }else{
                    return false;
                }
            }else if(circleElements.cy < rectAngleCoord.leftUp.y){
                let x1= rectAngleCoord.leftUp.x;
                let y1= rectAngleCoord.leftUp.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }else{
                let x1= rectAngleCoord.leftDown.x;
                let y1= rectAngleCoord.leftDown.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }
        }

    }

    static doesRectRectCol(rect1,rect2){

        let l1= rect1.getStartPos();
        let d1= rect1.getEndPos();

            let l2= rect2.getStartPos();
            let d2= rect2.getEndPos();

            if(d1.x < l2.x && d1.x < d2.x && l1.x < l2.x && l1.x < d2.x){
                return false;
            }
            if(d1.x > l2.x && d1.x > d2.x && l1.x > l2.x && l1.x > d2.x){
                return false;
            }

            if(d1.y < l2.y && d1.y < d2.y && l1.y < l2.y && l1.y < d2.y){
                return false;
            }

            if(d1.y > l2.y && d1.y > d2.y && l1.y > l2.y && l1.y > d2.y){
                return false;
            }

            else{
                return true;
            }
    }

    static doesCircleCircleCol(circle1,circle2){
        let circleEl1= circle1.getElements();
        let circleEl2= circle2.getElements();

        let x1= circleEl1.cx;
        let y1= circleEl1.cy;
        let x2= circleEl2.cx;
        let y2= circleEl2.cy;

        let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

        if(dist > circleEl1.r + circleEl2.r){
            return false;
        }else{
            return true;
        }
    }
}

// ----------------------------------------------------COLISION BTN-------------------------------------------------------------

class ColisionBtn{

    constructor(){
        this.colisionAllowed= false;
    }

    clicked(state){ 
    	this.colisionAllowed= state;
    }

    isColisionAllowed(){
        return this.colisionAllowed;
    }
}


// -----------------------------------------------------------RECT----------------------------------------------------------------------------

class Rect extends Shape{

    constructor(positions,id){

        super(id);
        this.startPos={
            x: positions.startX,
            y: positions.startY
        }

        this.endPos={
            x: positions.endX,
            y: positions.endY
        }
    }

    updateCord(coordinates){
        this.endPos.x= coordinates.endX;
        this.endPos.y= coordinates.endY;

        this.startPos.x= coordinates.startX;
        this.startPos.y= coordinates.startY;
    }

    setStartPos(start){
        this.startPos.x= start.x;
        this.startPos.y= start.y;
    }

    getStartPos(){
        return this.startPos;
    }

    getEndPos(){
        return this.endPos;
    }

    getCoordOfAllAngles(){
        let startPos= this.startPos;
        let endPos= this.endPos;

        let pointsOfAngles={
            leftUp: null,
            leftDown: null,
            rightUp: null,
            rightDown: null
        };

        if(startPos.x < endPos.x){
            if(startPos.y < endPos.y){
                pointsOfAngles.leftDown= startPos;
                pointsOfAngles.rightUp= endPos;

                pointsOfAngles.rightDown= {
                    x: pointsOfAngles.rightUp.x,
                    y: pointsOfAngles.leftDown.y
                };

                pointsOfAngles.leftUp= {
                    x: pointsOfAngles.leftDown.x,
                    y: pointsOfAngles.rightUp.y
                };

            }else{
                pointsOfAngles.leftUp= startPos;
                pointsOfAngles.rightDown= endPos; 

                pointsOfAngles.leftDown= {
                    x: pointsOfAngles.leftUp.x,
                    y: pointsOfAngles.rightDown.y
                };

                pointsOfAngles.rightUp= {
                    x: pointsOfAngles.rightDown.x,
                    y: pointsOfAngles.leftUp.y
                };

            }
        }else{
            if(startPos.y < endPos.y){
                pointsOfAngles.rightDown= startPos;
                pointsOfAngles.leftUp= endPos;

                pointsOfAngles.rightUp= {
                    x: pointsOfAngles.rightDown.x,
                    y: pointsOfAngles.leftUp.y
                };

                pointsOfAngles.leftDown= {
                    x: pointsOfAngles.leftUp.x,
                    y: pointsOfAngles.rightDown.y
                };

            }else{
                pointsOfAngles.rightUp= startPos;
                pointsOfAngles.leftDown= endPos;

                pointsOfAngles.rightDown= {
                    x: pointsOfAngles.rightUp.x,
                    y: pointsOfAngles.leftDown.y
                };

                pointsOfAngles.leftUp= {
                    x: pointsOfAngles.leftDown.x,
                    y: pointsOfAngles.rightUp.y
                };
            }
        }

        // DEO ZA PREPRAVITI POMESAO KORDINATU Y, GLEDAO JE KAO DA JOJ JE 0 DOLE
		// A NE U VRHU STRANICE***
        let tmp = pointsOfAngles.leftUp;
        pointsOfAngles.leftUp= pointsOfAngles.leftDown;
        pointsOfAngles.leftDown= tmp;

        tmp= pointsOfAngles.rightUp;
        pointsOfAngles.rightUp= pointsOfAngles.rightDown;
        pointsOfAngles.rightDown= tmp;
        // ----------------------------------------------------------------------------------------------
        return pointsOfAngles;
    }

    draw(ctx){
        ctx.strokeStyle= this.color;
        ctx.lineWidth= this.lineWidth;
        ctx.strokeRect(this.startPos.x,this.startPos.y,this.endPos.x-this.startPos.x,this.endPos.y-this.startPos.y);
    }
}




// -----------------------------------------------------------------------------------------------------------------------

const IMG_WIDTH = 700;
const IMG_HEIGHT = 350;
const IMG_POS_X= 0;
const IMG_POS_Y= 0;

let canvas= document.getElementById("canvas-element");
let ctx= canvas.getContext("2d");



// -----------------------------------------------------------------------OBJECTS--------------------------------------------------------------
let newShape={
	    startX: null,
	    startY: null,
	    endX: null,
	    endY: null
};

outArr= [];

let dragObj= null;
let showDragObj= false;
const dragCircle= new Circle(newShape);
const dragRect= new Rect(newShape);
dragObj= dragRect;
const inputBtn= document.getElementById("input-container__img-input");
let hotSpotObjects= [];

const colisionBtn= new ColisionBtn();

let colisionState= false;
let selectedShape= "Rect";

// ---------------------------------------------------------------------EVENT LISTENERS---------------------------------------------------------

canvas.addEventListener('mousedown',mouseClick,false);
canvas.addEventListener('mousemove',drag,false);
canvas.addEventListener('mouseup',dragStop,false);

inputBtn.addEventListener("change", uploadPic);

document.getElementById("j_idt6:undo_button").addEventListener("click", function(){
	   hotSpotObjects.pop();
});


document.getElementById('j_idt6:question_text_input').addEventListener('change', function(){
	
	document.getElementById("j_idt6:question_text_output").value = document.getElementById('j_idt6:question_text_input').value;
	
});

// --------------------------------------------------------------------BUTTONS HANDLE CLICK----------------------------------------------------


function updateColision(){
	colisionState= !colisionState;
	console.log(colisionState + " :Colision state updated~~");
	colisionBtn.clicked(colisionState);
}

function updateShape(){
	selectedShape= PF("shape").getSelectedValue();
	console.log(selectedShape);
	if(selectedShape == "Rect")
		dragObj= dragRect;
	else if(selectedShape == "Circle")
		dragObj= dragCircle;
		
}


// ------------------------------------------------------------------------UPLOAD PIC-----------------------------------------------------------

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
// document.getElementById("j_idt6:input-container").setAttribute("style","width:0px");
        canvas.style.borderWidth= "3px 0 3px 3px";
// inputBtn.style.visibility= "hidden";
        document.getElementById("j_idt6:img_input_bytes").value= image.src;
    });
    canvas.style.visibility = "visible";
    reader.readAsDataURL(file);
/*
 * -webkit-background-size: contain; -moz-background-size: contain;
 * -o-background-size: contain;
 */
    canvas.style.backgroundSize= "contain";
    canvas.style.mozBackgroundSize= "contain";
    canvas.style.backgroundPosition= "center";
    canvas.style.backgroundRepeat= "no-repeat";

}

// -----------------------------------------------------------------------MOUSE FUNCTIONS---------------------------------------------------------


function getCanvasCoordinates(event){
    let x= event.clientX - canvas.getBoundingClientRect().left;
    let y= event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}


function mouseClick(event){
    let coordinates= getCanvasCoordinates(event);
    dragStart(coordinates);

}

function drag(event){

    let coordinates= getCanvasCoordinates(event);
    newShape.endX= coordinates.x;
    newShape.endY= coordinates.y;
    if(dragObj)
        dragObj.updateCord(newShape);

    if(!colisionBtn.isColisionAllowed()){
        if(CollisionCheck.doesObjsCollide(dragObj,hotSpotObjects)){
            if(dragObj)
                dragObj.setColor("colision");
        }else{
            if(dragObj)
                dragObj.setColor("default");
        }
    }else{
        if(dragObj)
            dragObj.setColor("default");
    }
}
function dragStart(coordinates){
    newShape.startX= coordinates.x;
    newShape.startY= coordinates.y;
    showDragObj= true;
    if(dragObj)
        dragObj.updateCord(newShape);
}

function addElementInOutArr(element){
	let outShape;

		if(element['shape'] == 'Rect'){
			outShape= {
				shape: element['shape'],
				startPos: element['startPos'],
				endPos: element['endPos']
			}
		}
		else if(element['shape'] == 'Circle'){
			outShape={
					shape: element['shape'],
					centerX: element['centerX'],
					centerY: element['centerY']
			}
		}
		outArr.push(outShape);
		outShape= null;
	console.log(outArr);
}


function dragStop(event){
    showDragObj= false;
    if(dragObj instanceof Rect){
        if(!dragObj.inColision() || colisionBtn.isColisionAllowed()){
            hotSpotObjects.push(new Rect(newShape,hotSpotObjects.length));
            addElementInOutArr(hotSpotObjects[hotSpotObjects.length-1]);
        }
        
    }
    else if(dragObj instanceof Circle){
        if(!dragObj.inColision() || colisionBtn.isColisionAllowed()){
            hotSpotObjects.push(new Circle(newShape,hotSpotObjects.length));
            addElementInOutArr(hotSpotObjects[hotSpotObjects.length-1]);
        }
    }
    document.getElementById("j_idt6:draw_objects").value= JSON.stringify(outArr);
}


// ------------------------------------------------------PROCESS LOOP-----------------------------------------------------------

function draw(ctx){
    ctx.clearRect(IMG_POS_X,IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT); 
    ctx.drawImage(image,IMG_POS_X,IMG_POS_Y,IMG_WIDTH,IMG_HEIGHT);
    for(let i= 0; i < hotSpotObjects.length; i++){
        hotSpotObjects[i].draw(ctx);
    }
    if(showDragObj && dragObj)
        dragObj.draw(ctx);
}

function appLoop(timeStamp){
    lastTime= timeStamp;

    draw(ctx);
    requestAnimationFrame(appLoop);
}
requestAnimationFrame(appLoop);







