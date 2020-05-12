
class Point{
	constructor(coordinates,selectedArea){
		this.position= {
				x: coordinates.x,
				y: coordinates.y
		};
		
		this.matching= this.isMatching(selectedArea);
	}
	
	isMatching(selectedArea){
		for(let i= 0; i < selectedArea.length; i++){
			if(selectedArea[i]['shape'] == "Rect"){
				let maX,minX;
				let maY,minY;
				
				if(selectedArea[i]['endPos'].x > selectedArea[i]['startPos'].x){
					maX= selectedArea[i]['endPos'].x;
					minX= selectedArea[i]['startPos'].x;
				}else{
					maX= selectedArea[i]['startPos'].x;
					minX= selectedArea[i]['endPos'].x;
				}
				
				if(selectedArea[i]['endPos'].y > selectedArea[i]['startPos'].y){
					maY= selectedArea[i]['endPos'].y;
					minY= selectedArea[i]['startPos'].y;
				}else{
					maY= selectedArea[i]['startPos'].y;
					minY= selectedArea[i]['endPos'].y;
				}
				if(this.position.x > minX && this.position.x < maX){
					if(this.position.y > minY && this.position.y < maY)
						return true;
				}

			}
			if(selectedArea[i]['shape'] == 'Circle'){
								
				let dist= Math.sqrt(Math.pow(this.position.x-selectedArea[i]['centerX'],2) + Math.pow(this.position.y-selectedArea[i]['centerY'],2));
				console.log(dist);
				console.log(selectedArea[i]['r']);
				if(dist < selectedArea[i]['r']){
					return true;
				}else
					continue
			}
				
		}
		return false;
	}
	
    draw(ctx){
    	
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
	
}

let answer= true;
let wrong= 0;
let points= [];

let image= new Image();
image.src= document.getElementById("j_idt6:answering_image").value;

console.log(image);
let canvas= document.getElementById("canvas-answer");
let ctx= canvas.getContext("2d");


function draw(ctx){
    ctx.clearRect(0,0, 700, 350);    
    ctx.drawImage(image,0,0,700,350);
    for(let i= 0; i < points.length;i++){
    	points[i].draw(ctx);
    }
}

let objsStr= document.getElementById("j_idt6:answering_slected_areas").value;
let objs = JSON.parse(objsStr);



//---------------------------------------------------------------MOUSE HANDLE------------------------
canvas.addEventListener('mousedown',mouseClick,false);

function getCanvasCoordinates(event){
    let x= event.clientX - canvas.getBoundingClientRect().left;
    let y= event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}

function mouseClick(event){
    let coordinates= getCanvasCoordinates(event);
    let point= new Point(coordinates,objs);
    
    if(point['matching'] == false){
    	wrong+=1;
    	answer= false;
    }
    
    points.push(point);
    console.log(points);

}

document.getElementById("j_idt6:undo_answer").addEventListener('click',function(){
	if(points[points.length-1]['matching'] == true){
		points.pop();
		console.log(answer);
		return;
	}
	
	points.pop();
	wrong-=1;
	if(wrong < 0)
		wrong= 0;
	if(wrong == 0){
		answer= true;
	}
	if(wrong > 0){
		answer= false;
	}
	console.log(answer);
});

document.getElementById("j_idt6:submit_answer").addEventListener('click', function(){ 
	if(answer){
		document.getElementById("answer_final").value="Right Answer";
		document.getElementById("answer_final").style.color= "green";
		console.log("dobar");
	}
	else{
		document.getElementById("answer_final").value= "Wrong Answer";
		document.getElementById("answer_final").style.color= "red";
	}
	
});

//---------------------------------------------------------------------------------------------------

console.log(objs);


function appLoop(timeStamp){
    lastTime= timeStamp;
    draw(ctx);
    requestAnimationFrame(appLoop);
}
requestAnimationFrame(appLoop);



