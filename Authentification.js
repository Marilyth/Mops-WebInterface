import React from 'react';

var APIENDPOINT = "https://discordapp.com/api/v6";
var CLIENT_ID = "305398845389406209";
var CLIENT_SECRET = "bPQW1eyzOgD7NOwHWH0earXroK__rj_T";
var REDIRECT_URI = "http://5.45.104.29/Mops-WebInterface/redirect.html";
var TokenInformation = {};
var refreshFunction = "";

function showDict(toBuild) {
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
        showDict(TokenInformation);
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
        showDict(TokenInformation);
    }

    request.open("POST", `${APIENDPOINT}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&` +
                 `redirect_uri=${REDIRECT_URI}&grant_type=refresh_token&refresh_token=${TokenInformation["refresh_token"]}`)
}

function getUser(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        var userInformation = JSON.parse(request.responseText);
        document.getElementById("response").innerHTML = JSON.stringify(request.responseText, null, "\t");
        document.getElementById("user").innerHTML = `<img src="https://cdn.discordapp.com/avatars/${userInformation["id"]}}/${userInformation["avatar"]}.webp">`
    }

    request.open("GET", `${APIENDPOINT}/users/@me`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}

function getGuilds(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        var dict = (JSON.parse(request.responseText).map(function(x){
            return {GuildName: x["name"]}
        }));
        document.getElementById("response").innerHTML = JSON.stringify(dict, null, "\t");
    }

    request.open("GET", `${APIENDPOINT}/users/@me/guilds`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}