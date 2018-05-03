var APIENDPOINT = "https://discordapp.com/api/v6";
var CLIENT_ID = "305398845389406209";
var CLIENT_SECRET = "bPQW1eyzOgD7NOwHWH0earXroK__rj_T";
var REDIRECT_URI = "http://5.45.104.29/Mops-WebInterface/redirect.html";
var TokenInformation = {};
var refreshFunction = "";

function showToken() {
    var table = document.getElementById("parameters");
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }

    for (const [key, value] of Object.entries(TokenInformation)) {
        row = table.insertRow(-1);
        row.insertCell(0).innerHTML = key;
        row.insertCell(1).innerHTML = value;
    }
}

function redirect() {
    window.location.replace(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=guilds%20identify&response_type=code&redirect_uri=${REDIRECT_URI}`);
}

function getToken(code) {
    var code = window.location.search.substring(1).split("=")[1];
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        TokenInformation = JSON.parse(request.responseText);
        refreshFunction = setInterval(refreshToken, TokenInformation["expires_in"]);
        showToken();
    }

    request.open("POST", `${APIENDPOINT}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&` +
                 `redirect_uri=${REDIRECT_URI}&grant_type=authorization_code&code=${code}`)
}

function refreshToken() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        TokenInformation = JSON.parse(request.responseText);
        showToken();
    }

    request.open("POST", `${APIENDPOINT}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&` +
                 `redirect_uri=${REDIRECT_URI}&grant_type=refresh_token&refresh_token=${TokenInformation["refresh_token"]}`)
}

function getUser(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        console.log(request.responseText);
    }

    request.open("GET", `${APIENDPOINT}/users/@me`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
}