function Books_big(view, draggable){
	this.view = view;
	this.OPEN  = 1;
	this.CLOSE	= 0;
	this.actState = this.CLOSE;
	this.view.setDraggable(draggable);	
}

//Aktueller Status
Books_big.prototype.getActState = function(){
	return this.actState;
}

//Aktuellen Status wechseln
Books_big.prototype.changeActState = function(){
	if (this.actState === this.CLOSE){
		this.actState = this.OPEN;
	}else{
		this.actState = this.CLOSE;
	}
}

//Buch schließen
Books_big.prototype.close = function(){
		this.view.setWidth(7);
		this.view.setHeight(10);
		this.actState = this.CLOSE;
}

//Buch öffnen
Books_big.prototype.open = function(maxY){
	if(this.view.getPosition().h <= maxY){
		this.view.setWidthP(7);
		this.view.setHeightP(10);
		this.actState = this.OPEN;
		this.currRec = 1;
	}
}

//nächstes Rezept wählen
Books_big.prototype.nextRecipe = function(){
	this.currRec ++;
}

//vorheriges Rezept wählen
Books_big.prototype.lastRecipe = function(){
	this.currRec --;
}

//Auswahl der verschiedenen Rezepte!
Books_big.prototype.currentRecipe = function(stage, kitchen){
	switch (this.currRec){
		case 1:
			kitchen.stage.addToStage(kitchen.recipes[0].view);
			this.close();
			kitchen.stage.removeFromStage(kitchen.books_big[0].view);
			break;
		case 2:
			kitchen.stage.addToStage(kitchen.recipes[1].view);
			this.close();
			kitchen.stage.removeFromStage(kitchen.recipes[0].view);
			break;
		case 3:
			kitchen.stage.addToStage(kitchen.recipes[2].view);
			this.close();
			kitchen.stage.removeFromStage(kitchen.recipes[1].view);
			break;
	}
	//Weiter Button anzeigen!
	kitchen.stage.addToStage(kitchen.button[0].view);
	kitchen.stage.addToStage(kitchen.button[1].view);
	kitchen.stage.addToStage(kitchen.button[2].view);
}


	