function Faucet(view){
	this.view = view;
	this.ON  = 1;
	this.OFF = 0;
	this.actState = this.OFF;
	
	//Sound Wasserhahn
	this.audioElement = document.createElement('audio');
	this.audioElement.setAttribute('src', 'sounds/water-faucet.wav');
	this.audioElement.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.audioElement);
	this.audioElement.loop = true;
}

//Aktueller status	
Faucet.prototype.getActState = function(){
	return this.actState;
}

//Aktuellen Status wechseln		
Faucet.prototype.changeState = function(){
	if(this.getActState() === this.OFF){
		this.view.changeImage('images/faucet/on.png');
		this.actState = this.ON;
		this.audioElement.play();
	}		
	else{
		this.view.changeImage('images/faucet/off.png');
		this.actState = this.OFF;
		this.audioElement.pause();
		this.audioElement.currentTime = 0;
	}
}

//Get - Hitboxkoordinaten
Faucet.prototype.getHitBoxX = function() {
	return (this.view.getPosition().x);
}

Faucet.prototype.getHitBoxY = function() {
	return (this.view.getPosition().y);
}

Faucet.prototype.getHitBoxXend = function() {
	return ((this.view.getPosition().x + this.view.getPosition().h));
}

Faucet.prototype.getHitBoxYend = function() {
	return (this.view.getPosition().y + this.view.getPosition().w);
}	


