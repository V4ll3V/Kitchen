function Kitchen (canvasId){
	var FRAMERATE = 40;
	var kueche = this; 
	
	this.intervalTime=1000/FRAMERATE;
	this.stage = new Stage(canvasId);
	this.wait = 0;
	this.cookingStart = 0;
	//Verschiedene Arrays in denen die Objekte gespeichert werden
	this.tv = 0;
	this.book_big = 0;
	this.book = 0;
	this.pots = [];
	this.mapPots = [];
	this.plates = [];
	this.doors = [];
	this.faucets = [];
	this.books = [];
	this.books_big = [];
	this.button = [];
	this.recipeTitle = 0;
	this.ingredients = [];
	this.spicery = [];
	this.result = [];
	
	this.ingredientInPot1 = [];
	this.ingredientInPot1[0] = null;
	this.counterPot1 = 0;
	this.ingredientInPot2 = [];
	this.ingredientInPot2[0] = null;
	this.counterPot2 = 0;
	this.ingredientInPot3 = [];
	this.ingredientInPot3[0] = null;
	this.counterPot3 = 0;
	this.recipes = [];
	this.decorations = [];
	//Zur ausgabe in der Oberen Div-Box
	this.useri = document.querySelector('#userInfo');

	//Sound Lichtschwert
	this.lightSaber= document.createElement('audio');
	this.lightSaber.setAttribute('src', 'sounds/saber.wav');
	this.lightSaber.setAttribute('type', 'audio/wav');
	document.body.appendChild(this.lightSaber);
	this.lightSaber.loop = false;
	this.lightSaber.volume = 0.5;
	
	//Objekte 
	//Objekte auslagern
	Ajax.getJSON('ressources.json', function(ressources){
		ressources.forEach(function(ressource){
			var vro = new VisualRenderObjectExtend(kueche.stage.getContext(),ressource.x, ressource.y, ressource.height, ressource.width, ressource.image, ressource.z);			
			switch (ressource.type){
				case 'Pot':
					var model = new Pot(vro, ressource.draggable, ressource.id);
					kueche.pots.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'PotMap':
					var model = new mapPot(vro);
					kueche.mapPots.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Plate':
					var model = new Plate(vro);
					kueche.plates.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Door':
					var model = new Door(vro);
					kueche.doors.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Faucet':
					var model = new Faucet(vro);
					kueche.faucets.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'TV':
					var model = new Movie(vro);
					kueche.stage.addToStage(vro);
					kueche.tv = model;
				break;
				
				case 'Rezeptbuch_k':
					var model = new Books(vro);
					kueche.books.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Rezeptbuch_g':
					var model = new Books_big(vro);
					kueche.books_big.push(model);
					kueche.book_big = model;
				break;
				
				case 'Button':
					var model = new Button(vro);
					kueche.button.push(model);
					kueche.book = model;
				break;
				case 'Recipe':
					var model = new Recipes(vro, ressource.id);
					kueche.recipes.push(model);
				break;
				
				case 'Zutaten':
					var model = new Ingredient(vro, ressource.id, ressource.draggable, ressource.map_x, ressource.map_y, ressource.is_spice);
					kueche.ingredients.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Spicery':
					var model = new Ingredient(vro, ressource.id, ressource.draggable, ressource.map_x, ressource.map_y, ressource.is_spice);
					kueche.ingredients.push(model);
				break;
				
				case 'Gimmick':
					var model = new Ufo(vro, ressource.draggable);
					kueche.decorations.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Spender':
					var model = new Spicery(vro);
					kueche.spicery.push(model);
					kueche.stage.addToStage(vro);
				break;
				
				case 'Result':
					var model = new Result(vro, ressource.draggable, ressource.id);
					kueche.result.push(model);
				break;	
				
				case 'Deko':
					console.log("DEOK");
					var model = new Decoration(vro, ressource.draggable);
					kueche.decorations.push(model);
					kueche.stage.addToStage(vro);

				break;
			};
		});
	});
	
	this.logik = new Logik(this.stage, this.kitchen);
	this.tmpResult = 0;
	this.tmpRecipe = 0;
	
	var kitchen = this;
	var stage = this.stage;
	setInterval(function(){kitchen.run(stage, kitchen)},this.intervalTime);
	//EventListner
	this.stage.registerEvent('click', this);
	this.stage.registerEvent('dragend', this);
}

//Temporäre Merkvariablen für Objekte!
var tmpDoor = null;
var tmpPlate = null;
var tmpIngredient = null;
var pot1 = null;
var pot2 = null;
var pot3 = null;
//------------------------------------
//Wird ausgeführt, nachdem eine Zutat über einen Topf/Pfanne gezogen und losgelassen wurde
Kitchen.prototype.dropIngredient = function(stage, kitchen, currentPot, tmpIngredient){
		if(tmpIngredient.actState === 1){
			
			kitchen.stage.removeFromStage(tmpIngredient.view);
			//Sollte es sich um pot1 handeln
			if(currentPot === kitchen.pots[0]){
				//Verändern der Position der Zutat auf pot1 -Mapview
				tmpIngredient.view.setPositionY(630 + tmpIngredient.positionMapPotY);
				tmpIngredient.view.setPositionX(890 + tmpIngredient.positionMapPotX);
				kitchen.stage.addToStage(tmpIngredient.view);
				tmpIngredient.view.setDraggable(false);
				//state Zutat befindet sich im Topf
				tmpIngredient.actState = 2;
				//Logik ausführen 
				tmpIngredient.setLogik(kitchen, currentPot);
				//Sollte die Aktion des Useres richtig gewesen sein, wird das Objekt im Array gespeichert(für das Ufo)
				if(tmpIngredient.actState != 0){
					this.ingredientInPot1[this.counterPot1] = tmpIngredient;
					this.counterPot1++;
				}
			}
			//Sollte es sich um pot2 handeln
			if(currentPot=== kitchen.pots[1]){
				//Verändern der Position der Zutat auf pot2	-Mapview
				tmpIngredient.view.setPositionY(630 + tmpIngredient.positionMapPotY);
				tmpIngredient.view.setPositionX(750 + tmpIngredient.positionMapPotX);
				kitchen.stage.addToStage(tmpIngredient.view);
				tmpIngredient.view.setDraggable(false);
				//state Zutat befindet sich im Topf
				tmpIngredient.actState = 2;
				//Logik ausführen 
				tmpIngredient.setLogik(kitchen, currentPot);
				//Sollte die Aktion des Useres richtig gewesen sein, wird das Objekt im Array gespeichert(für das Ufo)
				if(tmpIngredient.actState != 0){
					this.ingredientInPot2[this.counterPot2] = tmpIngredient;
					this.counterPot2++;
				}
			}
			//sollt es sich um die Pfanne handeln
			if(currentPot=== kitchen.pots[2]){
			//Verändern der Position der Zutat auf pfanne - Mapview
				tmpIngredient.view.setPositionY(610 + tmpIngredient.positionMapPotY);
				tmpIngredient.view.setPositionX(620 + tmpIngredient.positionMapPotX);
				kitchen.stage.addToStage(tmpIngredient.view);
				tmpIngredient.view.setDraggable(false);
				//state Zutat befindet sich in der Pfanne
				tmpIngredient.actState = 2;
				//Logik ausführen 
				tmpIngredient.setLogik(kitchen, currentPot);
				//Sollte die Aktion des Useres richtig gewesen sein, wird das Objekt im Array gespeichert(für das Ufo)
				if(tmpIngredient.actState != 0){
					this.ingredientInPot3[this.counterPot3] = tmpIngredient;
					this.counterPot3++;
				}
			}
		}
}
//Methode zum ausfahren der UserInfo(Div-Box oben)
Kitchen.prototype.userMenuOpen = function(stage, kitchen){
		var userInfo = document.getElementById("userInfo");
		//Abwarten bi die Küche geladen ist und der user bereit für aufnahme von Input
		if(kitchen.wait > 100){
			userInfo.style.visibility='visible';
			var userInfoWidth = userInfo.offsetWidth;
			
			if(userInfoWidth < 950){
				//Abspielen des Sounds
				kitchen.lightSaber.play();
				userInfo.style.width = (userInfoWidth + 50) + "px";
			}
			if(userInfoWidth > 800 && userInfoWidth < 900){
				//Wenn die UserInfo ausgefahren ist, wird der Text eingefügt
				this.useri.innerHTML ="Hallo in der Zukunftsküche! Klicken Sie auf das Rezeptbuch um anzufangen!"
			}
		
		
	}
	kitchen.wait++;
}

Kitchen.prototype.reset = function(stage, kitchen){
	//Die Logik wird gelöscht 
	kitchen.logik.resetLogik();					
	//Die Zustände der Töpfe werden auf 0 gesetz.
	kitchen.pots.forEach(function(element, index, arr){
		element.resetPosition();
	});
	this.pots.forEach(function(elementPots, indexPots, arrPots){
		console.log(elementPots.water);
		console.log(elementPots.name);
		
		if(elementPots.water === 1 && elementPots.name !=="pfanne"){
			that.mapPots[index].changeImage('images/pot/Pot_mapview.png');
			elementPots.water = 0;
			elementPots.actWater = 0;
		}
	});
	//Die Zutaten sind wieder an Ihren Ursprung
	kitchen.ingredients.forEach(function(element, index, arr){
		element.resetPosition();
		if(element.isSpice === 1){
			kitchen.stage.removeFromStage(element.view);
		}
		if(element.isSpice === 0){
			kitchen.stage.addToStage(element.view);
		}
	});
	kitchen.result.forEach(function(element, index, arr){
		element.view.resetPosition();
		kitchen.stage.removeFromStage(element.view);
	});
	//Resetten der MpViewIngredient Arrays für das Ufo
	kitchen.ingredientInPot1 = [];
	kitchen.ingredientInPot1[0] = null;
	kitchen.counterPot1 = 0;
	kitchen.ingredientInPot2 = [];
	kitchen.ingredientInPot2[0] = null;
	kitchen.counterPot2 = 0;
	kitchen.ingredientInPot3 = [];
	kitchen.ingredientInPot3[0] = null;
	kitchen.counterPot3 = 0;
}

//RUN!
Kitchen.prototype.run = function(stage, kitchen ){		
	var that = this;
	this.userMenuOpen(stage, kitchen);
	Kitchen.prototype.onClick = function(event){
		//Wählt rezept aus!
		this.recipes.forEach(function(element, index, arr){
			var tmpIndex;
			if(event.target === element.view){
				that.tmpRecipe = element;
				element.setRecipe(index, kitchen, stage);
				tmpIndex = index;
				
				var reclistElement,
				recRenderAreaElement;
				
				recDetailsElem = document.querySelector('#recipe-details');
				//JSON Datei Laden
				Ajax.getJSON('rezepte.json', function (rezepte) {
					rezepte.forEach(function (rezept, index) {
						if (index === tmpIndex){
								kitchen.reset(stage, kitchen);
								//Rezept holen
								recDetailsElem.innerHTML = '';
								var recDetails = new RecDetails(recDetailsElem, rezept, kitchen);
								recDetails.render();
								that.useri.innerHTML = kitchen.logik.help[0];
								console.log(kitchen.tv);
								//setzt Variable auf true nachdem Rezept ausgewählt wird -> Logik
								//Für die Videoausgabe (Nur für Sphagetti Napoli gibt es ein Video) 
								if("Spaghetti Napoli" === that.recipeTitle){
									kitchen.tv.play(0);	
									kitchen.logik.videoGo = 1;
								}
								else{
									kitchen.logik.videoGo = 0;
								}
								
						}
					});
				});
			}//endif
		} );//endForEach
		
		
		this.books_big.forEach(function(element, index, arr){
			if(event.target === element.view){
				element.currentRecipe(stage, kitchen);
			}
		} );
	
		//Wechselt durch klick auf weiter zum nächsten Rezept
		if(event.target === kitchen.button[0].view){				
			//Abfrage, ob Rezept äberhaupt vorhanden
			if(kitchen.books_big[0].currRec <= 2){
				kitchen.books_big[0].nextRecipe();
			}
			kitchen.books_big[0].currentRecipe(stage, kitchen);
		}
		if(event.target === kitchen.button[1].view){
			//Abfrage, ob Rezept überhaupt vorhanden			
			if(kitchen.books_big[0].currRec > 1){
				kitchen.books_big[0].lastRecipe();
			}
			kitchen.books_big[0].currentRecipe(stage, kitchen);
		}	
		//Schließen des Kochbuches ohne ein Rezept zu wählen
		if(kitchen.button[2].view === event.target){
			kitchen.books_big[0].close();
			kitchen.stage.removeFromStage(kitchen.books_big[0].view);
			
			this.recipes.forEach(function(element, index, arr){
				that.stage.removeFromStage(element.view);
			});
			this.button.forEach(function(element, index, arr){
				that.stage.removeFromStage(element.view);
			});
			
		}
		
		this.books.forEach(function(element, index, arr){
			if(event.target === element.view){
				kitchen.stage.addToStage(kitchen.books_big[0].view);
				kitchen.books_big[0].changeActState();
			}
		} );
		
		//Wasserhahn
		this.faucets.forEach(function(element, index, arr){
			if(event.target === element.view){
				element.changeState();
			}
		} );
		
		//Türen
		this.doors.forEach(function(element, index, arr){
			//Wechselt Status zum öffnen/Schließen der Tür
			if(event.target === element.view){
				tmpDoor = element;
				tmpDoor.changeActState();
				if(tmpDoor === that.doors[2]){
					that.decorations[0].actState = 1;
				}
			}
		} );
		//Um Zutaten aus dem Topf zu holen
		this.ingredients.forEach(function(tmpIngredient, index, arr){
			if(event.target === tmpIngredient.view){
				tmpIngredient.actState = tmpIngredient.actState + 1;
				if(tmpIngredient.actState === 3){
					if(tmpIngredient.isSpice === 1){
						kitchen.stage.removeFromStage(tmpIngredient.view);
						tmpIngredient.actState =0;
					} 
					else{
						tmpIngredient.resetPosition();
						tmpIngredient.actState = 0
						tmpIngredient.view.setDraggable(true);
					}
				}
			}
			
		});
	//Um das Wasser aus den Töpfen zu holen
	this.pots.forEach(function(elementPots, indexPots, arrPots){
		
		that.mapPots.forEach(function(element, index, arr){
			
				if(event.target === element.view){
					if(elementPots.water === 1 && elementPots.name !=="pfanne"){
						that.mapPots[index].changeImage('images/pot/Pot_mapview.png');
						elementPots.water = 0;
						elementPots.actWater = 0;
					}
				}
		});
	});
	}//onClick end
	
	Kitchen.prototype.onDragend = function(event){
		tmpPlate = this.plates[0];


		this.pots.forEach(function(element, index, arr){
			if(event.target === element.view){
				var tmpPot = element;
				//Merkvariablen für die Positionen
				//Topf
				var potX = tmpPot.getPositionPotX();
				var potY = tmpPot.getPositionPotY();
				var potHitXend = tmpPot.getHitBoxXend();
				var potHitYend = tmpPot.getHitBoxYend();
				//Platte
				var plateHitX = tmpPlate.getHitBoxX();
				var plateHitY = tmpPlate.getHitBoxY();
				var plateHitXend = tmpPlate.getHitBoxXend();
				var plateHitYend = tmpPlate.getHitBoxYend();
				
				//Wasserhahn
				var faucetHitX = kitchen.faucets[0].getHitBoxX();
				var faucetHitY = kitchen.faucets[0].getHitBoxY();
				var faucetHitXend = kitchen.faucets[0].getHitBoxXend();
				var faucetHitYend = kitchen.faucets[0].getHitBoxYend();
				
				//öl
				var oilHitX = (kitchen.spicery[0].getHitBoxX() - tmpPot.view.getPosition().w +50);
				var oilHitY = kitchen.spicery[0].getHitBoxY();
				var oilHitXend = (kitchen.spicery[0].getHitBoxXend()- tmpPot.view.getPosition().w + 10);
				var oilHitYend = kitchen.spicery[0].getHitBoxYend();
				//Salz
				var saltHitX = (kitchen.spicery[1].getHitBoxX()- tmpPot.view.getPosition().w+ 40);
				var saltHitY = kitchen.spicery[1].getHitBoxY();
				var saltHitXend = (kitchen.spicery[1].getHitBoxXend()- tmpPot.view.getPosition().w + 10);
				var saltHitYend = kitchen.spicery[1].getHitBoxYend();
				//Pfeffer
				var pepperHitX = (kitchen.spicery[2].getHitBoxX() - tmpPot.view.getPosition().w + 50);
				var pepperHitY = kitchen.spicery[2].getHitBoxY();
				var pepperHitXend = (kitchen.spicery[2].getHitBoxXend() - tmpPot.view.getPosition().w + 10);
				var pepperHitYend = kitchen.spicery[2].getHitBoxYend();
				//######################################
				
				//if abfragen, ob topf über herd!
				if(((potX >= plateHitX) && (potX <= plateHitXend)) && ((potY >= plateHitY) && (potY <= plateHitYend))){
					tmpPot.actState = 1;
					tmpPot.audioPot.play();
				}else{
					tmpPot.actState = 0;
				}
				
				//Hier mit Wasser befüllen!
				if(((potX >= faucetHitX) && (potX <= faucetHitXend)) && ((potY >= faucetHitY) && (potY <= faucetHitYend))){
					tmpPot.changeWaterState(1);
				}else{
					tmpPot.changeWaterState(0);
				}
				//Gewürzspender!
				//öl
				if(((potX  >= oilHitX) && (potX <= oilHitXend)) && ((potY >= oilHitY) && (potY <= oilHitYend))){
					that.ingredients[5].actState = 1;
					that.dropIngredient(stage, kitchen,tmpPot,(that.ingredients[5])); 
				}
				//Salz
				if(((potX >= saltHitX) && (potX <= saltHitXend)) && ((potY >= saltHitY) && (potY <= saltHitYend))){
					that.ingredients[7].actState = 1;
					that.dropIngredient(stage, kitchen,tmpPot,(that.ingredients[7])); 		
				}
				//Pfeffer
				if(((potX >= pepperHitX) && (potX <= pepperHitXend)) && ((potY >= pepperHitY) && (potY <= pepperHitYend))){
					that.ingredients[6].actState = 1;
					that.dropIngredient(stage, kitchen,tmpPot,(that.ingredients[6])); 
				}
				

				
			}	
		} );		
		this.ingredients.forEach(function(elementIngredient, index, arr){
				var ingredient = elementIngredient;
				if(event.target === elementIngredient.view){
					that.pots.forEach(function(elementPot, index, arr){
						currentPot = elementPot;
						
						//Merkvariablen für die Positionen
						var hitX = currentPot.getHitBoxX();
						var hitY = currentPot.getHitBoxY();
						var hitXend = currentPot.getHitBoxXend();
						var hitYend = currentPot.getHitBoxYend();

						var ingredientX = ingredient.getPositionIngredientX();
						var ingredientY = ingredient.getPositionIngredientY();
						//######################################
					
						//if, ob Zutat über Topf!
						if(((ingredientX >= hitX) && (ingredientX <= hitXend)) && ((ingredientY >= hitY) && (ingredientY <= hitYend))){
							ingredient.actState = 1;
							that.dropIngredient(stage, kitchen, currentPot, ingredient);	
						}
				});
				
				}
		} );
	}//dragend end
	
	//Türen öffnen (Animation)
	if(tmpDoor != null && tmpDoor.getActState() === 1){
			tmpDoor.open(10);
	}	
	//Türen schließen (Animation)
	if(tmpDoor != null && tmpDoor.getActState() === 0){
			tmpDoor.close(10);
	}
	//UFO
	if(this.decorations[0].actState === 1){
		this.decorations[0].go(this);
	}
	//Rezeptbuch öffnen (Animation)
	if(kitchen.books_big[0].getActState() === 1){
		kitchen.books_big[0].open(500);
		
	}	
	//Anzeigen des Endergebnisses
	if(this.logik.kochenDone === 1){
		//Ufo kommt zurück
		this.decorations[0].actState = 0;
			kitchen.result.forEach(function(element, index, arr){
				if(element.name == kitchen.tmpRecipe.name){
					that.tmpResult = element;	
				}
			});
		this.decorations[0].go(this, this.tmpResult);
	}
	
	//Topfaktionen in der run
	this.pots.forEach(function(element, index, arr){
		var tmpPot = element;
		
		//Topf erhitzen/abkühlen
		if(tmpPot.getActState() === 1){
			tmpPot.erhitzen(kitchen);
		}
		
		//Wasser in/aus Topf
		if((tmpPot.getActWaterState() === 1) && (kitchen.faucets[0].getActState() === 1)){
			tmpPot.befuellen(kitchen);
		}
		//Wasser in den pot-Mapvies einfügen
		if(tmpPot.actWater === 100){
			kitchen.mapPots[index].changeImage('images/pot/Pot_mapview_water.png');
			tmpPot.actTemp = 20;
			tmpPot.actWater = 99;
		}
	});
	
	
	stage.render();
}