sessionStorage.setItem('APIENDPOINT', "https://discordapp.com/api/v6");
sessionStorage.setItem('CLIENT_ID', "305398845389406209");
sessionStorage.setItem('CLIENT_SECRET', "bPQW1eyzOgD7NOwHWH0earXroK__rj_T");
sessionStorage.setItem('REDIRECT_URI', "http://5.45.104.29/Mops-WebInterface/redirect.html");

function redirect() {
    window.location.replace(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=guilds%20identify&response_type=code&redirect_uri=${REDIRECT_URI}`);
}

function getToken() {
    if(sessionStorage.getItem('TokenInformation') !== null){
        getUser();
        getGuilds();
        return;
    }

    var code = window.location.search.substring(1).split("=")[1];
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.status >= 200 && request.status < 300) {
            console.log(request.responseText);
            sessionStorage.setItem('TokenInformation', request.responseText);
            getUser();
            getGuilds();
        } else {
            sessionStorage.removeItem('TokenInformation');
            redirect();
        }
    }

    request.open("POST", `${APIENDPOINT}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&` +
        `redirect_uri=${REDIRECT_URI}&grant_type=authorization_code&code=${code}`);
}

function refreshToken() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.status >= 200 && request.status < 300) {
            console.log(request.responseText);
            sessionStorage.setItem('TokenInformation', request.responseText);
        } else {
            sessionStorage.removeItem('TokenInformation');
            redirect();
        }
    }

    request.open("POST", `${APIENDPOINT}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&` +
        `redirect_uri=${REDIRECT_URI}&grant_type=refresh_token&refresh_token=${TokenInformation["refresh_token"]}`)
}

function getUser() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.status >= 200 && request.status < 300) {
            sessionStorage.setItem('user', request.responseText);
            console.log(request.responseText);
        } else {
            sessionStorage.removeItem('TokenInformation');
            redirect();
        }
    }

    request.open("GET", `${APIENDPOINT}/users/@me`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}

function getGuilds() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.status >= 200 && request.status < 300) {
            sessionStorage.setItem('guilds', request.responseText);
            console.log(request.responseText);
        } else {
            sessionStorage.removeItem('TokenInformation');
            redirect();
        }
    }

    request.open("GET", `${APIENDPOINT}/users/@me/guilds`, false);
    request.setRequestHeader("Authorization", `Bearer ${TokenInformation["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}