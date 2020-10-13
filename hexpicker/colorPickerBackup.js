const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

for (let x = 0; x < 256; x++){
    for (let y = 0; y < 256; y++){
        let hexColor = '#' + Number(x).toString(16).padStart(2, '0') + Number(y).toString(16).padStart(2, '0') + '00'
        ctx.fillStyle = hexColor;
        ctx.fillRect(x, y, 1, 1);
    }
}

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

//Sliding scale:
// r = 0 - 1, 2 - 3 
// g = 0 - 2
// b = 1 - 3
let z = 0;

function red(z){
    if (z < 1 || z > 5) return 1;
    if (z > 2 && z < 4) return 0;
    if (z >= 4) return z - 4;
    if (z <= 2) return 2 - z;
}

function green(z){
    if (z >= 1 && z < 3) return 1;
    if (z > 4) return 0;
    if (z < 1) return z;
    if (z >= 3) return 4 - z;
}

function blue(z){
    if (z > 3 && z <= 5) return 1;
    if (z < 2) return 0;
    if (z <= 3) return z - 2;
    if (z >= 5) return 6 - z;
}

const grey = (x,y) => Math.floor(x * y / 255) 

const hexTwoDigits = (num) => Number(num).toString(16).padStart(2, '0')

function drawCanvas(){
    for (let x = 0; x < 256; x++){
        for (let y = 0; y < 256; y++){
            let r = Math.floor((red(z) * y) + ((1 - red(z)) * grey(x,y)));
            let g = Math.floor((green(z) * y) + ((1 - green(z)) * grey(x,y)));
            let b = Math.floor((blue(z) * y) + ((1 - blue(z)) * grey(x,y)));
            if (x==0 && y == 0) console.log(r, g, b);
            let hexColor = '#' + hexTwoDigits(r) + hexTwoDigits(g) + hexTwoDigits(b)
            ctx2.fillStyle = hexColor;
            ctx2.fillRect(x, y, 1, 1);
        }
    }
}

function changeZAndDraw(input){
    z = input;
    drawCanvas();
}

drawCanvas();