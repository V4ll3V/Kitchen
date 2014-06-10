VisualRenderObjectExtend.prototype = new VisualRenderObject();

function VisualRenderObjectExtend(context, sx, sy, w, h, imgPath, zOrder){
	VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder );
	this.startW = w;
	this.startH = h;
};


/**
 * Set the position (Y) of this object. 
 */
VisualRenderObject.prototype.setPositionY = function(count){
	this.y = count;
};

VisualRenderObject.prototype.addPositionX = function(count){
	this.x -= count;
};
VisualRenderObject.prototype.addPositionY = function(count){
	this.y -= count;
};


/**
 * Set the position (X) of this object. 
 */
VisualRenderObject.prototype.setPositionX = function(count){
	this.x = count;
};
/**
 * Set the width (-) of this object. 
 */
VisualRenderObject.prototype.setWidth = function(w){
	this.width -= w;
	this.x += (w - (w/5));	
};

/**
 * Set the width(+) of this object. 
 */
VisualRenderObject.prototype.setWidthP = function(w){
	this.width += w;
	this.x -= (w - (w/5));	
};


/**
 * Set the height (-) of this object. 
 */
VisualRenderObject.prototype.setHeight = function(h){
	this.height -= h;
	this.y += (h - (h/5));	
};

/**
 * Set the height(+) of this object. 
 */
VisualRenderObject.prototype.setHeightP = function(h){
	this.height += h;
	this.y -= (h - (h/5));	
};
/**
 * Reset width to start width
 */
VisualRenderObject.prototype.resetWidth = function(){
	return this.startW;
};
