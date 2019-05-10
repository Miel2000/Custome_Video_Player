/* chope nos elements */
var context = new AudioContext();

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* functions */

function togglePlay() {
  //  const method = video.paused ? 'play' : 'pause'
  //  video[method]();
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}


function handleRangeUpdate() {
    video[this.name] = this.value;
  //  console.log(this.name);
  //  console.log(this.value);
}


function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}


function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(scrubTime);
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;

}




let pleaseStop = false

function poppup(){

    if (!pleaseStop) {

        let cTime = video.currentTime;
        
        if(cTime <= 5 && !pleaseStop ){
            console.log(cTime + ' bientot ... ');
        } else {
            console.log('BOOM UNE PUB');
            pleaseStop = true;
        }
        
    }
}
/*
function poppup(){
    let cTime = video.currentTime;
    
        if(cTime <= 5 && !pleaseStop){
            console.log(cTime + ' bientot ... ');
        } else {
            console.log('BOOM');
            pleaseStop = true;
        }
}
*/

/* hook les event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));



let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemouve', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


video.addEventListener('timeupdate', poppup);