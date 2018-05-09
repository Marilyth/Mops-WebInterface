sessionStorage.setItem('APIENDPOINT', "https://discordapp.com/api/v6");
sessionStorage.setItem('CLIENT_ID', "305398845389406209");
sessionStorage.setItem('CLIENT_SECRET', "bPQW1eyzOgD7NOwHWH0earXroK__rj_T");
sessionStorage.setItem('REDIRECT_URI', "http://5.45.104.29/Mops-WebInterface/redirect.html");

function redirect() {
    window.location.replace(`https://discordapp.com/oauth2/authorize?client_id=${sessionStorage.getItem('CLIENT_ID')}&scope=guilds%20identify&response_type=code&redirect_uri=${sessionStorage.getItem('REDIRECT_URI')}`);
}

function getToken() {
    if(sessionStorage.getItem('TokenInformation') !== null){
        getUser();
        getGuilds();
        return;
    }

    var code = window.location.search.substring(1).split("=")[1];
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            console.log(request.responseText);
            sessionStorage.setItem('TokenInformation', request.responseText);
            getUser();
            getGuilds();
        } else {
            sessionStorage.removeItem('TokenInformation');
            redirect();
        }
    }

    request.open("POST", `${sessionStorage.getItem('APIENDPOINT')}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${sessionStorage.getItem('CLIENT_ID')}&client_secret=${sessionStorage.getItem('CLIENT_SECRET')}&` +
        `redirect_uri=${sessionStorage.getItem('REDIRECT_URI')}&grant_type=authorization_code&code=${code}`);
}

function refreshToken() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            console.log(request.responseText);
            sessionStorage.setItem('TokenInformation', request.responseText);
        } else {
            sessionStorage.removeItem('TokenInformation');
            redirect();
        }
    }

    request.open("POST", `${sessionStorage.getItem('APIENDPOINT')}/oauth2/token`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`client_id=${sessionStorage.getItem('CLIENT_ID')}&client_secret=${sessionStorage.getItem('CLIENT_SECRET')}&` +
        `redirect_uri=${sessionStorage.getItem('REDIRECT_URI')}&grant_type=refresh_token&refresh_token=${JSON.parse(sessionStorage.getItem('TokenInformation'))["refresh_token"]}`)
}

function getUser() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            sessionStorage.setItem('user', request.responseText);
            console.log(request.responseText);
        } else {
            //sessionStorage.removeItem('TokenInformation');
            //redirect();
        }
    }

    console.log(JSON.stringify(sessionStorage.getItem('TokenInformation')));
    request.open("GET", `${sessionStorage.getItem('APIENDPOINT')}/users/@me`, false);
    request.setRequestHeader("Authorization", `Bearer ${JSON.parse(sessionStorage.getItem('TokenInformation'))["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}

function getGuilds() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            sessionStorage.setItem('guilds', request.responseText);
            console.log(request.responseText);
        } else {
            //sessionStorage.removeItem('TokenInformation');
            //redirect();
        }
    }

    request.open("GET", `${sessionStorage.getItem('APIENDPOINT')}/users/@me/guilds`, false);
    request.setRequestHeader("Authorization", `Bearer ${JSON.parse(sessionStorage.getItem('TokenInformation'))["access_token"]}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}