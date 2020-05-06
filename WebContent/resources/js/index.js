
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

