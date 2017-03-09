var svg = document.getElementById("vector");
var rid = 0;

var circleClick = function(e) {
    console.log("CIRCLE"+e.target); // displays original element
    this.setAttribute("fill","blue");
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

var clearBtn = document.getElementById("clear_btn");
clearBtn.addEventListener("click", clear);

svg.addEventListener("click", drawDot);//, true);
