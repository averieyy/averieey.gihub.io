let flength = 300;
let canvas = document.getElementById("mainCanv");
let ctx = canvas.getContext("2d");
let frames = 0;
let deg = 0;
ctx.fillStyle = "#ffffff";

let fontsize = 30;

let wireframe = [
    [63,63,63],
    [63,-63,63],
    [-63,-63,63],
    [-63,-63,-63],
    [-63,63,63],
    [63,63,-63],
    [63,-63,-63],
    [-63,63,-63],
]

let projectedWF = []

let lines = [
    [0,1],
    [1,2],
    [2,3],
    [0,4],
    [0,5],
    [1,6],
    [5,7],
    [6,5],
    [3,6],
    [3,7],
    [4,2],
    [4,7]
]

let renderedVertexes = [];

function projectvertex (vertex) {
    let x = vertex[0];
    let y = vertex[1];
    let z = vertex[2];

    let xProjected = Math.floor((flength * x) / (z + flength));
    let yProjected = Math.floor((flength * y) / (z + flength));

    return [xProjected+canvas.clientWidth/2, yProjected+canvas.clientHeight/2];
}

function rotatevertex(vertex, degrees, axis) {
    // let g = (Math.sin(degrees)+Math.cos(degrees)-Math.sin(degrees));
    // X-axis
    if (axis == 0) {
        
        return[
            vertex[0], 
            (Math.cos(degrees) * vertex[1] - Math.sin(degrees) * vertex[2]), 
            (Math.sin(degrees) * vertex[1] + Math.cos(degrees) * vertex[2])
        ];
    }
    // Y-axis
    if (axis == 1) {
        
        return[
            (Math.cos(degrees) * vertex[0] - Math.sin(degrees) * vertex[1]),
            (Math.sin(degrees)*vertex[0]+Math.cos(degrees)*vertex[1]),
            vertex[2]
        ];
    }
    // Z-axis
    if (axis == 2) {
        
        return[
            -(Math.cos(degrees)*vertex[0]+Math.sin(degrees)*vertex[2]), 
            vertex[1],
            (-Math.sin(degrees)*vertex[0]+Math.cos(degrees)*vertex[2])
        ];
    }
    
    return (vertex)
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

// Gender time
setInterval(() => {
    ctx.clearRect(0,0,500,500)
    projectedWF = [];
    wireframe.forEach(element => {
        let vertex = projectvertex(rotatevertex(element, frames/100, 2));
        vertex[1] -= 50
        projectedWF.push(vertex);
        ctx.fillRect(vertex[0]-1, vertex[1]-1, 3, 2);
    });
    lines.forEach(line => {

        let vertex1 = projectedWF[line[0]]
        let vertex2 = projectedWF[line[1]]
        drawLine(vertex1[0], vertex1[1], vertex2[0], vertex2[1]);
    });
    fontsize = 50 + Math.sin(frames/50)*5 - 10;
    ctx.font = fontsize+"px Consolas";
    let textwidth = ctx.measureText("[ Averieyy ]");
    ctx.fillText("[ Averieyy ]", 250-(textwidth.width)/2, 325, 500);
    frames+=1;
}, 1000/60);