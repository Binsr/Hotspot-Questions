
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
let colisionState= null;

function updateColision(){
	let colisionInput= document.getElementById("j_idt6:colision_value");
	colisionState= colisionInput.value;
	console.log(colisionState + " :Colision state updated~~");
}

let chosenShape= null;

function updateShape(){
	let shapeInput= document.getElementById("j_idt6:chosen_shape");
	chosenShape= shapeInput.value;
	console.log(chosenShape + " :Shape state updated~~");
}

