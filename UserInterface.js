var lastGuild = null;
var autoOpenIndex = "New";
var content = {};

function displayUser() {
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("topIcon").innerHTML = `<img class="roundSquare" id="icon" style='width: 50px; height: 50px;' src="https://cdn.discordapp.com/avatars/${userInformation["id"]}/${userInformation["avatar"]}.webp">`;
    document.getElementById('username').innerHTML = userInformation['username'];
}

function displayGuilds() {
    var guilds = JSON.parse(sessionStorage.getItem('guilds'));

    var inviteButton = document.createElement('img');
    inviteButton.src = "https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_11-512.png";
    inviteButton.className = "clickable"
    inviteButton.style = `text-align: center !important; width: 46px; height: 46px; border-bottom: 2px solid rgb(77, 77, 77);`;
    inviteButton.style.paddingTop = "4px";
    inviteButton.style.paddingBottom = "4px";
    inviteButton.onclick = function(){window.open(`https://discordapp.com/api/oauth2/authorize?client_id=305398845389406209&permissions=271707136&redirect_uri=${sessionStorage.getItem(`REDIRECT_URI`)}&scope=bot`, '_blank').focus()};
    var head = document.getElementById('serverListHeader');
    head.innerHTML = "";
    head.appendChild(inviteButton);

    var table = document.createElement('table');
    table.id = "guilds";
    table.style = "border-collapse: separate; border-spacing: 0.5em 0.5em; width: 100%;";

    guilds.forEach(guild => {
        var image = document.createElement('img');
        image.onclick = function () { switchToGuild(guild) };
        image.style = "width: 46px; heigth: 46px; margin: 0 auto; display:block;";
        image.title = guild["name"];
        if (`${guild['icon']}` != 'null')
            image.src = `https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png`;
        else
            image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png`;
        image.className = "roundSquare";
        image.id = `image:${guild['id']}`;

        var cell = table.insertRow(-1).insertCell(-1);
        cell.appendChild(image);
        cell.id = `cell:${guild['id']}`;
    });

    var list = document.getElementById("serverList");
    list.appendChild(table);
}

function switchToGuild(guild) {
    if (lastGuild !== null) {
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

function displayOptions() {
    var display = document.getElementById('optionList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";

    var serverName = document.createElement('div');
    serverName.style = `text-align: center !important; width: 100%; border-bottom: 2px solid rgb(32, 34, 37); line-height: 50px;`;
    serverName.innerText = lastGuild['name'];
    var head = document.getElementById('optionListHeader');
    head.innerHTML = "";
    head.appendChild(serverName);

    var options = getOptions();

    for (var category in options) {
        var acHeader = document.createElement('div');
        acHeader.classList = 'accordion';
        acHeader.id = category + 'AccordionHeader';
        acHeader.innerText = category;

        for (var index in options[category]) {
            var commandButton = document.createElement('div');
            commandButton.className = 'channelButton';
            commandButton.innerText = '# ' + options[category][index];
            var commandName = options[category][index];
            commandButton.style.paddingLeft = '5px';
            (function (commandName) {
                commandButton.addEventListener('click', (event) => {
                    autoOpenIndex = "New";
                    getContent(commandName);
                    event.stopPropagation();
                });
            })(commandName);
            acHeader.appendChild(commandButton);
        }

        table.insertRow(-1).insertCell(-1).appendChild(acHeader);
        acHeader.onclick = (function (acHeader) { return function () { expandAccordion(acHeader); } })(acHeader);
        console.log(acHeader);
    }

    display.appendChild(table);
}

function displayContent(option) {
    var display = document.getElementById('contentList');
    display.innerHTML = "";

    var optionName = document.createElement('div');
    optionName.style = `text-align: center !important; width: 100%; border-bottom: 2px solid rgb(32, 34, 37); line-height: 50px;`;
    optionName.innerText = option;
    var head = document.getElementById('contentListHeader');
    head.innerHTML = "";
    head.appendChild(optionName);

    var table = document.createElement('table');
    table.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%;";
    table.id = 'contentTable';

    var headers = makeInputTable(option);
    headers.push(makeNewInput(option));

    for (var index in headers) {
        var curHeader = headers[index];
        table.insertRow(-1).insertCell(-1).appendChild(headers[index]);
        headers[index].onclick = (function (curHeader) { return function () { expandAccordion(curHeader); } })(curHeader);

        if(headers[index].id.startsWith(autoOpenIndex)) {
            var headerToExpand = headers[index];
            (function(headerToExpand){
                setTimeout(function(){
                    headerToExpand.style.backgroundColor = "rgb(80,83,89)";
                    setTimeout(function(){headerToExpand.style.backgroundColor = "rgb(72,75,81)"}, 200);
                    expandAccordion(headerToExpand)
                }, 30)
            })(headerToExpand);
        }
        console.log(headers[index]);
    }

    display.appendChild(table);
}

function expandAccordion(header) {
    var count = (header.innerHTML.match(/div>/g) || []).length;
    var count2 = (header.innerHTML.match(/button>/g) || []).length;
    var newHeight = (count + count2) * 31 + 30;
    header.style.height = newHeight + 'px';
    console.log("Expanded " + header.id + " to " + count + " Elements")
    header.onclick = function () { compressAccordion(header); };
}

function compressAccordion(header) {
    header.style.height = '27px';
    header.onclick = function () { expandAccordion(header); };
}

function getChannels() {
    //ToDo
}

function getOptions() {
    var optionsDict = {};
    optionsDict['Trackers'] = ["OsuTracker", "TwitchTracker", "TwitterTracker", "YoutubeTracker", "YoutubeLiveTracker", "RedditTracker", "HTMLTracker", "WoWTracker", "OSRSTracker", "TwitchClipTracker", "NewsTracker", "OverwatchTracker"];
    //optionsDict['Information'] = ["GetStats"];
    //optionsDict['Moderation'] = ["Poll", "RoleInvite", "Giveaway"];

    return optionsDict;
}

function getContent(type) {
    var display = document.getElementById('contentList');
    display.innerHTML = "<img src='https://i.gifer.com/embedded/download/ZKZg.gif' style='width: 50px;height: 50px; top: 50%;'/>"
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            content = JSON.parse(request.responseText);
            displayContent(type);
        } else {
            //sessionStorage.removeItem('TokenInformation');
            //redirect();
        }
    }
    console.log(type);
    request.open("GET", `http://5.45.104.29:5000/api/content?guild=${lastGuild['id']}&type=${type}`);
    request.send();
}

function removeContent(type, name, contentDict) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            if(request.responseText.startsWith("ERROR")){
                alert(request.responseText);
            } else if(request.responseText.startsWith("Success")) {
                getContent(type);
            }
        } else {

        }
    }
    console.log(type);
    
    request.open("POST", `http://5.45.104.29:5000/api/content/remove`);
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    request.setRequestHeader("Type", type);
    request.setRequestHeader("User", userInformation["id"]);
    request.send(JSON.stringify(contentDict["OldValue"]));
}

function updateContent(type, name, contentDict) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            if(request.responseText.startsWith("ERROR")){
                alert(request.responseText);
            } else if(request.responseText.startsWith("Success")) {
                autoOpenIndex = name;
                getContent(type);
            }
        } else {

        }
    }
    console.log(contentDict);
    
    request.open("POST", `http://5.45.104.29:5000/api/content/update`);
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    request.setRequestHeader("Type", type);
    request.setRequestHeader("User", userInformation["id"]);
    request.send(JSON.stringify(contentDict));
}

function addContent(type, name, contentDict) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 400) {
            if(request.responseText.startsWith("ERROR")){
                alert(request.responseText);
            } else if(request.responseText.startsWith("Success")) {
                autoOpenIndex = contentDict["NewValue"]["_Name"];
                getContent(type);
            }
        } else {

        }
    }
    console.log(type);
    
    request.open("POST", `http://5.45.104.29:5000/api/content/add`);
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    request.setRequestHeader("Type", type);
    request.setRequestHeader("User", userInformation["id"]);
    request.send(JSON.stringify(contentDict["NewValue"]));
}

function getValues(index, name) {
    dict = {"NewValue": {}, "OldValue": content["Content"][index]};
    dict["NewValue"]["_Name"] = name;
    for (entry in content["Parameters"]) {
        if(entry.startsWith("_") && name != "New") continue;
        var curValue = document.getElementById(name + entry).value;
        dict["NewValue"][entry] = curValue;
    }

    console.log(dict);
    return dict;
}

function makeInputTable(option) {
    var headers = [];
    for (var curContent in content['Content']) {
        var acHeader = document.createElement('div');
        acHeader.classList = 'accordion';
        acHeader.style = 'text-align: center !important; background: rgb(72,75,81) !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
        acHeader.style.width = window.innerWidth * 0.6 * 0.7 + "px";
        acHeader.id = content['Content'][curContent]['_Name'] + 'AccordionHeader';
        acHeader.innerText = content['Content'][curContent]['_Name'];

        var innerTable = document.createElement('table');
        innerTable.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%; text-align: left; color: rgb(246, 246, 247);";

        for (var parameter in content['Parameters']) {
            if(parameter.startsWith("_")) continue;
            var input;
            var description = document.createElement('div');
            var row = innerTable.insertRow(-1);
            var cellA = row.insertCell(-1);
            var cellB = row.insertCell(-1);

            description.innerText = parameter + ': ';
            description.style.fontSize = '15px';

            if (Array.isArray(content["Parameters"][parameter])) {
                input = document.createElement('select');

                for (var optionIndex in content["Parameters"][parameter]) {
                    var optionValue = document.createElement('option');
                    optionValue.text = content["Parameters"][parameter][optionIndex];
                    optionValue.value = content["Parameters"][parameter][optionIndex];
                    if(content["Parameters"][parameter][optionIndex] == content['Content'][curContent][parameter]){
                        optionValue.selected = true;
                    }
                    
                    input.appendChild(optionValue);
                }
            } else {
                input = document.createElement('input')
                input.value = content['Content'][curContent][parameter];
                input.autocomplete = false;
            }

            input.id = content['Content'][curContent]["_Name"] + parameter;
            input.style.color = 'rgb(246, 246, 247)';
            input.style.background = 'rgb(72, 75, 81)';
            input.style.border = '0';
            input.style.width = '100%';
            input.style.borderBottom = '1px solid rgb(54, 57, 63)';
            input.style.outline = 'none';
            input.addEventListener('click', (event) => { event.stopPropagation(); });
            cellA.style.width = '20%';
            cellA.appendChild(description);
            cellB.style.width = '80%';
            cellB.appendChild(input);
            cellB.addEventListener('click', (event) => { event.stopPropagation(); });
        }

        var update = document.createElement('button');
        update.className = 'invite-button';
        update.innerText = 'Update';
        update.style.color = 'rgb(67, 181, 129)';
        update.style.background = 'rgb(72,75,81)';
        update.style.border = '2px solid rgb(67, 181, 129)';
        update.style.width = '100%';
        var curName = content['Content'][curContent]['_Name'];
        (function(curName, curContent){update.addEventListener('click', (event) => {updateContent(option, curName, getValues(curContent, curName)); event.stopPropagation();})})(curName, curContent);

        var remove = document.createElement('button');
        remove.className = 'invite-button';
        remove.innerText = 'Remove';
        remove.style.color = 'rgb(212, 56, 56)';
        remove.style.background = 'rgb(72,75,81)';
        remove.style.border = '2px solid rgb(212, 56, 56)';
        remove.style.width = '25%';
        (function(curName, curContent){remove.addEventListener('click', (event) => {removeContent(option, curName, getValues(curContent, curName)); event.stopPropagation();})})(curName, curContent);

        var row = innerTable.insertRow(-1);
        var cellA = row.insertCell(-1);
        var cellB = row.insertCell(-1);
        cellB.style.textAlign = 'right';
        cellB.style.paddingTop = '20px';
        cellA.style.paddingTop = '20px';
        cellA.appendChild(update);
        cellB.appendChild(remove);

        acHeader.appendChild(innerTable);
        headers.push(acHeader);
    }

    return headers;
}

function makeNewInput(option) {
    var acHeader = document.createElement('div');
    acHeader.classList = 'accordion';
    acHeader.style = 'text-align: center !important; background: rgb(72,75,81) !important;';
    acHeader.id = 'NewAccordionHeader';
    acHeader.innerText = '+New+';

    var innerTable = document.createElement('table');
    innerTable.style = "border-collapse: collapse; border-spacing: 3px 3px; width: 100%; text-align: left; color: rgb(246, 246, 247);";

    for (var parameter in content['Parameters']) {
        var input;
        var description = document.createElement('div');
        var row = innerTable.insertRow(-1);
        var cellA = row.insertCell(-1);
        var cellB = row.insertCell(-1);

        description.innerText = parameter + ': ';
        description.style.fontSize = '15px';

        if (Array.isArray(content["Parameters"][parameter])) {
            input = document.createElement('select');
            input.required = true;
            for (var optionIndex in content["Parameters"][parameter]) {
                var optionValue = document.createElement('option');
                optionValue.text = content["Parameters"][parameter][optionIndex];
                optionValue.value = content["Parameters"][parameter][optionIndex];
                input.appendChild(optionValue);
            }
        } else {
            input = document.createElement('input')
            input.autocomplete = false;
        }

        input.id = 'New' + parameter;
        input.value = content['Parameters'][parameter];
        input.style.width = '100%';
        input.style.color = 'rgb(246, 246, 247)';
        input.style.background = 'rgb(72, 75, 81)';
        input.style.border = "0";
        input.style.borderBottom = '1px solid rgb(54, 57, 63)';
        input.style.outline = 'none';
        input.onclick = function (event) { event.stopPropagation(); };

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
    add.onclick = function (event) { addContent(option, 'New', getValues(content['Parameters'], 'New')); event.stopPropagation(); };
    div.appendChild(add);

    acHeader.appendChild(div);
    acHeader.onclick = (function (acHeader) { return function () { expandAccordion(acHeader); } })(acHeader);

    return acHeader;
}