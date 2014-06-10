function Books(view, draggable){
	this.view = view;
	this.OPEN  = 1;
	this.CLOSE	= 0;
	this.actState = this.CLOSE;
	this.view.setDraggable(draggable);	
}




	