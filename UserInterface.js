var lastGuild = null;
var content = {};

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

function displayOptions(){
    var display = document.getElementById('optionList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";

    var firstRow = table.insertRow(-1).insertCell(-1);
    firstRow.style = 'border-bottom : 2px solid rgb(32, 34, 37); line-height: 50px; padding-left: 10px;';
    firstRow.innerHTML = `<div id='serverName' style='text-align: left; width: 100%;'>${lastGuild['name']}</div>`;

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
            var commandName = options[category][index];
            commandButton.style.paddingLeft = '5px';
            (function(commandName){commandButton.addEventListener('click', (event) => {
                displayContent(commandName);
                event.stopPropagation();
            });})(commandName);
            acHeader.appendChild(commandButton);
        }

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);
        acHeader.onclick = (function(acHeader){return function(){expandAccordion(acHeader);}})(acHeader);
        console.log(acHeader);
    }

    display.appendChild(table);
}

function displayContent(option){
    var display = document.getElementById('contentList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";
    table.id = 'contentTable';

    var firstRow = table.insertRow(-1).insertCell(-1);
    firstRow.style = 'border-bottom : 2px solid rgb(32, 34, 37); line-height: 50px; padding-left: 10px;';
    firstRow.innerHTML = `<div id='optionName' style='text-align: center !important; width: 100%;'>${option}</div>`;

    getContent(option);

    for(var curContent in content['Content']){
        var acHeader = document.createElement('div');
        acHeader.classList = 'accordion';
        acHeader.style = 'text-align: center !important; background: rgb(72,75,81) !important;';
        acHeader.id = content['Content'][curContent]['Name'] + 'AccordionHeader';
        acHeader.innerText = content['Content'][curContent]['Name'];

        var innerTable = document.createElement('table');
        innerTable.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%; text-align: left;";

        for(var parameter in content['Content'][curContent]){
            var input = document.createElement('input');
            var description = document.createElement('div');
            var row = innerTable.insertRow(-1);
            var cellA = row.insertCell(-1);
            var cellB = row.insertCell(-1);

            description.innerText = parameter + ': ';
            description.style.fontSize = '15px';
            input.placeholder = content['Content'][curContent][parameter];
            input.required = parameter == 'Name' || parameter == 'Channel' ? true : false;
            input.readOnly = parameter == 'Name' ? true : false;
            input.value = parameter == 'Name' ? content['Content'][curContent][parameter] : '';
            input.id = content['Content'][curContent]['Name'] + parameter;
            input.style.color = 'rgb(246, 246, 247)';
            input.style.background = 'rgb(72, 75, 81)';
            input.style.border = '0';
            input.style.borderBottom = '1px solid rgb(54, 57, 63)';
            input.style.outline = 'none';
            input.addEventListener('click', (event) => {event.stopPropagation();});
            cellA.style.width = '20%';
            cellA.appendChild(description);
            cellB.style.width = '80%';
            cellB.appendChild(input);
            cellB.addEventListener('click', (event) => {event.stopPropagation();});
        }

        var update = document.createElement('button');
        update.className = 'invite-button';
        update.innerText = 'Update';
        update.style.color = 'rgb(67, 181, 129)';
        update.style.background = 'rgb(72,75,81)';
        update.style.border = '2px solid rgb(67, 181, 129)';
        update.style.width = '100%';
        update.onclick = function(event){updateContent(option, content['Content'][curContent]['Name'], getValues(content['Parameters'], content['Content'][curContent]['Name'])); event.stopPropagation();};
        var remove = document.createElement('button');
        remove.className = 'invite-button';
        remove.style.color = 'rgb(212, 56, 56)';
        remove.style.background = 'rgb(72,75,81)';
        remove.style.border = '2px solid rgb(212, 56, 56)';
        remove.style.width = '25%';
        remove.innerText = 'Remove';

        var row = innerTable.insertRow(-1);
        var cellA = row.insertCell(-1);
        var cellB = row.insertCell(-1);
        cellB.style.textAlign = 'right';
        cellB.style.paddingTop = '20px';
        cellA.style.paddingTop = '20px';
        cellA.appendChild(update);
        cellB.appendChild(remove);

        acHeader.appendChild(innerTable);

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);
        acHeader.onclick = (function(acHeader){return function(){expandAccordion(acHeader, true);}})(acHeader);
        console.log(acHeader);
    }

    //Add option for adding new element
    var acHeader = document.createElement('div');
        acHeader.classList = 'accordion';
        acHeader.style = 'text-align: center !important; background: rgb(72,75,81) !important;';
        acHeader.id = 'NewAccordionHeader';
        acHeader.innerText = '+New+';

        var innerTable = document.createElement('table');
        innerTable.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%; text-align: left;";

        for(var parameter in content['Parameters']){
            var input = document.createElement('input');
            var description = document.createElement('div');
            var row = innerTable.insertRow(-1);
            var cellA = row.insertCell(-1);
            var cellB = row.insertCell(-1);

            description.innerText = content['Parameters'][parameter] + ': ';
            description.style.fontSize = '15px';
            input.id = 'New' + content['Parameters'][parameter];
            input.style.color = 'rgb(246, 246, 247)';
            input.style.background = 'rgb(72, 75, 81)';
            input.style.border = '0';
            input.style.borderBottom = '1px solid rgb(54, 57, 63)';
            input.onclick = function(event){event.stopPropagation();};
            cellA.style.width = '20%';
            cellA.appendChild(description);
            cellB.style.width = '80%';
            cellB.appendChild(input);
        }

        acHeader.appendChild(innerTable);
        
        var div = document.createElement('div');
        div.style.paddingTop = '20px';
        var add = document.createElement('button');
        add.className = 'invite-button';
        add.innerText = 'Add';
        add.style.color = 'rgb(67, 181, 129)';
        add.style.background = 'rgb(72,75,81)';
        add.style.border = '2px solid rgb(67, 181, 129)';
        add.style.width = '100%';
        add.style.alignSelf = 'center';
        add.onclick = function(event){addContent(option, 'New', getValues(content['Parameters'], 'New')); event.stopPropagation();};
        div.appendChild(add);

        acHeader.appendChild(div);
        acHeader.onclick = (function(acHeader){return function(){expandAccordion(acHeader, true);}})(acHeader);

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);

    display.appendChild(table);
}

function expandAccordion(header, keepCenter = false){
    var count = (header.innerHTML.match(/div>/g) || []).length;
    var count2 = (header.innerHTML.match(/button>/g) || []).length;
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
    optionsDict['Trackers'] = ["Osu", "Twitch", "Twitter", "Youtube", "YoutubeLive", "Reddit", "HTML", "WoW", "OSRS", "TwitchClip", "News", "Overwatch"];
    //optionsDict['Information'] = ["GetStats"];
    //optionsDict['Moderation'] = ["Poll", "RoleInvite", "Giveaway"];

    return optionsDict;
}

function getContent(type) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            content = JSON.parse(request.responseText);
        } else {
            //sessionStorage.removeItem('TokenInformation');
            //redirect();
        }
    }
    console.log(type);
    request.open("GET", `http://5.45.104.29:5000/api/tracker?guild=${lastGuild['id']}&type=${type}`, false);
    request.send();
}

function removeContent(type, name, channel){

}

function updateContent(type, name, contentDict){

}

function addContent(type, name, contentDict){
    //Send stuff to Mops-API
    if(false){
        //Display content again, this time with added content
        console.log('Added content! o:');
        displayContent();
    } else {
        alert('Something went wrong!\nError: ');
    }
}

function getValues(parameters, name){
    dict = {};
    for(index in parameters){
        var curValue = document.getElementById(name + parameters[index]).value;
        dict[parameters[index]] = curValue;
    }
    console.log(dict);
    return dict;
}