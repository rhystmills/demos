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

const currentColour = document.getElementById("currentColour");

const slider = document.getElementById("slider");
const sliderBox = slider.getBoundingClientRect();

const channel = document.getElementById("channel");
const channelTop = channel.getBoundingClientRect().top;

const pickerBox = pickerCanvas.getBoundingClientRect();

const pointer = document.getElementById("pointer");
let pointerBox = pointer.getBoundingClientRect();

let sliderActive = false;
let pickerActive = false;

slider.addEventListener('mousedown',() => {
    sliderActive = true; 
})

channel.addEventListener('mousedown',() => {
    sliderActive = true; 
})

window.addEventListener('mouseup',() => {
    sliderActive = false; 
    pickerActive = false;
})

pickerCanvas.addEventListener('mousedown',() => {
    pickerActive = true; 
    
})

pointer.addEventListener('mousedown',() => {
    pickerActive = true;  
})

function pickerPosition(pos, boundary, modifier){
    if (pos >= (0 - modifier) && pos < (boundary - modifier))return pos
    else if (pos < 0 - modifier) return 0 - modifier;
    else return boundary - modifier
}

function valRange(val, max, min){
   if (val > max) return max
   if (val < min) return min
   return val
}

function findDocumentCoords(mouseEvent){
    let yPosSlider;
    let xPosPicker;
    let yPosPicker;
    

    if (mouseEvent){
        xpos = mouseEvent.pageX;
        yPosSlider = mouseEvent.pageY - channelTop - sliderBox.height/2;
        xPosPicker = mouseEvent.pageX - pickerBox.left - pointerBox.width/2;
        yPosPicker = mouseEvent.pageY - pickerBox.top - pointerBox.height/2;
    } else {
        //IE
        xpos = window.event.x + document.body.scrollLeft - 2;
        yPosSlider = window.event.y + document.body.scrollTop - sliderBox;
    }

    if (sliderActive){
        let pixel = pickerCtx.getImageData(
            valRange(pointerBox.left - pickerBox.left + pointerBox.width/2, pickerBox.width-1, 0), 
            valRange(pointerBox.top - pickerBox.left + pointerBox.height/2, pickerBox.height-1, 0), 
            1, 
            1
        );
        let [pixR, pixG, pixB, pixA] = pixel.data;
        currentColour.setAttribute("style",`background-color: rgb(${pixR},${pixG},${pixB})`)
        if (yPosSlider > -7) { 
            let y = yPosSlider + 6;
            let r = Math.floor(red(y*6/256)*255)
            let g = Math.floor(green(y*6/256)*255)
            let b = Math.floor(blue(y*6/256)*255)
            let hexColor = '#' + hexTwoDigits(r) + hexTwoDigits(g) + hexTwoDigits(b)
            if (yPosSlider <= 266){
                slider.setAttribute("style",`top: ${yPosSlider-1}px;`);
                slider.setAttribute("fill",`${hexColor}`);
                changeZAndDraw((yPosSlider/256 * 6))
            }

            if (yPosSlider > 267 - slider.getBoundingClientRect().height) {
                slider.setAttribute("style",`top: ${266-15-2}px;`);
                slider.setAttribute("fill",`#ff0000`);
                changeZAndDraw((256/256 * 6))
            }
            
        }
        if (yPosSlider <= -7) {
            slider.setAttribute("style",`top: ${-7}px;`);
            slider.setAttribute("fill",`#ff0000`);
            changeZAndDraw((256/256 * 6))
        }
    }

    if (pickerActive){
        //TODO: Colour based on pointer position, not mouse position
        pointerBox = pointer.getBoundingClientRect();
        pointerY = pickerPosition(yPosPicker, pickerBox.height, (pointerBox.height/2));
        pointerX = pickerPosition(xPosPicker, pickerBox.width, (pointerBox.width/2));
        pointer.setAttribute("style", `top: ${pointerY}px; left: ${pointerX}px`)
        let pixel = pickerCtx.getImageData(
            valRange(pointerBox.left - pickerBox.left + pointerBox.width/2, pickerBox.width-1, 0), 
            valRange(pointerBox.top - pickerBox.left + pointerBox.height/2, pickerBox.height-1, 0), 
            1, 
            1
        );
        let [pixR, pixG, pixB, pixA] = pixel.data;
        currentColour.setAttribute("style",`background-color: rgb(${pixR},${pixG},${pixB})`)
    }
}

window.onmousemove = findDocumentCoords;