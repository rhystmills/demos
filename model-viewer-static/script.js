const slider = document.getElementById("mv-slider")
const sliderSwitch = document.getElementById("mv-slider-switch")
const modelViewer = document.querySelector('#mv-model');
const playButton = document.getElementById("play")
const pauseButton = document.getElementById("pause")

sliderSwitch.props = {
    active: false,
    xPos: 0
}

controls = {
    override: false
}



// setTimeout(()=>{
// console.log(modelViewer.availableAnimations)
// console.log(modelViewer.currentTime)
// console.log(modelViewer.paused)
// console.log(modelViewer.attributes)
// }, 4000)


sliderSwitch.addEventListener("mousedown", (e) => {
    controls.override = false;
    sliderSwitch.props.active = true;
})
slider.addEventListener("mousedown", (e) => {
    controls.override = false;
    sliderSwitch.props.active = true;
})
pauseButton.addEventListener("mousedown", (e) => {
    if (modelViewer.pause) {
        controls.override = true;
        modelViewer.pause()
    }
})
playButton.addEventListener("mousedown", (e) => {
    console.log("hmm")
    sliderSwitch.props.active = false
    if (modelViewer.play){ 
        // console.log(modelViewer.currentTime)
        // controls.override = false;
        // sliderSwitch.props.active = true;
        modelViewer.play()
    }
})

window.addEventListener("mouseup", (e) => {
    if (!controls.override){
        sliderSwitch.props.active = false
        if (modelViewer.play) {
            modelViewer.play();
        }
    }
})

const mousePosition = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", (e) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
})

const duration = 5;

function tick(timestamp) {
    const relativeMousePosition = mousePosition.x - slider.getBoundingClientRect().left
    const currentTime = modelViewer.currentTime;
    const maxWidth = slider.getBoundingClientRect().width;

    if (sliderSwitch.props.active && modelViewer.pause) { 
        modelViewer.pause();
        let switchPosition = toValidSwitchPosition(relativeMousePosition - (sliderSwitch.getBoundingClientRect().width / 2))
        modelViewer.currentTime = switchPosition/maxWidth * duration
        sliderSwitch.style.backgroundColor = "#555";
        sliderSwitch.style.transform = 'translateX(' + switchPosition + 'px)';
        
    } else { 

        let switchPosition = toValidSwitchPosition(maxWidth / duration * currentTime)
        sliderSwitch.style.backgroundColor = "#000"
        sliderSwitch.style.transform = 'translateX(' + switchPosition + 'px)';
    }
    
    // `Math.min()` is used here to make sure that the element stops at exactly 200px.
    
    window.requestAnimationFrame(tick);
}

function toValidSwitchPosition(switchPosition){
    const minBound = 0
    const maxBound = slider.getBoundingClientRect().width - sliderSwitch.getBoundingClientRect().width
    if(switchPosition < minBound) return minBound
    if(switchPosition > maxBound) return maxBound
    return switchPosition
}

window.requestAnimationFrame(tick);