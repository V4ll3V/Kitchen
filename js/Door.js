function Door(view) {
	this.OPEN = 1;
	this.CLOSE = 0;
	this.view = view;
	this.actState = this.CLOSE;
	
	this.audioOpen = document.createElement('audio');
	this.audioOpen.setAttribute('src', 'sounds/fridge-open.wav');
	this.audioOpen.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.audioOpen);
	this.audioOpen.loop = false;

	this.audioClose = document.createElement('audio');
	this.audioClose.setAttribute('src', 'sounds/fridge-close.wav');
	this.audioClose.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.audioClose);
	this.audioClose.loop = false;	
}

//Aktueller status
Door.prototype.getActState = function(){
	return this.actState;
}

//aktuellen status wechseln
Door.prototype.changeActState = function(){
	if (this.actState === this.CLOSE){
		this.actState = this.OPEN;
		this.audioOpen.play();
	}else{
		this.actState = this.CLOSE;
		this.audioClose.play();
	}
}

//Beim öffnen wird die Breite der Tür verkleinert, um einen räumlichen effekt zu erzeugen
Door.prototype.open = function(count){
	if((this.view.getPosition().w - count) >= 8){
		this.view.setWidth(count);
		this.view.setPositionX(this.view.getPosition().x + 1.5);
	}
}

//Beim schließen wird sie wieder auf ihren Ursprung gesetzt
Door.prototype.close = function(count){
	if(this.view.getPosition().w + count <= this.view.resetWidth()){
		this.view.setWidthP(count);
		this.view.setPositionX(this.view.getPosition().x - 1.5);
		this.actState = this.CLOSE;
	}
}

