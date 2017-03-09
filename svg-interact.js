var svg = document.getElementById("vector");
var rid = 0;

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
    c.setAttribute("r", r);
    c.setAttribute("fill", "green");
    c.addEventListener("click", circleClick, true);
    return c;
}

var drawDot = function(e) {
    if(this==e.target){
	var dot = makeDot( e.offsetX, e.offsetY );
	svg.appendChild( dot );
    }
    console.log("SVG"+e.target);
}

var clear = function(e) {
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
};

var movedots = function(e){

    // do stuff

}

var clearBtn = document.getElementById("clear_btn");
clearBtn.addEventListener("click", clear);

var moveb = document.getElementById("move");
moveb.addEventListener("click", movedots);

svg.addEventListener("click", drawDot);//, true);
