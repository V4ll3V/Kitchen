function Logik(stage, kitchen) {
	
	this.tmpObject = 0;
	//Erstes Rezeptarray( fÜr die Unterscheideung der Töpfe)
	this.steps1=[];
	this.steps1[0] = 0;
	//Zweites Rezeptarray (fÜr die Unterscheideung der Töpfe)
	this.steps2=[];
	this.help = [];
	this.kochenDone = 0;
	this.currentStep =0;
	this.currentStep2 =0;
	this.currentStep3 =0;
	this.anzahlSteps1 = 0;
	this.anzahlSteps2 = 0;
	this.kitchen = kitchen;
	this.videoGo = 0;
	this.stage = stage;
	this.kitchen = kitchen;
	this.tmpPot1 = 0;
	this.tmpPot2 = 0;

	
	this.buzzer = document.createElement('audio');
	this.buzzer.setAttribute('src', 'sounds/buzzthruloud.wav');
	this.buzzer.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.buzzer);
	this.buzzer.loop = false;
	this.buzzer.volume = 0.5;
	
	this.dong = document.createElement('audio');
	this.dong.setAttribute('src', 'sounds/clong-2.wav');
	this.dong.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.dong);
	this.dong.loop = false;
	this.dong.volume = 0.5;
	
	this.useri = document.querySelector('#userInfo');
}
Logik.prototype.resetLogik= function(){
	this.tmpPot1 = 0;
	this.tmpPot2 = 0;
	this.tmpObject = 0;
	this.steps1=[];
	this.steps2=[];
	this.help = [];
	this.kochenDone = 0;
	this.currentStep =0;
	this.currentStep2 =0;
	this.currentStep3 =0;
	this.anzahlSteps1 = 0;
	this.videoGo = 0;
}
//Zurücksetzen von Objekten bei falscher Interaktion
Logik.prototype.resetSomething = function(){
	if(this.tmpObject !== 0){		
			this.buzzer.play();
			console.log("FALSCH");
			this.tmpObject.resetPosition();
			//Sollte das Object ein Gewürz sein so wird dessen view von der Stage genommen
			if(this.tmpObject.isSpice === 1){
				this.stage.removeFromStage(this.tmpObject.view);
			}
			this.tmpObject =0;
	}
	
}
//Kontrollieren von Aktionen und weiter gehen von Kochschritten
Logik.prototype.changeSomething = function(tv, pot){
	that = this;
	//Damit man schon etwas machen kann bevor ein Rezept ausgewählt wurde
	if(this.steps1[0] !== 0){
		this.steps1.forEach(function(element, index, arr){
			if(that.anzahlSteps1<=index){
				//Gesammtanzhal des ersten Rezeptabschnittes
				that.anzahlSteps1++;
				that.currentStep3++;
			}
		});
		this.steps2.forEach(function(element, index, arr){
			if(that.anzahlSteps2<=index){
				//Gesammtanzhal des zweiten Rezeptabschnittes
				that.anzahlSteps2++; 
			}
		});
				//Überprüfung ob der erste Topf schon einen Wert hat und ob der Verwendete Topf schon abgespeichert ist
				if(this.tmpPot1 === 0){
						//Wenn nicht, dann wird der Aktuell verwendete Topf abgespeichert
						this.tmpPot1 = pot;	
					}
				//Sollte der erste temporäre Topf gespeichert sein, wird überprüft ob der zweite einen Wert hat
				else if(this.tmpPot2 === 0 && this.tmpPot1 !== pot){ 
					//Wenn nicht, wird der Aktuelle Topf als zweiter Temporärer Topf gespeichert
					this.tmpPot2 = pot;	
				}
				//Unterscheidung der Töpfe erster Topf hat eigene Rezeptschritte
				if(this.tmpPot1 === pot){ 
						//Sollte der aktuelle Step mit dem Object Namen (Step-Tag) überinstimmen und das Rezept nicht abgeschlossen ist
						if(this.steps1[this.currentStep] === this.tmpObject.name && this.kochenDone === 0){ //
							console.log("Das war richtig!!");
							this.currentStep++;
							this.tmpObject = 0;
							this.dong.play();
							//Überprüfen ob das nächste Video abgespielt werden soll
							if(this.videoGo === 1){
								tv.play(this.currentStep);
							 }
							 //Ausgabe in der Infobox
							this.useri.innerHTML = this.help[this.currentStep];
							
						}	
						else{		
							//Bei einem falschen Schritt
							this.resetSomething();	
						}	
				}
				//Unterscheidung der Töpfe zweiter Topf hat eigene Rezeptschritte
				else if(this.tmpPot2 === pot){
					//Sollte der aktuelle Step mit dem Object Namen (Step-Tag) überinstimmen und das Rezept nicht abgeschlossen ist
					if(this.steps2[this.currentStep2] === this.tmpObject.name && this.kochenDone === 0 && this.anzahlSteps1 === this.currentStep){
							console.log("Das war richtig!!");
							this.currentStep2++;
							this.currentStep3++;
							this.tmpObject = 0;
							this.dong.play();
							if(this.videoGo === 1){
								tv.play(this.currentStep3);
							 }
							this.useri.innerHTML = this.help[this.currentStep3];
					}					
					else{		
						//Bei einem falschen Schritt
						this.resetSomething();	
					}
				}	
		
				else{
					this.resetSomething();	
				}
				if((this.currentStep + this.currentStep2) === (this.anzahlSteps1+this.anzahlSteps2) && this.kochenDone === 0){
						//Wenn das Rezept abgeschlossen ist, wird alles zurück gesetz
						this.currentStep = 0;
						this.anzahlSteps = 0;
						this.kochenDone = 1;
						this.tmpPot1 =0;
						this.tmpPot2 =0;
				}
	}
}