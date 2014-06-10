function Ingredient(view, name,draggable,positionMapPotX, positionMapPotY, isSpice){
	this.name = name;
	this.view = view;
	this.actState = 0;
	this.intervall = 0;
	this.setX = 0;
	this.setY = 0;
	this.dropDone = 0;
	this.positionMapPotX = positionMapPotX;
	this.positionMapPotY = positionMapPotY;
	this.isSpice = isSpice;
	this.view.setDraggable(draggable);
	
	//Sound Zutat in Topf >>Splash<<
	this.audioPot = document.createElement('audio');
	this.audioPot.setAttribute('src', 'sounds/water-splash-2.wav');
	this.audioPot.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.audioPot);
	this.audioPot.loop = false;
	this.audioPot.volume = 0.2;
	}
	
// Aktueller Status
Ingredient.prototype.getActState = function(){
	return this.actState;
}
//Ausführen der Logik 
Ingredient.prototype.setLogik = function(kitchen, tmpPot){
		this.audioPot.play();
		kitchen.logik.tmpObject = this;
		kitchen.logik.changeSomething(kitchen.tv, tmpPot);
}

//Get - Positionskoordinaten
Ingredient.prototype.getPositionIngredientX = function() {
	return this.view.getPosition().x;
}

Ingredient.prototype.getPositionIngredientY = function() {
	return this.view.getPosition().y;
}

 //Zurücksetzten der Zutaten
Ingredient.prototype.resetPosition = function() {
	this.view.resetPosition();
	this.actState = 0;
	this.view.setDraggable(true);
	this.dropDone = 0;
}

//Aktuellen status wechseln
Ingredient.prototype.changeState = function(setState){
	this.setState = setState;
	if(this.getActState() === 1 && this.setState == 0){
		this.actState = this.setState;
	}
	else if(this.getActState() === 0 && this.setState == 1){
		this.actState = this.setState;
	}
}


