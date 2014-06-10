/*
* Kleine Animation - Ufo fliegt aus Schrank, klaut Tomate und verschwindet,  
* um den Aspekt des Themas Futuristisch/Space gerecht zu werden und
* näher zu kommen.
*/
function Ufo(view, draggable){
	this.view = view;
	this.view.setDraggable(draggable);
	this.actState = 0;
	this.move = 1;
	
	//Sound Ufo
	this.audioheli = document.createElement('audio');
	this.audioheli.setAttribute('src', 'sounds/ufo.wav');
	this.audioheli.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.audioheli);
	this.audioheli.loop = false;
	this.audioheli.volume = 0.6;	
}

//Startmethode	
Ufo.prototype.go = function(kitchen, result){
	that = this;
	//Erste beweungsaktion nach links oben
		if(this.move === 1){
			this.view.addPositionX(5);
			this.view.addPositionY(5);
			this.audioheli.currenTime = 15;
			this.audioheli.play();
		}
	//zweite Bewegungsaktion nach rechts
		if(this.move === 2){
			this.view.addPositionX(-10);
		}
	//Dritte Bewegungsaktion Zutat wird "Hoch gebeamt"
		if(this.move === 3){
			kitchen.decorations[1].view.addPositionX(1);
			kitchen.decorations[1].view.addPositionY(1);
		}
	//Vierte Bewegunsaktion nach oben abhauen
		if(this.move === 4){
			this.view.addPositionY(10);
		}
	//Nach dem kochen fliegt das Ufo wieder runter richtung MapViewPfanne
		if(this.move === 5 && kitchen.logik.kochenDone === 1){
			this.audioheli.currenTime = 15;
			this.audioheli.play();
			this.view.addPositionY(-5);
			this.view.addPositionX(-1.2);
		}
	//Wenn es bei der MapViewPfanne angekommen ist, werden die Zutaten richtung Ufo bewegt
		if(this.move === 6){
			kitchen.ingredientInPot3.forEach(function(element, index, arr){
				if(element !== null){
					element.view.addPositionX(1);
					element.view.addPositionY(1);	
				}
			});
		}
	//Wenn eine Zutat das Ufo berührt, dann fliegt es weiter zum nächsten Topf
		if(this.move === 7){
			this.view.addPositionX(-5);
		}
		//Gleiches spiel wie bei der Pfanne
		if(this.move === 8){
			kitchen.ingredientInPot2.forEach(function(element, index, arr){
				if(element !== null){
					element.view.addPositionX(1);
					element.view.addPositionY(1);	
				}
			});
		}
	//Das Ufo fliegt zum letzten Topf
		if(this.move === 9){
			this.view.addPositionX(-5);
		}
	//Wieder werden die Zuataten hoch gebeamt
		if(this.move === 10){
			kitchen.ingredientInPot1.forEach(function(element, index, arr){
				if(element !== null){
					element.view.addPositionX(1);
					element.view.addPositionY(1);	
				}
			});
		}
	//Ufo fliegt hoch zum blageplatz
		if(this.move === 11){
			this.audioheli.currenTime = 15;
			this.audioheli.play();
			this.view.addPositionY(5);
			this.view.addPositionX(4);
			
		}
	//Das Ufo "beamt" das Ergebnis Gericht runter
		if(this.move === 12){
			result.view.setPositionX = this.view.getPosition().x;
			result.view.setPositionY = this.view.getPosition().y;
			console.log(result.view.getPosition().x);
			kitchen.stage.addToStage(result.view);
			result.view.addPositionX(-0.5);
			result.view.addPositionY(-1);
		}
	//Und es Verschwindet wieder nach Oben bis es ungefähr an der Stelle von Position 5 ist
		if(this.move === 13){
			this.view.addPositionX(5);
			this.view.addPositionY(10);
		}
	//Überprüfen und dann Move verändern
		//Wenn das Ufo Oben links angekommen ist: setzte Move auf 2
		if(this.view.getPosition().x === 170 && this.view.getPosition().y === 150 && kitchen.logik.kochenDone === 0){
			this.move = 2;
		}
		//Wenn das Ufo an der Zutat ist: Move auf 3
		if(this.view.getPosition().x === 440 && this.move === 2 ){
			this.move = 3;
			this.view.changeImage('images/ufo1.png');
		}
		//Nachdem das Ufo die Zutat "hoch gebeam" hat: setzte Move auf 4 und lasse Zutat verschwinden
		if(kitchen.decorations[1].view.getPosition().y === 150 &&this.move === 3){
			this.view.changeImage('images/ufo2.png');
			kitchen.stage.removeFromStage(kitchen.decorations[1].view);
			this.move = 4;
		}
		//Nachdem das Ufo aus dem Bild ist: setzte Move auf 5
		if(this.view.getPosition().y <=-100 &&this.move === 4){
			this.move = 5;
		}
		//Wenn das Ufo unten an der Pfanne angekommen ist: setzte Move auf 6,änder image
		if(this.view.getPosition().y >= 590 && this.move === 5&& kitchen.logik.kochenDone === 1){
			this.move = 6;
			this.view.changeImage('images/ufo1.png');
		}
		//Wenn die MapViePfanne Zutaten hat
		if(kitchen.ingredientInPot3[0] !== null){
			//Wenn das Ufo die Zutaten aus der Pfanne gezogen hat: setzte Move auf 7, ziehe Zutaten aus der Pfanne, änder image
			if(kitchen.logik.kochenDone === 1 && kitchen.ingredientInPot3[0].view.getPosition().y === 650 && this.move === 6){
				kitchen.ingredientInPot3.forEach(function(element, index, arr){
					kitchen.stage.removeFromStage(element.view);
				});
				this.view.changeImage('images/ufo2.png');
				this.move = 7;
			}
		}
		//Wenn die MapViewPfanne leer ist: setzte Move auf 7, änder image
		else if(kitchen.logik.kochenDone === 1 && this.move === 6){
			this.view.changeImage('images/ufo2.png');
			this.move = 7;
		}
		//Wenn das ufo am nächsten MapViewTopf ist: setzte Move auf 8
		if(this.view.getPosition().x >= 730 && this.move === 7){
			this.move = 8;
			this.view.changeImage('images/ufo1.png');
		}
		//Wenn die MapViewTopf Zutaten hat
		if(kitchen.ingredientInPot2[0] !== null){
			//Wenn das Ufo die Zutaten aus dem Topf gezogen hat: setzte Move auf 9, ziehe Zutaten aus dem Topf, änder image
			if(kitchen.logik.kochenDone === 1 && kitchen.ingredientInPot2[0].view.getPosition().y === 650 && this.move === 8){
				kitchen.ingredientInPot2.forEach(function(element, index, arr){
					kitchen.stage.removeFromStage(element.view);
				});
				this.view.changeImage('images/ufo2.png');
				this.move = 9;
			}
		}
		//Wenn der MapViewTopf leer ist: setzte Move auf 9, änder image
		else if(kitchen.logik.kochenDone === 1 && this.move === 8){
			this.view.changeImage('images/ufo2.png');
			this.move = 9;
		}
		// Wenn das Ufo am nächsten MapViewTopf ist: Move auf 10, änder Bild
		if(this.view.getPosition().x >= 870 && this.move === 9 ){
			this.move = 10;
			this.view.changeImage('images/ufo1.png');
		}
		//Wenn die MapViewTopf Zutaten hat
		if(kitchen.ingredientInPot1[0] !== null){
			//Wenn das Ufo die Zutaten aus dem Topf gezogen hat: setzte Move auf 11, ziehe Zutaten aus dem Topf, änder image
			if(kitchen.logik.kochenDone === 1 && kitchen.ingredientInPot1[0].view.getPosition().y === 650 && this.move === 10){
				kitchen.ingredientInPot1.forEach(function(element, index, arr){
					kitchen.stage.removeFromStage(element.view);
				});
				this.view.changeImage('images/ufo2.png');
				this.move = 11;
			}
		}
		//Wenn der MapViewTopf leer ist: setzte Move auf 11, änder image
		else if(kitchen.logik.kochenDone === 1 && this.move === 10){
			this.view.changeImage('images/ufo2.png');
			this.move = 11;
		}
		//Wenn das Ufo Bei Ablageplatz is: setzte Move auf 12, änder image
		if(this.move === 11 && this.view.getPosition().x <= 765){
			this.view.changeImage('images/ufo1.png');
			this.move = 12;
		}
		//Wenn das Ergebnis Gericht runter "gebeamt" wurde, setzte Move auf 12, änder Bild
		if(this.move === 12 && result.view.getPosition().x >=780){
			this.view.changeImage('images/ufo2.png');
			this.move = 13;
		}
		//Wenn das Ufo aus dem Bild ist: setzte Move zurück auf 5 um ein weiteres Gericht beenden zu können,
		//setzte logik.kochenDone auf 0
		if(this.move === 13 && this.view.getPosition().y <=-100){
			this.move = 5;
			kitchen.logik.kochenDone = 0;
			kitchen.ingredientInPot1 = [];
			kitchen.ingredientInPot1[0] = null;
			kitchen.ingredientInPot2 = [];
			kitchen.ingredientInPot2[0] = null;
			kitchen.ingredientInPot3 = [];
			kitchen.ingredientInPot3[0] = null;
		}
	}

	