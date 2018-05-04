

function displayUser() {
    var userInformation = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("topIcon").innerHTML = `<table><tr>
    <td><img class="roundSquare" id="icon" src="https://cdn.discordapp.com/avatars/${userInformation["id"]}/${userInformation["avatar"]}.webp"></td>
    <td id="description"><p>Name: ${userInformation["username"]}</p><p>Tag: ${userInformation["discriminator"]}</p><p>ID: ${userInformation["id"]}</p>
    </tr></table>`
}

function displayGuilds() {
    document.getElementById('task').innerHTML = 'Please select a Guild!'
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
        image.style = "width: 64px; heigth: 64px;";
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
    var toFadeOut = document.getElementById('icon');
    Array.prototype.forEach.call(toPopOut, x => {
        x.style = "width: 64px; height: 64px; transition: all 0.3s ease; transform: scale(0, 0);";
    });
    
    toFadeOut.style = "transition: all 0.3s ease; opacity: 0;";
    toFadeOut.title = guild['name'];

    window.setTimeout(function () {
        toFadeOut.src = `https://cdn.discordapp.com/icons/${guild["id"]}/${guild["icon"]}.png`;
        toFadeOut.style = "width: 128px; height: 128px; transition: all 0.3s ease; opacity: 1;";
        document.getElementById('description').innerHTML = `<p>Name: ${guild['name']}</p><p>ID: ${guild['id']}</p>`;
        document.getElementById('task').innerHTML = 'Please select a Task for Mops!'
        document.getElementById('iconList').innerHTML = '';
        displayOptions();
    }, 300);
}

function displayOptions(){
    var display = document.getElementById('iconList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: separate; border-spacing: 1em 1em";
    var trackers = table.insertRow(-1);
    trackers.insertCell(-1).innerHTML = 'Trackers';
    trackers.insertCell(-1).innerHTML = `<img class='zoomBox' style='width: 64px; height: 64px; opacity: 0;' src='http://www.checkpointvg.com/wp-content/uploads/fYdty6yd.png'>`;
    trackers.insertCell(-1).innerHTML = `<img class='zoomBox' style='width: 64px; height: 64px; opacity: 0;' src='https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png'>`;
    trackers.insertCell(-1).innerHTML = `<img class='zoomBox' style='width: 64px; height: 64px; opacity: 0;' src='https://www.redditstatic.com/icon.png'>`;
    trackers.insertCell(-1).innerHTML = `<img class='zoomBox' style='width: 64px; height: 64px; opacity: 0;' src='https://vignette.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218'>`;
    trackers.insertCell(-1).innerHTML = `<img class='zoomBox' style='width: 64px; height: 64px; opacity: 0;' src='https://i.imgur.com/0RIw2RB.png'>`;

    display.appendChild(table);

    var toPopIn = document.querySelectorAll('.zoomBox');
    window.setTimeout(function(){Array.prototype.forEach.call(toPopIn, x => {
        x.style = "width: 1px; height: 1px; transition: width height 0.3s ease; opacity: 1; transform: scale(20,20)";
    })}, 300);
}