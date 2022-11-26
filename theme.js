if (localStorage.getItem("theme") != null || localStorage.getItem("theme") != 'undefined') {
    document.getElementById("body").style.backgroundColor = localStorage.getItem("theme");
} else {
    localStorage.setItem("theme", "white");
}