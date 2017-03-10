var svg = document.getElementById("vector");
var rid = 0;

var move = false;

var addRandom = function(e) {
    r = 20;
    x = Math.random()*500;
    y = Math.random()*500;
    var dot = makeDot(x, y);
    svg.appendChild(dot);
}

var circleClick = function(e) {
    console.log("CIRCLE"+e.target); // displays original element
    if(this.getAttribute("fill")=="green"){
	this.setAttribute("fill","blue");
    }else{
	svg.removeChild(this);
	//add random thingy
	addRandom();
    }
    e.stopPropagation(); // stop capturing/bubbling
}

var makeDot = function(x, y) {    
    var r = 20;   
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("vx", 1);
    c.setAttribute("vy", 1);
    c.setAttribute("r", r);
    c.setAttribute("fill", "green");
    c.addEventListener("click", circleClick, true);
    return c;
};

var drawDot = function(e) {
    if(this==e.target){
	var dot = makeDot( e.offsetX, e.offsetY );
	svg.appendChild( dot );
    }
    console.log("SVG"+e.target);
};

var clear = function(e) {
    window.cancelAnimationFrame( rid );
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
    move = false;
};

var movedots = function(e){
    
    // do stuff
    move = !move;
    
};

var bounce = function(e) {
    
    window.cancelAnimationFrame( rid );

	for (i = 0; i < svg.childNodes.length; i++) {
	    var circle = svg.childNodes[i];

	    if (parseInt(circle.getAttribute("cx"))+20 >= 500) {
		circle.setAttribute("vx",-1);
	    }
	    if (parseInt(circle.getAttribute("cy"))+20 >= 500) {
		circle.setAttribute("vy",-1);
	    }
	    if (parseInt(circle.getAttribute("cx"))-20 <= 0) {
		circle.setAttribute("vx",1);
	    }
	    if (parseInt(circle.getAttribute("cy"))-20 <= 0) {
		circle.setAttribute("vy",1);
	    }	    
	    
	    svg.childNodes[i].setAttribute("cx", parseFloat(circle.getAttribute("cx")) + parseInt(circle.getAttribute("vx")));
	    svg.childNodes[i].setAttribute("cy", parseFloat(circle.getAttribute("cy")) + parseInt(circle.getAttribute("vy")));
	}


    
    rid = window.requestAnimationFrame(bounce);
};

var clearBtn = document.getElementById("clear_btn");
clearBtn.addEventListener("click", clear);

var moveb = document.getElementById("move");
moveb.addEventListener("click", bounce);

svg.addEventListener("click", drawDot);//, true);

