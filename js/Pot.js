function Pot(view, draggable, name){
	this.name = name; 
	this.name2 = name; 
	this.MAX_TEMP = 100;
	this.MIN_TEMP = 20;
	this.view = view;
	this.actTemp = this.MIN_TEMP;
	this.ON  = 1;
	this.OFF = 0;
	this.actState = this.OFF;
	this.actWaterState = this.OFF;
	this.view.setDraggable(draggable);	
	this.intervall = 0; //Intervall, um den Topf etwas langsamer, als mit der Framerate zu erhitzen
    this.imgIntervall = 0; //Intervall, indem sich das Bild ändert
	
	this.MAX_WATER = 100; //Maximaler Wasserstand
	this.actWater = 0; //Aktueller Wasserstand
	this.actWaterTemp = 20; //Aktuelle Wassertemperatur
	this.water = 0; //1, sobald topf voll (100)
	
	//Sound - Topf auf den herd stellen
	this.audioPot = document.createElement('audio');
	this.audioPot.setAttribute('src', 'sounds/pot-on-stove.wav');
	this.audioPot.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.audioPot);
	this.audioPot.loop = false;
	this.audioPot.volume = 0.2;
	
	//Sound - kochendes Wasser
	this.boilingWater = document.createElement('audio');
	this.boilingWater.setAttribute('src', 'sounds/boiling-water.wav');
	this.boilingWater.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.boilingWater);
	this.boilingWater.loop = true;
	this.boilingWater.volume = 0.5;
}


//Methode zur Temperatursteigerung des Wassers und des Topfes
Pot.prototype.heatUp = function(){
	this.actTemp ++;
	if(this.water === 1){
		this.actWaterTemp ++;
	}
	
	return this.actTemp;
};

//Abkühlen
Pot.prototype.coolDown = function(){
	this.actTemp --;
	if(this.water === 1){
		this.actWaterTemp --;
	}
	return this.actTemp;
};

//Get - Stati
Pot.prototype.getActState = function(){
	return this.actState;
}

Pot.prototype.getActWaterState = function(){
	return this.actWaterState;
}

Pot.prototype.getActTemp = function(){
	return this.actTemp;
}

//Get - Positionskoordinaten
Pot.prototype.getPositionPotX = function() {
	return this.view.getPosition().x;
}

Pot.prototype.getPositionPotY = function() {
	return this.view.getPosition().y;
}

//Get - Hitboxkoordinaten der Objekte
Pot.prototype.getHitBoxX = function() {
	return this.view.getPosition().x;
}
Pot.prototype.getHitBoxY = function() {
	return this.view.getPosition().y; 
}
Pot.prototype.getHitBoxXend = function() {
	return ((this.view.getPosition().x + this.view.getPosition().w));
}
Pot.prototype.getHitBoxYend = function() {
	return (this.view.getPosition().y + this.view.getPosition().h);
}	

//Status zum automatischen befüllen von Wasser
Pot.prototype.changeWaterState = function(setWaterState){
	if(this.getActWaterState() === this.ON && setWaterState === 0){
		this.actWaterState = setWaterState;
	}
	else if(this.getActWaterState() === this.OFF && setWaterState === 1){
		this.actWaterState = setWaterState;
	}
}

//Töpfe erhitzen	
Pot.prototype.erhitzen = function(kitchen){
	this.intervall++;
	
	if(this.intervall === 2){
		if(this.actTemp < this.MAX_TEMP){
			this.heatUp();
			//Sound -> kochendes Wasser an
			if(this.actWaterTemp === 99){
				this.boilingWater.play();
			}
			console.log("Wasser: ",this.actWaterTemp, "°c");
			console.log("Pot: ",this.actTemp, "°c");
			
		}
		//Bildwechseln beim erhitzen der Töpfe 
		//Später evtl. mit Sprite (VisualRenderAnimation.js)
		if(this.name !== "pfanne"){
			if(this.actTemp === 30){
				this.view.changeImage('images/pot/topf_1.png');
			}
			if(this.actTemp === 35){
				this.view.changeImage('images/pot/topf_2.png');
			}
			if(this.actTemp === 40){
				this.view.changeImage('images/pot/topf_3.png');
			}
			if(this.actTemp === 50){
				this.view.changeImage('images/pot/topf_4.png');
			}
			if(this.actTemp === 60){
				this.view.changeImage('images/pot/topf_5.png');
			}
			if(this.actTemp === 70){
				this.view.changeImage('images/pot/topf_6.png');
			}
			if(this.actTemp === 80){
				this.view.changeImage('images/pot/topf_7.png');
			}
			if(this.actTemp === 90){
				this.view.changeImage('images/pot/topf_8.png');
			}
			if(this.actTemp === 99){
				//Ändern des Namens damit die Logik übereinstimmmt
				this.name = "topfHeiß";
				kitchen.logik.tmpObject = this;
				kitchen.logik.changeSomething(kitchen.tv, this);
			}
			if(this.actTemp === 100){
				this.view.changeImage('images/pot/topf_9.png');
				this.changeState = 0;
				
			}
		}
			if(this.name === "pfanne"){
			if(this.actTemp === 30){
				this.view.changeImage('images/pot/pan_1.png');
			}
			if(this.actTemp === 35){
				this.view.changeImage('images/pot/pan_2.png');
			}
			if(this.actTemp === 40){
				this.view.changeImage('images/pot/pan_3.png');
			}
			if(this.actTemp === 50){
				this.view.changeImage('images/pot/pan_4.png');
			}
			if(this.actTemp === 60){
				this.view.changeImage('images/pot/pan_5.png');
			}
			if(this.actTemp === 70){
				this.view.changeImage('images/pot/pan_6.png');
			}
			if(this.actTemp === 80){
				this.view.changeImage('images/pot/pan_7.png');
			}
			if(this.actTemp === 90){
				this.view.changeImage('images/pot/pan_8.png');
			}
			if(this.actTemp === 99){
					//Ändern des Namens für die Logik
					this.name = "topfHeiß";
					kitchen.logik.tmpObject = this;
					//Wieder pfanne nennen damit zwischen Pfanne und Topf unterschieden werden kann
					kitchen.logik.changeSomething(kitchen.tv, this);
					this.name = "pfanne";
					
			}
			if(this.actTemp === 100){
				this.view.changeImage('images/pot/pan_9.png');
				this.changeState = 0;
				
			}
		}
		this.intervall = 0;	
	}
	
}




Pot.prototype.abkuehlen = function(){
	this.intervall++;
	
	if(this.intervall === 20){
		if(this.actTemp > this.MIN_TEMP){
			this.coolDown();
			//Sound -> kochendes Wasser aus
			if(this.actWaterTemp <= 95){
				this.boilingWater.pause();
				this.boilingWater.currentTime = 0;
			}	
			console.log("Wasser: ",this.actWaterTemp, "°C");	
		}
		//Bildwechseln beim erhitzen der Töpfe 
		if(this.name !== "pfanne"){
			if(this.actTemp === 30){
				this.view.changeImage('images/pot/topf_1.png');
			}
			if(this.actTemp === 35){
				this.view.changeImage('images/pot/topf_2.png');
			}
			if(this.actTemp === 40){
				this.view.changeImage('images/pot/topf_3.png');
			}
			if(this.actTemp === 50){
				this.view.changeImage('images/pot/topf_4.png');
			}
			if(this.actTemp === 60){
				this.view.changeImage('images/pot/topf_5.png');
			}
			if(this.actTemp === 70){
				this.view.changeImage('images/pot/topf_6.png');
			}
			if(this.actTemp === 80){
				this.view.changeImage('images/pot/topf_7.png');
			}
			if(this.actTemp === 90){
				this.view.changeImage('images/pot/topf_8.png');
			}
			if(this.actTemp === 100){
				this.view.changeImage('images/pot/topf_9.png');
			}
		}
		this.intervall = 0;
	}	
}
Pot.prototype.befuellen = function(){
	this.actWater = 0;
	this.actWaterTemp = 20;
	this.water = 0;
}
Pot.prototype.resetPosition = function() {
	this.actWater = 0;
	this.actWaterTemp = 20;
	this.water = 0; //1, sobald topf voll (100)
	this.actTemp = 0;
	this.actState = 0;
	this.view.resetPosition();
	console.log(this);
	if(this.name !== "pfanne"){
		this.view.changeImage('images/pot/topf_0.png');
	}
	else{
		this.view.changeImage('images/pot/pan_0.png');
	}
}

Pot.prototype.befuellen = function(kitchen){
	if (this.actWater < this.MAX_WATER && this.name !=='pfanne'){
		this.actWater ++;
		if (this.actWater === 99){
		//Name äern für die Logik
			this.name = "wasserInTopf";
			kitchen.logik.tmpObject = this;
			kitchen.logik.changeSomething(kitchen.tv, this);
		}
		if (this.actWater === 100){
			this.water = 1;
		}
	}
}
	

