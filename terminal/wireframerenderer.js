let fov = 200;
let canvas = document.getElementById("mainCanv");
let ctx = canvas.getContext("2d");
let frames = 0;
let deg = 0;
ctx.fillStyle = "#ffffff"

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

let renderedVertexes = [];

function projectvertex (vertex) {
    let x = vertex[0];
    let y = vertex[1];
    let z = vertex[2];

    let xProjected = Math.floor((fov * x) / (z + fov));
    let yProjected = Math.floor((fov * y) / (z + fov));

    return [xProjected, yProjected];
}

function rotatevertex(vertex, degrees, axis) {
    let g = (Math.sin(degrees)+Math.cos(degrees) + Math.cos(degrees)+(-Math.sin(degrees)));
    // X-axis
    if (axis == 0) {
        
        return[vertex[0], vertex[1]*g, vertex[2]*g];
    }
    // Y-axis
    if (axis == 1) {
        
        return[vertex[0]*g, vertex[1], vertex[2]*g];
    }
    // Z-axis
    if (axis == 2) {
        
        return[vertex[0]*(Math.sin(degrees)+Math.cos(degrees)), vertex[1]*(Math.cos(degrees)+(-Math.sin(degrees))), vertex[2]];
    }
    
    return (vertex)
}

// Gender time
setInterval(() => {
    ctx.clearRect(0,0,500,500)
    wireframe.forEach(element => {
        // let vertex = projectvertex(rotatevertex(element, frames, 0));
        let vertex = projectvertex(element);
        renderedVertexes.push(vertex);
        ctx.fillRect(vertex[0]+250, vertex[1]+250, 2, 2);
    });
    console.log("render");
    frames++;
}, 1000/60);