var APIENDPOINT = "https://discordapp.com/api/v6";
var CLIENT_ID = "305398845389406209";
var CLIENT_SECRET = "bPQW1eyzOgD7NOwHWH0earXroK__rj_T";
var REDIRECT_URI = "http://5.45.104.29/Mops-WebInterface/redirect.html";
var TokenInformation = {};
var refreshFunction = "";

function redirect() {
    window.location.replace(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=guilds%20identify&response_type=code&redirect_uri=${REDIRECT_URI}`);
}

function getToken(code) {
    var code = window.location.search.substring(1).split("=")[1];
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        console.log(request.responseText);
        TokenInformation = JSON.parse(request.responseText);
        refreshFunction = setInterval(refreshToken, TokenInformation["expires_in"]*1000);
    }

    request.open("POST", `${APIENDPOINT}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&` +
                 `redirect_uri=${REDIRECT_URI}&grant_type=authorization_code&code=${code}`)
}

function refreshToken() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        console.log(request.responseText);
        TokenInformation = JSON.parse(request.responseText);
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
        var userInformation = JSON.parse(request.responseText);
        document.getElementById("user").innerHTML = `<table><tr>
        <td><img src="https://cdn.discordapp.com/avatars/${userInformation["id"]}/${userInformation["avatar"]}.webp"></td>
        <td><p>Name: ${userInformation["username"]}</p><p>Tag: ${userInformation["discriminator"]}</p><p>ID: ${userInformation["id"]}</p>
        </tr></table>`
    }

    request.open("GET", `${APIENDPOINT}/users/@me`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}

function getGuilds(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        console.log(request.responseText);
        var guilds = (JSON.parse(request.responseText));
        var table = '<table>';
        guilds.forEach(function(guild){
            table += `<tr style="display: block; float: left">
                      <td style="display: block"><img src="https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png" style="width: 25%; height: 25%"></tr>`
        });
        table += "</table>"
        document.getElementById("guilds").innerHTML = table;
    }

    request.open("GET", `${APIENDPOINT}/users/@me/guilds`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}