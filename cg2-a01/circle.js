/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * Author Jan Zimmermann
 *
 * Module: circle
 *
 * 
 *
 */


/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger"], 
       (function(Util,vec2,Scene,PointDragger) {
       
    "use strict";

    /**
     *  A circle that can be dragged 
     *  around by its center and its radius can be changed.
     *  Parameters:
     *  - center representing [x,y] coordinates of the point
     *  - radius the radius of the circle
     *  - lineStyle: object defining width, color and fill attributes for circle drawing, 
     *       begin of the form { width: 2, color: "#00FF00" }
     */ 

    var Circle = function(point0, radius, lineStyle) {
    	// default draw style
        this.lineStyle = lineStyle || { 
            width:2, 
            color: "#0000AA", 
            fill: false 
        };
        
        this.radius = radius || 50;

        console.log("creating center of the circle [" + 
                    point0[0] + "," + point0[1] + "]");

        // convert to Vec2 just in case the points were given as arrays
        this.p0 = point0 || [0,0];
        
    };

    // draw the circle into the provided 2D rendering context
    Circle.prototype.draw = function(context) {

        // what shape to draw
        context.beginPath();
        context.arc(this.p0[0], this.p0[1], // position
                    this.radius,    		// radius
                    0.0, Math.PI*2,           // start and end angle
                    true);                    // clockwise
        context.closePath();
        
        // draw style
        context.lineWidth   = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;
        context.fillStyle   = this.lineStyle.color;
        
        // trigger the actual drawing
        if(this.lineStyle.fill) {
            context.fill();
        };
        context.stroke();
        
    };

    // test whether the mouse position is on the circles outline
    Circle.prototype.isHit = function( context,mousePos	) {
    	
        // what is my current position?
        var pos = this.p0;
    
        // check whether distance between mouse and circles's center
        // is between max (radius +- 2) 
        var dx = mousePos[0] - pos[0];
        var dy = mousePos[1] - pos[1];
        // the minimum hitpoint
        var r1 = this.radius-2;
        // the maximum hitpoint
        var r2 = this.radius+2;
        // check if mousePos is between max and min
        return ( (dx*dx + dy*dy) >= (r1*r1) && (dx*dx + dy*dy) <= (r2*r2) );  
        
    };
    
    // return list of draggers to manipulate this line
    Circle.prototype.createDraggers = function() {
    	alert("D");
        var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
        var draggers = [];
        
        // create closure and callbacks for dragger
        var _circle = this;
        var getP0 = function() { return _circle.p0; };
        var setP0 = function(dragEvent) { _circle.p0 = dragEvent.position; };
        draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
        
        
        // dragger to manipulate radius
        //
        // get the new radius after dragging
        var getP_radius = function() { return vec2.add(_circle.p0, [ _circle.radius, 0 ]) ; };
        // set the new radius after dragging
        var setP_radius = function(dragEvent) { _circle.radius = dragEvent.position[0] - _circle.p0[0] };
        draggers.push( new PointDragger(getP_radius, setP_radius, draggerStyle) );
        
        return draggers;
        
    };
    
    // this module only exports the constructor for Circle objects
    return Circle;

})); // define

    
