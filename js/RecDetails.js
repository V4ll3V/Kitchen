function RecDetails(container, data, kitchen) {
    var container = container;
    // Funktion für das Rendern der Aufgabe.
    this.render = function () {
        // Titel
        var recTitleElement = document.createElement('h2');
        var recTitleText = document.createTextNode(data.title);
        recTitleElement.appendChild(recTitleText);
        container.appendChild(recTitleElement);
		kitchen.recipeTitle = data.title;
		
		//Bild
		var recPicElement = document.createElement('img');
        var recPicSrc = recPicElement.setAttribute('src', data.img);
        var recPicSrc = recPicElement.setAttribute('width', 150);
        container.appendChild(recPicElement);
		
		//Zutaten
		var headlineElement = document.createElement('h3');        
        var headlineElementText = document.createTextNode('Zutaten:');
        headlineElement.appendChild(headlineElementText);
        container.appendChild(headlineElement);
		
		//Zutaten
		data.zutaten.forEach(function (ing, index) {
			var ingredientElement = document.createElement('li');        
			var ingredientElementText = document.createTextNode(data.zutaten[index]);
			ingredientElement.appendChild(ingredientElementText);
			container.appendChild(ingredientElement);	
		});

		var steps1 = [];
		data.steps1.forEach(function (ing, index) {
			var stepElementText = document.createTextNode(data.steps1[index]);
			kitchen.logik.steps1[index] = data.steps1[index];
		});
		var steps2 = [];
		data.steps2.forEach(function (ing, index) {
			var stepElementText = document.createTextNode(data.steps2[index]);
			kitchen.logik.steps2[index] = data.steps2[index];
		});
		var help = [];
		data.help.forEach(function (ing, index) {
			var stepElementText = document.createTextNode(data.help[index]);
			kitchen.logik.help[index] = data.help[index];
		});
			
	   
        // Beschreibung
        var descriptionElement = document.createElement('p');
        var descriptionText = document.createTextNode(data.description);
        descriptionElement.appendChild(descriptionText);
        descriptionElement.setAttribute('class', 'description');
        container.appendChild(descriptionElement);
		
		//Details
		var detailsElement = document.createElement('h3');        
        var detailsElementText = document.createTextNode('Details:');
        detailsElement.appendChild(detailsElementText);
        container.appendChild(detailsElement);
		
		//Kochzeit
		var timeElement = document.createElement('li');        
        var timeElementText = document.createTextNode(data.time);
        timeElement.appendChild(timeElementText);
        container.appendChild(timeElement);
		
		//Niveau
		var niveauElement = document.createElement('li');        
        var niveauElementText = document.createTextNode(data.niveau);
		niveauElement.appendChild(niveauElementText);
        container.appendChild(niveauElement);
		
		//Anzahl Personen
		var countElement = document.createElement('li');        
        var countElementText = document.createTextNode(data.count);
        countElement.appendChild(countElementText);
        container.appendChild(countElement);
    }
}