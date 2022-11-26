console.log("%cYou're not supposed to see this", 'margin: 0; color: white; background: black; font-size: 50px; text-align: center; padding-top: calc(100% * 100%);');

const main = document.getElementById('main');
const menu = document.getElementById('menu');
const audio = document.getElementById('audio');
const start = document.getElementById("Play");
const player = document.getElementById("player")
const audioSelect = document.getElementById("audioSelect");
const progressRange = document.getElementById("progress-range");
const progressbar = document.getElementById("progress-bar");
const progressValue = document.getElementById("progressValue");
const volume = document.getElementById("volume");
const volumeImg = document.getElementById("volume-img");
const volumeRange = document.getElementById("volume-range");
const volumeValue = document.getElementById("volume-value");
const volumeProgress = document.getElementById("progress-volume");
const loop = document.getElementById("loop");
const loopImg = document.getElementById("loop-img");

let sec = 0
let min = 0

let theme = "white";

let isPlaying = false;
let isLoop = false;

if (sessionStorage.getItem("audioPlayed") === null || sessionStorage.getItem("audioPlayed") === 'undefined') {
    sessionStorage.setItem("progress", 0);
    if (sessionStorage.getItem("progress") === null || sessionStorage.getItem("progress") === 'undefined') {
        sessionStorage.setItem("progress", 0);
    } else {
        progressRange.value = sessionStorage.getItem("progress");
        progressValue.innerHTML = parseInt(sessionStorage.getItem("progress")) + "s";
        progressbar.value = sessionStorage.getItem("progress");
        audio.currentTime = sessionStorage.getItem("progress");
    }
} else {
    audio.setAttribute("src", sessionStorage.getItem("audioPlayed"));
    player.style.display = "flex";
    progressbar.max = sessionStorage.getItem("audioDuration");
    progressValue.max = sessionStorage.getItem("audioDuration");
}

if (localStorage.getItem("volume") === null || localStorage.getItem("volume") === 'undefined') {
    localStorage.setItem("volume", 1);
} else {
    volumeRange.value = localStorage.getItem("volume") * 100;
    audio.volume = localStorage.getItem("volume");
    volumeValue.innerHTML = parseInt(localStorage.getItem("volume") * 100) + "%";
}

if (localStorage.getItem("loop") === null || localStorage.getItem("loop") === 'undefined') {
    localStorage.setItem("loop", false);
    audio.loop = false;
    loopImg.setAttribute("src", "../img/loopOff.png");
} else {
    if (localStorage.getItem("loop") === "true") {
        audio.loop = true;
        loopImg.setAttribute("src", "../img/loopOn.png");
    } else {
        audio.loop = false;
        loopImg.setAttribute("src", "../img/loopOff.png");
    }
}

audioSelect.onchange = function() {
    let fileReader = new FileReader();
        fileReader.onloadend = function(event) {
            audio.setAttribute("src", event.target.result);
            player.style.display = "flex";
            start.innerHTML = "Play";
            isPlaying = false;
        };
    fileReader.readAsDataURL(document.getElementById("audioSelect").files[0]);
    document.getElementById("title").innerHTML = "Player | " + audio.name;
}

progressValue.style.textAlign = "center";
progressValue.style.color = "white";
progressbar.style.width = "200px";
progressbar.style.height = "20px";
progressbar.style.webkitAppearance = "none";
progressbar.style.position = "absolute";
progressbar.style.top = "0px";
progressbar.style.borderRadius = "10px";
progressbar.style.overflow = "hidden";
progressbar.style.alignContent = "center";

start.onclick = function() {
    if (isPlaying === false) {
        isPlaying = true;  
        audio.volume = localStorage.getItem("volume");
        audio.play();
        start.innerHTML = "Pause";
        progressRange.setAttribute("max", audio.duration);
        progressbar.setAttribute("max", audio.duration);
        sessionStorage.setItem("audioDuration", audio.duration);
    } else {
        isPlaying = false;  
        audio.pause();
        start.innerHTML = "Play";
        progressbar.value = audio.currentTime;
        progressValue.innerHTML = parseInt(audio.currentTime.toFixed(0));
        progressRange.value = audio.currentTime;
    }
}

audio.ontimeupdate = function() {
    progressbar.value = audio.currentTime;
    progressRange.value = audio.currentTime;
    progressValue.style.color = "white";
    progressbar.style.width = "200px";
    progressbar.style.height = "20px";
    progressbar.style.webkitAppearance = "none";
    progressbar.style.position = "absolute";
    progressbar.style.top = "0px";
    progressbar.style.left = "0px;"
    progressbar.style.borderRadius = "10px";
    progressbar.style.overflow = "hidden";
    progressbar.style.alignContent = "center";
    sessionStorage.setItem("progress", audio.currentTime);
    sec = audio.currentTime.toFixed(0)
    min = audio.currentTime.toFixed(0) / 60
    sec = sec - (60 * parseInt(min))

    if (min >= 1) {
        if (sec < 10) {
            progressValue.innerHTML = parseInt(min) + ":0" + parseInt(sec);
        } else {
            if (sec === 0) {
                progressValue.innerHTML = parseInt(min) + ":00";
            } else {
                progressValue.innerHTML = parseInt(min) + ":" + parseInt(sec);
            }
        }
    } else {
        if (audio.currentTime.toFixed(0) < 10) {
            progressValue.innerHTML = "0" + parseInt(sec);
        } else {
            progressValue.innerHTML = parseInt(sec);
        }
    }
}

audio.onended = function() {
    if (isLoop != true) {
        start.innerHTML = "Play";
        isPlaying = "false";
        progressbar.value = 0;
        progressValue.innerHTML = 0;
        progressRange.value = 0;
        audio.currentTime = 0;
    }
}

progressRange.oninput = function() {
    progressbar.value = this.value;
    if (min >= 1) {
        if (sec < 10) {
            progressValue.innerHTML = parseInt(min) + ":0" + parseInt(sec);
        } else {
            if (sec === 0) {
                progressValue.innerHTML = parseInt(min) + ":00";
            } else {
                progressValue.innerHTML = parseInt(min) + ":" + parseInt(sec);
            }
        }
    } else {
        if (audio.currentTime.toFixed(0) < 10) {
            progressValue.innerHTML = "0" + parseInt(sec);
        } else {
            progressValue.innerHTML = parseInt(sec);
        }
    }
    audio.currentTime = this.value;
    progressValue.style.textAlign = "center";
    progressValue.style.color = "white";
    progressbar.style.width = "200px";
    progressbar.style.height = "20px";
    progressbar.style.webkitAppearance = "none";
    progressbar.style.position = "absolute";
    progressbar.style.top = "0px";
    progressbar.style.borderRadius = "10px";
    progressbar.style.overflow = "hidden";
    progressbar.style.alignContent = "center";
    this.setAttribute("max", audio.duration);
    progressbar.setAttribute("max", audio.duration);
    sessionStorage.setItem("audioDuration", audio.duration);
    audio.pause()
}

progressRange.onclick = function() {
    if (isPlaying === true) {
        audio.play()
    }
}

volume.onmousemove = function() {
    volumeImg.style.display = "flex";
    volumeRange.style.display = "flex";
    volumeRange.style.marginLeft = "15px";
    volumeValue.style.display = "flex";
    volumeValue.style.fontFamily = "'fantasy'";
}

volume.onmouseleave = function() {
    volumeImg.style.display = "flex";
    volumeRange.style.display = "none";
    volumeValue.style.display = "none";
    volumeRange.style.marginLeft = "0";
}

volumeRange.oninput = function() {
    audio.volume = this.value / 100;
    volumeRange.style.marginLeft = "15px";
    localStorage.setItem("volume", this.value / 100);
    volumeValue.innerHTML = this.value + "%";
    if (parseInt(volumeRange.value) === 0) {
        volumeImg.setAttribute("src", "../img/mute.png");
    } else {
        volumeImg.setAttribute("src", "../img/audio.png");
    }
}

volumeImg.onmouseup = function() {
    if (audio.volume === 0) {
        audio.volume = localStorage.getItem("volume");
        volumeImg.setAttribute("src", "../img/audio.png");
        volumeValue.innerHTML = parseInt(localStorage.getItem("volume") * 100) + "%";
        volumeRange.value = parseInt(localStorage.getItem("volume") * 100);
    } else {
        audio.volume = 0;
        volumeImg.setAttribute("src", "../img/mute.png");
        volumeRange.style.marginLeft = "15px";
        volumeRange.value = 0;
        volumeValue.innerHTML = "0%";
    }
}


loop.onclick = function() {
    if (isLoop === true) {
        isLoop = false;
        localStorage.setItem("loop", false);
        audio.loop = false;
        loopImg.setAttribute("src", "../img/loopOff.png");
    } else {
        isLoop = true;
        localStorage.setItem("loop", true);
        audio.loop = true;
        loopImg.setAttribute("src", "../img/loopOn.png");
    }
}

window.addEventListener("error", (event) => console.warn(event));

