function Plate(view){
	this.view = view;
	this.ON  = 1;
	this.OFF = 0;
	this.actState = this.OFF;
	this.pot = null;
}

//Gibt aktuellen Status der Platte zurück
Plate.prototype.getActState = function(){
	return this.actState;
}

//Gib X-Position zurück
Plate.prototype.getPositionPlateX = function() {
	return this.view.getPosition().x;
}

//Gibt Y-Position zurück
Plate.prototype.getPositionPlateY = function() {
	return this.view.getPosition().y;
}

//Gibt X-Pos + länge des Objektes zurück	
Plate.prototype.getPlateXend = function() {
	return (this.view.getPosition().x + this.view.getPosition().w);
}

//Gibt Y-Pos + höhe des Objektes zurück
Plate.prototype.getPlateYend = function() {
	return (this.view.getPosition().y + this.view.getPosition().h);
}	

//Getter für die Hitbox
Plate.prototype.getHitBoxX = function() {
	return (this.view.getPosition().x - 100);
}
Plate.prototype.getHitBoxY = function() {
	return (this.view.getPosition().y - 80);
}
Plate.prototype.getHitBoxXend = function() {
	return ((this.view.getPosition().x + this.view.getPosition().h) + 120);
}
Plate.prototype.getHitBoxYend = function() {
	return (this.view.getPosition().y + this.view.getPosition().h) + 80;
}
//---	

//aktuellen Status + Bild ändern	
Plate.prototype.changeState = function(){
	console.log('changeState');
	console.log(this.getPositionPlateX());
	if(this.getActState() === this.ON){
		this.view.changeImage('images/platte.jpg');
		this.actState = this.OFF;
		console.log(this.actState);
	}
	else{
		this.view.changeImage('images/platte_on.jpg');
		this.actState = this.ON;
		console.log(this.actState);
	}
}


