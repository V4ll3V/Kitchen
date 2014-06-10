//Hat nichts mit den eigentlichen Rezepten zu tun!
//Dient nur zur Auswahl der Rezepte am Anfang via Kochbuch

function Recipes(view, name){
	this.view = view;	
	this.name = name;
	this.recipeNr;
}

//Speichert Nummer des ausgewählten Rezeptes!
Recipes.prototype.setRecipe = function(actRecipe, kitchen, stage){	
	this.recipeNr = actRecipe;
	console.log("Rezeptnr: ",this.recipeNr, " gewählt!");

	//"schließt" alle Objekte des Rezeptbuches von der Stage!
	kitchen.stage.removeFromStage(kitchen.recipes[0].view);
	kitchen.stage.removeFromStage(kitchen.recipes[1].view);
	kitchen.stage.removeFromStage(kitchen.recipes[2].view);
	kitchen.stage.removeFromStage(kitchen.button[0].view);
	kitchen.stage.removeFromStage(kitchen.button[1].view);
	kitchen.stage.removeFromStage(kitchen.button[2].view);
}


	