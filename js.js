console.log("Extension by Sleezzi, All right reserved");
const url = `https://api.twitch.tv/helix/streams?user_id=424747398`
const clientId = "6onacrgnxzevvd6luatv9uem1773r0";
const Token = `9sg0zi027w026mwudytu06ho9tmy8k`;

const headers = {
    'Authorization': `Bearer ${Token}`,
    'Client-ID': clientId
}

const info = document.getElementById('info');

const cb = function (json) {
    if (json.data.length && !isLiveOn) {
        info.style.backgroundColor = "green";
    }
    else {
        info.style.backgroundColor = "red";
    }
}

function fetchTwitchAPI(url, headers, cb) {
    fetch(url, {headers: headers}).then((response) => {
        return response.json();
    }).then((json) => cb(json));
}

fetchTwitchAPI(url, headers, cb);