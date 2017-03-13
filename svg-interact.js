var svg = document.getElementById("vector");
var rid = 0;

var move = false;

var addRandom = function(e) {
    x = Math.random()*500;
    y = Math.random()*500;
    var dot = makeDot(x, y, 20, 1, 1);
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
};

var makeDot = function(x, y, r, vx, vy) {    
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("vx", vx);
    c.setAttribute("vy", vy);
    c.setAttribute("r", r);
    c.setAttribute("fill", "green");
    c.addEventListener("click", circleClick, true);
    return c;
};

var drawDot = function(e) {
    if(this==e.target){
	var dot = makeDot( e.offsetX, e.offsetY, 20, 1, 1 );
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

	    var x = parseInt(circle.getAttribute("cx"));
	    var y = parseInt(circle.getAttribute("cy"));
	    var vx = parseInt(circle.getAttribute("vx"));
	    var vy = parseInt(circle.getAttribute("vy"));
	    var r = parseFloat(circle.getAttribute("r"));
	    

	    if (x+r >= 500) {
		svg.childNodes[i].setAttribute("vx",-1);
	    }
	    if (y+r >= 500) {
		svg.childNodes[i].setAttribute("vy",-1);
	    }
	    if (x-r <= 0) {
		svg.childNodes[i].setAttribute("vx",1);
	    }
	    if (y-r <= 0) {
		svg.childNodes[i].setAttribute("vy",1);
	    }
	    
	    svg.childNodes[i].setAttribute("cx", x + vx);
	    svg.childNodes[i].setAttribute("cy", y + vy);

	    if (x == 250) {
		split(svg.childNodes[i]);
	    } 	    	    
	}


    
    rid = window.requestAnimationFrame(bounce);
};

var split = function (circle) {

    var x = parseInt(circle.getAttribute("cx"));
    var y = parseInt(circle.getAttribute("cy"));
    var vx = parseInt(circle.getAttribute("vx"));
    var vy = parseInt(circle.getAttribute("vy"));
    var r = parseFloat(circle.getAttribute("r"));
    
    if (r < 1) {
	circle.remove();
    }
    else {
	console.log(r/2);
	var dot = makeDot(x,y,r/2,-vx,-vy);
	svg.appendChild(dot);
	console.log(r/2);
	circle.setAttribute("r",r/2);
    }
};

var clearBtn = document.getElementById("clear_btn");
clearBtn.addEventListener("click", clear);

var moveb = document.getElementById("move");
moveb.addEventListener("click", bounce);

svg.addEventListener("click", drawDot);//, true);

