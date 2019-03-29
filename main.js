//ALL control and Video elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled');
const ranges = player.querySelectorAll('.player-slider');
const skipButton = player.querySelectorAll('[data-skip]');
const toggle = player.querySelector('.toggle');

//Function For Elements
function togglePlay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
    toggleButton();
}

function toggleButton(){
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function alterRange(){
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function alterProgress() {
    const progress = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e){
    const seektime = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = seektime;
}

//Event listners

video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
skipButton.forEach(button => { button.addEventListener('click',skip);});
ranges.forEach(slider => {slider.addEventListener('change',alterRange);});
video.addEventListener('timeupdate',alterProgress);

let isMouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown',()=> isMouseDown=true);
progress.addEventListener('mouseup',()=> isMouseDown=false);
progress.addEventListener('mousemove',(e)=> isMouseDown && scrub(e));
