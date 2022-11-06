let flength = 300;
let renderCanvas = document.getElementsByClassName("logorender");
let frames = 0;
let deg = 0;

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

function projectvertex (vertex, canvas) {
    let x = vertex[0];
    let y = vertex[1];
    let z = vertex[2];

    let xProjected = (flength * x) / (z + flength) * (canvas.clientWidth / 500);
    let yProjected = (flength * y) / (z + flength) * (canvas.clientHeight / 500);

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

function drawLine(x1, y1, x2, y2, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

// Gender time
setInterval(() => {
    for (let i = 0; i < renderCanvas.length; i++) {
        let canvas = renderCanvas[i];
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff"
        ctx.clearRect(0,0,500,500)
        projectedWF = [];
        wireframe.forEach(element => {
            let vertex = projectvertex(rotatevertex(element, frames/100, 2), canvas);
            vertex[1] -= canvas.clientHeight/10
            projectedWF.push(vertex);
            ctx.fillRect(vertex[0]-1, vertex[1]-1, 3, 2);
        });
        lines.forEach(line => {

            let vertex1 = projectedWF[line[0]]
            let vertex2 = projectedWF[line[1]]
            drawLine(vertex1[0], vertex1[1], vertex2[0], vertex2[1], ctx);
        });
        fontsize = canvas.width/10 + Math.sin(frames/50)*(canvas.width/100) - canvas.width/50;
        ctx.font = fontsize+"px Consolas";
        let textwidth = ctx.measureText("[ Averieyy ]");
        ctx.fillText("[ Averieyy ]", canvas.clientWidth/2-(textwidth.width)/2, canvas.clientHeight*3/4, 500);
        frames+=1;
    };
    
}, 1000/60);