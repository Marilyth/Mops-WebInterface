function setParameterTable() {
    var test = window.location.search.substring(1).split("&");
    var table = document.getElementById("parameters");
    var parameterDict = {};

    for (i = 0; i < test.length; i++) {
        name = test[i].split("=")[0];
        value = test[i].split("=")[1];

        var row = table.insertRow(i + 1);
        row.insertCell(0).innerHTML = name;
        row.insertCell(1).innerHTML = value;
    }
}

function getParameterDict() {
    var test = window.location.search.substring(1).split("&");
    var table = document.getElementById("parameters");
    var parameterDict = {};

    for (i = 0; i < test.length; i++) {
        name = test[i].split("=")[0];
        value = test[i].split("=")[1];

        parameterDict[name] = value;
    }

    return parameterDict;
}

function redirect(){
    window.location.replace("https://discordapp.com/oauth2/authorize?client_id=305398845389406209&scope=guilds%20identify&response_type=code&redirect_uri=http://5.45.104.29/redirect.html");
}
