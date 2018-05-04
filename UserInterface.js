function displayUser() {
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("topIcon").innerHTML = `<table><tr>
    <td><img class="roundSquare" src="https://cdn.discordapp.com/avatars/${userInformation["id"]}/${userInformation["avatar"]}.webp"></td>
    <td><p>Name: ${userInformation["username"]}</p><p>Tag: ${userInformation["discriminator"]}</p><p>ID: ${userInformation["id"]}</p>
    </tr></table>`
}

function displayGuilds() {
    var guilds = JSON.parse(sessionStorage.getItem('guilds'));

    var table = document.createElement('table');
    table.id = "guilds";
    table.style = "border-collapse: separate; border-spacing: 1em 1em";
    
    var columns = Math.floor(Math.sqrt(guilds.length));
    var curRow = table.insertRow(-1);
    var count = 0;
    guilds.forEach(function (guild) {
    curRow.insertCell(-1).innerHTML = `<img class="zoomBox" src="https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png" onclick="console.log('test')" style="width: 50%; height: 50%" title="${guild["name"]}">`;
        count++;
        if (count >= columns) {
            curRow = table.insertRow(-1);
            count = 0;
        }
    });
    document.getElementById("iconList").appendChild(table);
}

function switchToGuild(guild){
    console.log('I was called');
    var toFadeOut = document.getElementsByClassName('zoomBox');
    Array.prototype.forEach.call(toFadeOut, x => {
        x.style = "width: 0%; height: 0%";
    });
    var changeTopIcon = document.getElementById('topIcon');
    changeTopIcon.innerHTML = "";
    var guildDisplay = document.createElement('table');
    var row = guildDisplay.insertRow(-1);
    row.insertCell(-1).innerHTML = `<img class="roundSquare" src="https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png">`;
    row.insertCell(-1).innerHTML = `<p>Name: ${guild["name"]}</p><p>ID: ${guild["id"]}</p>`;
}