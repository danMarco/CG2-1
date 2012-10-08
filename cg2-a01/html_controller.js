/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */

 
/* requireJS module definition */
define(["jquery", "straight_line", "circle"], 
       (function($, StraightLine, Circle) {

    "use strict"; 
                
    /*
     * define callback functions to react to changes in the HTML page
     * and provide them with a closure defining context and scene
     */
    var HtmlController = function(context,scene,sceneController) {
    
    
        // generate random X coordinate within the canvas
        var randomX = function() { 
            return Math.floor(Math.random()*(context.canvas.width-10))+5; 
        };
            
        // generate random Y coordinate within the canvas
        var randomY = function() { 
            return Math.floor(Math.random()*(context.canvas.height-10))+5; 
        };
        
        // shows the info of the currently selected object
        var showInfo = function() { 
        	alert("JAN");
        };
            
        // generate random color in hex notation
        var randomColor = function() {

            // convert a byte (0...255) to a 2-digit hex string
            var toHex2 = function(byte) {
                var s = byte.toString(16); // convert to hex string
                if(s.length == 1) s = "0"+s; // pad with leading 0
                return s;
            };
                
            var r = Math.floor(Math.random()*25.9)*10;
            var g = Math.floor(Math.random()*25.9)*10;
            var b = Math.floor(Math.random()*25.9)*10;
                
            // convert to hex notation
            return "#"+toHex2(r)+toHex2(g)+toHex2(b);
        };
        
        /*
         * event handler for "new line button".
         */
        $("#btnNewLine").click( (function() {
        
            // create the actual line and add it to the scene
            var style = { 
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };
                          
            var line = new StraightLine( [randomX(),randomY()], 
                                         [randomX(),randomY()], 
                                         style );
            scene.addObjects([line]);

            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(line); // this will also redraw
                        
        }));
        
        /*
         * event handler for "new circle button".
         */
         $("#btnNewCircle").click( (function() {
        
            // create the actual line and add it to the scene
            var style = { 
                width: Math.floor(Math.random()*3)+1,
                color: randomColor(),
                fill: false
            };
                          
            var circle = new Circle( [randomX(),randomY()], 40, style );
            scene.addObjects([circle]);

            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(circle); // this will also redraw
                        
        }));       
        
        /*
         * event handler for <input> "#infoLine".
         */
         $("#infoLine").change( (function() {
            // find the selected Object
            var selectedObject = sceneController.getSelectedObject();
            // change the line width according to the new width given in the <input>
            var lineWidth = $("#infoLine").val();
            selectedObject.lineStyle.width = lineWidth;
        
        	// redraw
        	sceneController.scene.draw(sceneController.context);
        }));
        
        /*
         * event handler for <input> "#infoColor".
         */
         $("#infoColor").change( (function() {
            // find the selected Object
            var selectedObject = sceneController.getSelectedObject();
            // change the color according to the selected in the <input>
            var color = $("#infoColor").val();
            selectedObject.lineStyle.color = color;
        
        	// redraw
        	sceneController.scene.draw(sceneController.context);
        }));   
        
        /*
         * event handler for <input> "#infoRadius".
         */
         $("#infoRadius").change( (function() {
            // find the selected Object
            var selectedObject = sceneController.getSelectedObject();
            
            // change the color according to the selected in the <input>
	        var radius = $("#infoRadius").val();
    	    selectedObject.radius = radius;
        
        	// redraw
        	sceneController.scene.draw(sceneController.context);

        }));      
    
    };

    // return the constructor function 
    return HtmlController;


})); // require 



            
