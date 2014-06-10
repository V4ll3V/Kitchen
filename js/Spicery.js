function Spicery(view){
	this.view = view;
}
	
//Get - Positionskoordinaten	
Spicery.prototype.getPositionPotX = function() {
	return this.view.getPosition().x;
}

Spicery.prototype.getPositionPotY = function() {
	return this.view.getPosition().y;
}

//Get - Hitboxkoordinaten
Spicery.prototype.getHitBoxX = function() {
	return this.view.getPosition().x;
}
Spicery.prototype.getHitBoxY = function() {
	return this.view.getPosition().y; 
}
Spicery.prototype.getHitBoxXend = function() {
	return ((this.view.getPosition().x + this.view.getPosition().h));
}
Spicery.prototype.getHitBoxYend = function() {
	return (this.view.getPosition().y + this.view.getPosition().h);
}	
