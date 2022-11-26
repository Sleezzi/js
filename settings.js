const switchContener = document.getElementById("switchContener");

if (localStorage.getItem("theme") != null || localStorage.getItem("theme") != 'undefined') {
    if (localStorage.getItem("theme") === "#333") {
        switchContener.style.backgroundColor = "rgb(0, 255, 0)";
        switchContener.style.justifyContent = "flex-end";
    } else {
        switchContener.style.backgroundColor = "red";
        switchContener.style.justifyContent = "flex-start";
    }
} else {
    switchContener.style.backgroundColor = "red";
    switchContener.style.justifyContent = "flex-start";
    localStorage.setItem("theme", "white");
}

switchContener.onmouseup = function() {
    if (localStorage.getItem("theme") === "#333") {
        switchContener.style.backgroundColor = "red";
        switchContener.style.justifyContent = "flex-start";
        document.getElementById("body").style.backgroundColor = "white";
        localStorage.setItem("theme", "white");
        
    } else {
        switchContener.style.backgroundColor = "rgb(0, 255, 0)";
        switchContener.style.justifyContent = "flex-end";
        document.getElementById("body").style.backgroundColor = "#333";
        localStorage.setItem("theme", "#333");
    }
}