var lastGuild = null;

function displayUser() {
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("topIcon").innerHTML = `<img class="roundSquare" id="icon" style='width: 50px; height: 50px;' src="https://cdn.discordapp.com/avatars/${userInformation["id"]}/${userInformation["avatar"]}.webp">`;
    document.getElementById('username').innerHTML = userInformation['username'];
}

function displayGuilds() {
    var guilds = JSON.parse(sessionStorage.getItem('guilds'));

    var table = document.createElement('table');
    table.id = "guilds";
    table.style = "border-collapse: separate; border-spacing: 1em 1em";
    table.insertRow(-1).insertCell(-1).innerHTML = '<button class="invite-button" type="button" onclick="window.open(`https://discordapp.com/api/oauth2/authorize?client_id=305398845389406209&permissions=271707136&redirect_uri=http%3A%2F%2F5.45.104.29%3A5000%2Fapi%2Fuser&scope=bot`, `_blank`).focus();"> Invite </button>'

    guilds.forEach(guild => {
        var image = document.createElement('img');
        image.onclick = function () { switchToGuild(guild) };
        image.style = "width: 64px; heigth: 64px;";
        image.title = guild["name"];
        image.src = `https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png`;
        image.className = "roundSquare";
        image.id = `image:${guild['id']}`;

        var cell = table.insertRow(-1).insertCell(-1);
        cell.appendChild(image);
        cell.id = `cell:${guild['id']}`;
    });

    document.getElementById("serverList").appendChild(table);
}

function switchToGuild(guild) {
    if(lastGuild !== null){
        var toReverse = document.getElementById(`image:${lastGuild['id']}`);
        toReverse.className = "roundSquare";
        toReverse.style = "width: 64px; height: 64px; border-radius: 50%; transform: scale(1, 1);";
    }

    var chosen = document.getElementById(`image:${guild['id']}`);
    chosen.style = 'width: 64px; height: 64px; border-radius: 20%; transform: scale(1.3, 1.3);'
    chosen.className = "selected-image";
    lastGuild = guild;
    displayOptions(guild);
}

function displayOptions(guild){
    var display = document.getElementById('contentList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: separate; border-spacing: 3px 3px; width: 100%;";

    var trackers = table.insertRow(-1);
    var moderation = table.insertRow(-1);

    var perm = guild['permissions'].toString(2);
    manageChannel = perm.charAt(perm.length - 5) == 1 || perm.charAt(perm.length - 4) == 1 || guild['owner'];

    table.insertRow(-1).insertCell(-1).innerHTML = 'Trackers';
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Twitch'># Twitch</div>`;
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Twitter'># Twitter</div>`;
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Reddit'># Reddit</div>`;
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Osu'># Osu</div>`;
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Youtube'># Youtube</div>`;

    table.insertRow(-1).insertCell(-1).innerHTML = 'Moderation';
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Poll'># Poll</div>`;
    table.insertRow(-1).insertCell(-1).innerHTML = `<div class='channelButton' title='Giveaway'># Giveaway</div>`;

    display.appendChild(table);

    /*var toFadeIn = document.querySelectorAll('.channelButton');
    window.setTimeout(() => {Array.prototype.forEach.call(toFadeIn, x => {
        x.style = "width: 64px; height: 64px; transition: all 0.3s ease; opacity: 1;";
    })}, 300);*/
}