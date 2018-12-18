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
    table.style = "border-collapse: separate; border-spacing: 0.5em 0.5em";
    table.insertRow(-1).insertCell(-1).innerHTML = `<button class="invite-button" type="button" onclick="window.open('https://discordapp.com/api/oauth2/authorize?client_id=305398845389406209&permissions=271707136&redirect_uri=${sessionStorage.getItem(`REDIRECT_URI`)}&scope=bot', '_blank').focus();"> Invite </button>`

    guilds.forEach(guild => {
        var image = document.createElement('img');
        image.onclick = function () { switchToGuild(guild) };
        image.style = "width: 46px; heigth: 46px; margin: 0 auto; display:block;";
        image.title = guild["name"];
        if(`${guild['icon']}` != 'null')
            image.src = `https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png`;
        else
            image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png`;
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
        toReverse.style = "width: 46px; height: 46px; margin: 0 auto; display:block; border-radius: 50%; transform: scale(1, 1);";
    }

    var chosen = document.getElementById(`image:${guild['id']}`);
    chosen.style = 'width: 46px; height: 46px; margin: 0 auto; display:block; border-radius: 20%; transform: scale(1.3, 1.3);'
    chosen.className = "selected-image";
    lastGuild = guild;
    displayOptions(guild);
}

function displayOptions(guild){
    var display = document.getElementById('optionList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";

    var firstRow = table.insertRow(-1).insertCell(-1);
    firstRow.style = 'border-bottom : 2px solid rgb(32, 34, 37); line-height: 50px; padding-left: 10px;';
    firstRow.innerHTML = `<div id='serverName' style='text-align: left; width: 100%;'>${guild['name']}</div>`;

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
            commandButton.style = 'padding-left: 5px;';
            acHeader.innerHTML += commandButton.outerHTML;
        }

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);
        acHeader.onclick = (function(acHeader){return function(){expandAccordion(acHeader);}})(acHeader);
        console.log(acHeader);
    }

    display.appendChild(table);
    displayContent(guild, 'Twitch');
}

function displayContent(guild, option){
    var display = document.getElementById('contentList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";

    var firstRow = table.insertRow(-1).insertCell(-1);
    firstRow.style = 'border-bottom : 2px solid rgb(32, 34, 37); line-height: 50px; padding-left: 10px;';
    firstRow.innerHTML = `<div id='optionName' style='text-align: center !important; width: 100%;'>${option}</div>`;

    var content = getContent();

    for(var curContent in content['Content']){
        var acHeader = document.createElement('div');
        acHeader.classList = 'accordion';
        acHeader.style = 'text-align: center !important; background: rgb(72,75,81) !important;';
        acHeader.id = content['Content'][curContent]['Name'] + 'AccordionHeader';
        acHeader.innerText = content['Content'][curContent]['Name'];

        for(var parameter in content['Content'][curContent]){
            var input = document.createElement('input');
            var description = document.createElement('div');
            var innerTable = document.createElement('table');
            innerTable.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";
            var row = innerTable.insertRow(-1);
            innerTable.style.textAlign = 'left';

            description.innerText = parameter + ': ';
            description.style.fontSize = '15px';
            input.placeholder = content['Content'][curContent][parameter];
            input.required = parameter == 'Name' || parameter == 'Channel' ? true : false;
            input.readOnly = parameter == 'Name' ? true : false;
            input.style.color = 'rgb(246, 246, 247)';
            input.style.background = 'rgb(72, 75, 81)';
            input.style.border = '0';
            input.style.borderBottom = '2px solid rgb(32, 34, 37)';
            var cellA = row.insertCell(-1);
            cellA.style.width = '20%';
            cellA.appendChild(description);
            var cellB = row.insertCell(-1);
            cellB.style.width = '80%';
            cellB.appendChild(input);

            acHeader.innerHTML += innerTable.outerHTML;
        }

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);
        acHeader.onclick = (function(acHeader){return function(){expandAccordion(acHeader, true);}})(acHeader);
        console.log(acHeader);
    }

    display.appendChild(table);
}

function expandAccordion(header, keepCenter = false){
    var count = (header.innerHTML.match(/div>/g) || []).length;
    var count2 = (header.innerHTML.match(/textarea>/g) || []).length;
    var newHeight = (count + count2)*31 + 30;
    header.style.height = newHeight + 'px';
    console.log("Expanded " + header.id + " to "  + count + " Elements")
    header.onclick = function() {compressAccordion(header, keepCenter);};
}

function compressAccordion(header, keepCenter = false){
    header.style.height = '27px';
    header.onclick = function() {expandAccordion(header, keepCenter);};
}

function getChannels() {
    //ToDo
}

function getOptions() {
    var optionsDict = {};
    optionsDict['Trackers'] = ["Osu", "Twitch", "Twitter", "Youtube", "YoutubeLive", "Reddit", "HTML", "WoW", "OSRS", "TwitchClips", "News", "Overwatch"];
    optionsDict['Information'] = ["GetStats"];
    optionsDict['Moderation'] = ["Poll", "RoleInvite", "Giveaway"];

    return optionsDict;
}

function getContent() {
    var contentDict = {};
    contentDict['Parameters'] = ['Name', 'Notification', 'Channel'];
    contentDict['Content'] = [{Name:'Phunk', Notification:'Stream went live!', Channel:'1234567890'}, 
                              {Name:'Elajjaz', Notification:'Ela went live!', Channel:'1234567890'}];
    
    return contentDict;
}