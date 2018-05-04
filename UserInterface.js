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
        var image = document.createElement('img');
        image.onclick = function () { switchToGuild(guild) };
        image.style = "width: 50%; heigth: 50%;";
        image.title = guild["name"];
        image.src = `https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png`;
        image.className = "zoomBox";

        curRow.insertCell(-1).appendChild(image);
        count++;
        if (count >= columns) {
            curRow = table.insertRow(-1);
            count = 0;
        }
    });

    var list = document.getElementById('iconList');
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    document.getElementById("iconList").appendChild(table);
}

function switchToGuild(guild) {
    var toPopOut = document.querySelectorAll('.zoomBox');
    var toFadeOut = document.querySelectorAll('.roundSquare');
    Array.prototype.forEach.call(toPopOut, x => {
        x.style += "transform: scale(0, 0);";
    });
    Array.prototype.forEach.call(toFadeOut, x => {
        x.style += "opacity: 0;";
    });

    var guildDisplay = document.createElement('table');
    var row = guildDisplay.insertRow(-1);
    var image = document.createElement('img');
    image.title = guild["name"];
    image.src = `https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png`;
    image.className = "roundSquare";
    image.style =  "opacity: 0";

    row.insertCell(-1).appendChild(image);

    document.getElementById('topIcon').appendChild(guildDisplay);
    window.setTimeout(function () {
        var icon = document.getElementById('topIcon');
        icon.removeChild(icon.firstChild);
        image.style = "transition: all 0.3s ease; width: 128px; height: 128px; opacity: 1;";
    }, 300);
}