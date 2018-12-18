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

    table.insertRow(-1).insertCell(-1).innerHTML = `<div id='serverName' style='background-color: rgb(32, 34, 37); text-align: left; width: 100%;'>${guild['name']}</div>`;

    var options = getOptions();

    for(var category in options){
        var acHeader = document.createElement('div');
        acHeader.classList = 'accordion';
        acHeader.id = category + 'AccordionHeader';
        acHeader.innerText = category;

        for(var index in options[category]){
            var commandButton = document.createElement('div');
            commandButton.className = 'channelButton';
            commandButton.innerText = '# ' + options[category][index];
            commandButton.title = options[category][index];
            acHeader.innerHTML += commandButton.outerHTML;
        }

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);
        acHeader.onclick = (function(acHeader){return function(){expandAccordion(acHeader);}})(acHeader);
        console.log(acHeader);
    }

    display.appendChild(table);
}

function expandAccordion(header){
    var count = (header.innerHTML.match(/div>/g) || []).length;
    var newHeight = count*22 + count*3 + 29;
    header.style = 'height: ' + newHeight + 'px;';
    console.log("Expanded " + header.id + " to "  + count + " Elements")
    header.onclick = function() {compressAccordion(header);};
}

function compressAccordion(header){
    header.style = 'height: 29px';
    header.onclick = function() {expandAccordion(header);};
}

function getChannels() {
    //ToDo
}

function getOptions() {
    var optionsDict = {};
    optionsDict['Trackers'] = ["Osu", "Twitch", "Twitter", "Youtube", "YoutubeLive", "Reddit", "HTML", "WoW", "OSRS", "TwitchClips"];
    optionsDict['Information'] = ["GetStats"];
    optionsDict['Moderation'] = ["Poll", "RoleInvite", "Giveaway"];

    return optionsDict;
}