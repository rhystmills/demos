// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// for (let x = 0; x < 256; x++){
//     for (let y = 0; y < 256; y++){
//         let hexColor = '#' + Number(x).toString(16).padStart(2, '0') + Number(y).toString(16).padStart(2, '0') + '00'
//         ctx.fillStyle = hexColor;
//         ctx.fillRect(x, y, 1, 1);
//     }
// }

const pickerCanvas = document.getElementById('pickerCanvas');
const pickerCtx = pickerCanvas.getContext('2d');

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

    let newImage = pickerCtx.createImageData(256, 256);
    var pixels = newImage.data;
    for (let x = 0; x < 256; x++){
        
        for (let y = 0; y < 256; y++){
            let r = Math.floor((red(z) * y) + ((1 - red(z)) * grey(x,y)));
            let g = Math.floor((green(z) * y) + ((1 - green(z)) * grey(x,y)));
            let b = Math.floor((blue(z) * y) + ((1 - blue(z)) * grey(x,y)));
            var off = (y * newImage.width + x) * 4;
            pixels[off] = r;
            pixels[off + 1] = g;
            pixels[off + 2] = b;
            pixels[off + 3] = 255;
        }
    }

    pickerCtx.putImageData(newImage, 0, 0);
    // for (let x = 0; x < 256; x++){
    //     for (let y = 0; y < 256; y++){
    //         let r = Math.floor((red(z) * y) + ((1 - red(z)) * grey(x,y)));
    //         let g = Math.floor((green(z) * y) + ((1 - green(z)) * grey(x,y)));
    //         let b = Math.floor((blue(z) * y) + ((1 - blue(z)) * grey(x,y)));
    //         // if (x==0 && y == 0) console.log(r, g, b);
    //         let hexColor = '#' + hexTwoDigits(r) + hexTwoDigits(g) + hexTwoDigits(b)
    //         pickerCtx.fillStyle = hexColor;
    //         pickerCtx.fillRect(x, y, 1, 1);
    //     }
    // }
    //do critical time stuff
}

function changeZAndDraw(input){
    z = input;
    drawCanvas();
}

drawCanvas();


const rainbowBar = document.getElementById("rainbowBar")
const rainbowCtx = rainbowBar.getContext('2d');

function drawRainbowCanvas(){
    for (let y = 0; y < 256; y++){
        let r = Math.floor(red(y*6/256)*255)
        let g = Math.floor(green(y*6/256)*255)
        let b = Math.floor(blue(y*6/256)*255)
        let hexColor = '#' + hexTwoDigits(r) + hexTwoDigits(g) + hexTwoDigits(b)
        rainbowCtx.fillStyle = hexColor;
        rainbowCtx.fillRect(0, y, 15, 1);
    }
}

drawRainbowCanvas();

function getRainbowHue(num){}

let slider = document.getElementById("slider");
let viewportOffset = slider.getBoundingClientRect();

let channel = document.getElementById("channel");
let sliderOrigin = channel.getBoundingClientRect().top;

let sliderActive = false;
slider.addEventListener('mousedown',() => {
    sliderActive = true; 
    // console.log(sliderActive); 
    viewportOffset = slider.getBoundingClientRect(); 
    sliderOrigin = channel.getBoundingClientRect().top;
})
// slider.addEventListener('mouseup',() => {sliderActive = false; console.log(sliderActive)})
window.addEventListener('mouseup',() => {
    viewportOffset = slider.getBoundingClientRect(); 
    sliderOrigin = channel.getBoundingClientRect().top;
    sliderActive = false; 
    // console.log(sliderActive)
})

function findDocumentCoords(mouseEvent){
    let yPos;

    if (mouseEvent){
        xpos = mouseEvent.pageX;
        yPos = mouseEvent.pageY - sliderOrigin - 4;
    } else {
        //IE
        xpos = window.event.x + document.body.scrollLeft - 2;
        yPos = window.event.y + document.body.scrollTop - viewportOffset;
    }

    if (sliderActive){
        if (yPos > 0) { 
            let y = yPos;
            let r = Math.floor(red(y*6/256)*255)
            let g = Math.floor(green(y*6/256)*255)
            let b = Math.floor(blue(y*6/256)*255)
            let hexColor = '#' + hexTwoDigits(r) + hexTwoDigits(g) + hexTwoDigits(b)
            slider.setAttribute("style",`top: ${yPos}px;`);
            slider.setAttribute("fill",`${hexColor}`);
            changeZAndDraw((yPos/256 * 6))

            if (yPos > 256 - slider.getBoundingClientRect().height) {
                slider.setAttribute("style",`top: ${256-15}px;`);
                slider.setAttribute("fill",`#ff0000`);
            }
        }
        if (yPos < 0) {
            slider.setAttribute("style",`top: ${0}px;`)
            slider.setAttribute("fill",`#ff0000`);
        }
    }
}

window.onmousemove = findDocumentCoords;