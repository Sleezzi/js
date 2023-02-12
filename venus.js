const button = document.getElementById("copyButton");
const code = document.getElementById("code");

button.onmouseup = function() {
    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = code.innerText;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    button.innerHTML = "Copié !";
    setTimeout(function() {button.innerHTML = "Copier"}, 5000);
}

code.onmouseup = function() {
    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = code.innerText;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    button.innerHTML = "Copié !";
    setTimeout(function() {button.innerHTML = "Copier"}, 5000);
};