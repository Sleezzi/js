const main = document.getElementById("main");
const navTwitch = document.getElementById("twitchNav");
const navYoutube = document.getElementById("youtubeNav");
const navSettings = document.getElementById("settingsNav");
const twitchContent = document.getElementById("twitchContent");
const youtubeContent = document.getElementById("youtubeContent");
const settingsContent = document.getElementById("settingsContent");

const notificationTwitchSwitchContener = document.getElementById("notificationTwitchSwitchContener");
const notificationTwitchSwitchButton = document.getElementById("notificationTwitchSwitchButton");
const notificationTwitchText = document.getElementById("notificationTwitchText");
const notificationYoutubeSwitchContener = document.getElementById("notificationYoutubeSwitchContener");
const notificationYoutubeSwitchButton = document.getElementById("notificationYoutubeSwitchButton");
const notificationYoutubeText = document.getElementById("notificationYoutubeText");
const theme = document.getElementById("menu");
const audio = document.getElementById("audio");
audio.volume = 1;

if (localStorage.getItem("notifiactionTwitch") != "undefined" | localStorage.getItem("notifiactionTwitch") != null) {
  if (localStorage.getItem("notifiactionTwitch") === "false") {
    notificationTwitchSwitchContener.style.backgroundColor = "red";
    notificationTwitchSwitchButton.style.marginLeft = "-18px";
  } else {
    notificationTwitchSwitchContener.style.backgroundColor = "green";
    notificationTwitchSwitchButton.style.marginLeft = "calc(50% - 3px)";
  }
} else  {
  notificationTwitchSwitchContener.style.backgroundColor = "green";
  notificationTwitchSwitchButton.style.marginLeft = "calc(50% - 3px)";
  localStorage.setItem("notifiactionTwitch", "true");
};

if (localStorage.getItem("notifiactionYoutube") != "undefined" | localStorage.getItem("notifiactionYoutube") != null) {
  if (localStorage.getItem("notifiactionYoutube") === "false") {
    notificationYoutubeSwitchContener.style.backgroundColor = "red";
    notificationYoutubeSwitchButton.style.marginLeft = "-18px";
  } else {
    notificationYoutubeSwitchContener.style.backgroundColor = "green";
    notificationYoutubeSwitchButton.style.marginLeft = "calc(50% - 3px)";
  }
} else  {
  notificationYoutubeSwitchContener.style.backgroundColor = "green";
  notificationYoutubeSwitchButton.style.marginLeft = "calc(50% - 3px)";
  localStorage.setItem("notifiactionYoutube", true);
};

if (localStorage.getItem("theme") != "undefined" | localStorage.getItem("theme") != null) {
  theme.value = localStorage.getItem("theme");
  if (localStorage.getItem("theme") === "System") {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
      main.classList.add('dark-mode');
    } else {
      main.classList.remove('dark-mode');
    }
  } else if (localStorage.getItem("theme") === "Dark") {
    main.classList.add('dark-mode');
  } else if (localStorage.getItem("theme") === "Light") {
    main.classList.remove('dark-mode');
  } else {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 18 || hour < 6) {
      main.classList.add('dark-mode');
    } else {
      main.classList.remove('dark-mode');
    }
  }
} else  {
  theme.value = "Dark";
  main.classList.add('dark-mode');
  
  localStorage.setItem("theme", "Dark");
};

function nav(Button, Page) {
  navTwitch.style.filter = "none";
  navTwitch.style.borderRadius = "100vh";
  twitchContent.style.display = "none";

  navYoutube.style.filter = "none";
  navYoutube.style.borderRadius = "100vh";
  youtubeContent.style.display = "none";

  navSettings.style.filter = "none";
  navSettings.style.borderRadius = "100vh";
  settingsContent.style.display = "none";

  Button.style.borderRadius = "15px";
  Button.style.filter = "invert()";
  Page.style.display = "block";
};

navTwitch.onmouseup = function () {nav(navTwitch, twitchContent)};
navYoutube.onmouseup = function () {nav(navYoutube, youtubeContent)};
navSettings.onmouseup = function () {nav(navSettings, settingsContent)};

if (window.location.href.indexOf("options") > -1) {
  nav(navSettings, settingsContent);  
}

theme.addEventListener('change', event => {
  const value = event.target.value;
  localStorage.setItem("theme", value);
  if (value === 'Dark') {
    main.classList.add('dark-mode');
  } else if (value === 'Light') {
    main.classList.remove('dark-mode');
  } else if (value === 'Hours') {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 18 || hour < 6) {
      main.classList.add('dark-mode');
    } else {
      main.classList.remove('dark-mode');
    }
  } else {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
      main.classList.add('dark-mode');
    } else {
      main.classList.remove('dark-mode');
    }
  }
});

function notification(Button, Contener, Storage) {
  if (localStorage.getItem(Storage) === "true") {
    Contener.style.backgroundColor = "red";
    Button.style.marginLeft = "calc(0% - 18px)";
    Button.border = "",
    localStorage.setItem(Storage, "false");
  } else {
    Contener.style.backgroundColor = "green";
    Button.style.marginLeft = "calc(50% - 3px)";
    localStorage.setItem(Storage, "true");
    audio.play();
  }
};

notificationTwitchSwitchContener.onmouseup = function() {notification(notificationTwitchSwitchButton, notificationTwitchSwitchContener, "notifiactionTwitch")};
notificationTwitchText.onmouseup = function() {notification(notificationTwitchSwitchButton, notificationTwitchSwitchContener, "notifiactionTwitch")};

notificationYoutubeSwitchContener.onmouseup = function() {notification(notificationYoutubeSwitchButton, notificationYoutubeSwitchContener, "notifiactionYoutube")};
notificationYoutubeText.onmouseup = function() {notification(notificationYoutubeSwitchButton, notificationYoutubeSwitchContener, "notifiactionYoutube")};

function VideoFetch() {
  fetch("https://sleezzi.github.io/extension/YouTubeVideo.json", {
    method: "GET"
  }).then(response => {return response.json()}).then(data => {
    if (!data.error) {
      const MyLastVideo = document.getElementById("LastVideo");
      const MyLastVideoImg = document.getElementById("LastVideoImage");
      const MyLastVideoTitle = document.getElementById("LastVideoTitle");
      const MyLastVideoPublishedAt = document.getElementById("LastVideoPublishedAt");
      const MyLastVideoDuration = document.getElementById("LastVideoDuration");
      
      MyLastVideo.setAttribute("href", "https://youtube.com/watch?v=" + data.items[0].id + "&t=0");
      MyLastVideo.setAttribute("alt", data.items[0].title)
      MyLastVideo.style.cursor = "pointer";
      MyLastVideoTitle.innerHTML = data.items[0].title;
      MyLastVideoImg.style.background = 'url("https://i.ytimg.com/vi/' + data.items[0].id + '/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGDuO3MAuK81v9cn7N6t5rGAFIBA") no-repeat center';
      MyLastVideoImg.style.backgroundSize = "cover";
      const duration = data.items[0].duration;
      const timeParts = duration.match(/([0-9]+)([HMS])/g)

      if (parseInt(timeParts[2]) > 0) { // Heure + Minute + Seconde
        MyLastVideoDuration.innerHTML = "Durée : " + parseInt(timeParts[0]) + ":" + (parseInt(timeParts[1]) < 10 ? "0" + parseInt(timeParts[1]) : parseInt(timeParts[1])) + ":" + (parseInt(timeParts[2]) > 0 ? (parseInt(timeParts[2]) < 10 ? "0" + parseInt(timeParts[2]) : parseInt(timeParts[2])) : "00");
      } else if (parseInt(timeParts[1]) > 0) { // Minute + Seconde
        MyLastVideoDuration.innerHTML = "Durée : " + parseInt(timeParts[0]) + ":" + (parseInt(timeParts[1]) > 0 ? (parseInt(timeParts[1]) < 10 ? "0" + parseInt(timeParts[1]) : parseInt(timeParts[1])) : "00");
      } else { // Seconde
        MyLastVideoDuration.innerHTML = "Durée : " + parseInt(timeParts[0]) + "s";
      }

      const date = new Date(data.items[0].publishedAt).getTime() / 1000;
  
      var diff = Math.floor(Date.now() / 1000) - date;
    
      if (diff < 60) {
        return MyLastVideoPublishedAt.innerHTML = "Il y a quelque secondes.";
      } else if (diff < 3600) {
        var amount = Math.floor(diff / 60);
        return MyLastVideoPublishedAt.innerHTML = "Il y a " + amount + " minute" + (amount > 1 ? "s" : "");
      } else if (diff < 86400) {
        var amount = Math.floor(diff / 3600);
        return MyLastVideoPublishedAt.innerHTML = "Il y a " + amount + " heure" + (amount > 1 ? "s" : "");
      } else if (diff < 2419200) {
        var amount = Math.floor(diff / 86400);
        return MyLastVideoPublishedAt.innerHTML = "Il y a " + amount + " jour" + (amount > 1 ? "s" : "");
      } else if (diff < 29030400) {
        return MyLastVideoPublishedAt.innerHTML = Math.floor(diff / 2419200) + " mois";
      } else {
        var amount = Math.floor(diff / 29030400);
        return MyLastVideoPublishedAt.innerHTML = "Il y a " + amount + " an" + (amount > 1 ? "s" : "");
      }
    }    
  });
};
if (navigator.onLine) {
  setInterval(function() {VideoFetch()}, 60);
} else {
  console.log("Connectez-vous à Internet pour profiter de toute les fonctionnalité de cette extension");
}
