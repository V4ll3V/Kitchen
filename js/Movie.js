function Movie(view){
	//Video 1 - wasser in den topf
	this.video1 = document.createElement('video');
	this.video1.setAttribute('src', 'videos/1.ogv');
	this.video1.setAttribute('type', 'video/ogg');
	this.video1.controls = false;
	document.body.appendChild(this.video1);
	this.video1.setAttribute('id','videobox');
	this.video1.style.display = 'none';
	
	//Video 2 - herd anstellen
	this.video2 = document.createElement('video');
	this.video2.setAttribute('src', 'videos/2.ogv');
	this.video2.setAttribute('type', 'video/ogg');
	this.video2.controls = false;
	document.body.appendChild(this.video2);
	this.video2.setAttribute('id','videobox');
	this.video2.style.display = 'none';
	
	//Video 3 - wasser salzen
	this.video3 = document.createElement('video');
	this.video3.setAttribute('src', 'videos/3.ogv');
	this.video3.setAttribute('type', 'video/ogg');
	this.video3.controls = false;
	document.body.appendChild(this.video3);
	this.video3.setAttribute('id','videobox');
	this.video3.style.display = 'none';
	
	
	//Video 4 - spaghetti rein
	this.video4 = document.createElement('video');
	this.video4.setAttribute('src', 'videos/4.ogv');
	this.video4.setAttribute('type', 'video/ogg');
	this.video4.controls = false;
	document.body.appendChild(this.video4);
	this.video4.setAttribute('id','videobox');
	this.video4.style.display = 'none';
	
	//Video 5 sauce 1
	this.video5 = document.createElement('video');
	this.video5.setAttribute('src', 'videos/5.ogv');
	this.video5.setAttribute('type', 'video/ogg');
	this.video5.controls = false;
	document.body.appendChild(this.video5);
	this.video5.setAttribute('id','videobox');
	this.video5.style.display = 'none';
	
	//Video 6 - sauce 2
	this.video6 = document.createElement('video');
	this.video6.setAttribute('src', 'videos/6.ogv');
	this.video6.setAttribute('type', 'video/ogg');
	this.video6.controls = false;
	document.body.appendChild(this.video6);
	this.video6.setAttribute('id','videobox');
	this.video6.style.display = 'none';
	
	//Video 7 - sauce 3
	this.video7 = document.createElement('video');
	this.video7.setAttribute('src', 'videos/7.ogv');
	this.video7.setAttribute('type', 'video/ogg');
	this.video7.controls = false;
	document.body.appendChild(this.video7);
	this.video7.setAttribute('id','videobox');
	this.video7.style.display = 'none';
	
	//Video 8  - sauce 4
	this.video8 = document.createElement('video');
	this.video8.setAttribute('src', 'videos/8.ogv');
	this.video8.setAttribute('type', 'video/ogg');
	this.video8.controls = false;
	document.body.appendChild(this.video8);
	this.video8.setAttribute('id','videobox');
	this.video8.style.display = 'none';
	
	//Video - fertig
	this.video9 = document.createElement('video');
	this.video9.setAttribute('src', 'videos/9.ogv');
	this.video9.setAttribute('type', 'video/ogg');
	this.video9.controls = false;
	document.body.appendChild(this.video9);
	this.video9.setAttribute('id','videobox');
	this.video9.style.display = 'none';
}

//Play Methode für das Video im Spaghetti Napoli gericht.
//Beim Methodenaufruf wird die Nr des benötigten Videos mit übergeben und dieses wird dann abgespielt. 
Movie.prototype.play = function(nr){
	if(nr === 0){
		this.video9.style.display ='none';
		this.video1.currentTime = 0;
		this.video1.play();
		this.video1.style.display = '';	
	}
	if(nr === 1){
		this.video2.play();
		this.video2.style.display = '';
		this.video1.pause();
		this.video1.style.display = 'none';		
	}
	if(nr === 2){
		this.video1.currentTime = 5;
		this.video3.play();
		this.video3.style.display = '';	
		this.video2.pause();
		this.video2.style.display = 'none';
	}
	if(nr === 3){
		this.video4.play();
		this.video4.style.display = '';	
		this.video3.pause();
		this.video3.style.display = 'none';
	}
	if(nr === 4){
		this.video5.play();
		this.video5.style.display = '';
		this.video4.pause();
		this.video4.style.display = 'none';		
	}
	if(nr === 5){
		this.video6.play();
		this.video6.style.display = '';	
		this.video5.pause();
		this.video5.style.display = 'none';
	}
	if(nr === 6){
		this.video7.play();
		this.video7.style.display = '';	
		this.video6.pause();
		this.video6.style.display = 'none';
	}
	if(nr === 7){
		this.video8.play();
		this.video8.style.display = '';	
		this.video7.pause();
		this.video7.style.display = 'none';
	}
	if(nr === 8){
		this.video9.play();
		this.video9.style.display = '';	
		this.video8.pause();
		this.video8.style.display = 'none';
	}
}