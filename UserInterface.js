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

    guilds.forEach(function (guild) {
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
    displayOptions();
}

function displayOptions(){
    var display = document.getElementById('iconList');
    display.innerHTML = "";

    var table = document.createElement('table');
    table.style = "border-collapse: separate; border-spacing: 1em 1em";

    var trackers = table.insertRow(-1);
    var moderation = table.insertRow(-1);
    var information = table.insertRow(-1);

    var perm = guild['permissions'].toString(2);
    manageChannel = perm.charAt(perm.length - 5) == 1 || perm.charAt(perm.length - 4) == 1 || guild['owner'];

    trackers.insertCell(-1).innerHTML = 'Manage Trackers';
    trackers.insertCell(-1).innerHTML = `<img class='zoomBox' title='Overwatch' style='width: 64px; height: 64px; opacity: 0;' src='https://i.imgur.com/0RIw2RB.png'>`;
    if(manageChannel){
        trackers.insertCell(-1).innerHTML = `<img class='zoomBox' title='Twitch' style='width: 64px; height: 64px; opacity: 0;' src='http://www.checkpointvg.com/wp-content/uploads/fYdty6yd.png'>`;
        trackers.insertCell(-1).innerHTML = `<img class='zoomBox' title='Twitter' style='width: 64px; height: 64px; opacity: 0;' src='https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png'>`;
        trackers.insertCell(-1).innerHTML = `<img class='zoomBox' title='Reddit' style='width: 64px; height: 64px; opacity: 0;' src='https://www.redditstatic.com/icon.png'>`;
        trackers.insertCell(-1).innerHTML = `<img class='zoomBox' title='Osu' style='width: 64px; height: 64px; opacity: 0;' src='https://vignette.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218'>`;
        trackers.insertCell(-1).innerHTML = `<img class='zoomBox' title='Youtube' style='width: 64px; height: 64px; opacity: 0;' src='https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-256.png'>`;
    }

    moderation.insertCell(-1).innerHTML = 'Moderation';
    moderation.insertCell(-1).innerHTML = `<img class='zoomBox' title='Giveaway' style='width: 64px; height: 64px; opacity: 0;' src='http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/gift-icon.png'>`;
    moderation.insertCell(-1).innerHTML = `<img class='zoomBox' title='Poll' style='width: 64px; height: 64px; opacity: 0;' src='http://www.myiconfinder.com/uploads/iconsets/256-256-08f7586f151e4761d26cb03276ac9b71.png'>`;

    information.insertCell(-1).innerHTML = 'Information';
    information.insertCell(-1).innerHTML = `<img class='zoomBox' title='Daily Statistics' style='width: 64px; height: 64px; opacity: 0;' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3PlZqozTISJOWTmsFGpVQxUoCt136-5cEJJZ3W3jb13-PsjP8Q'>`;
    information.insertCell(-1).innerHTML = `<img class='zoomBox' title='Ranking' style='width: 64px; height: 64px; opacity: 0;' src='https://cdn.iconscout.com/public/images/icon/premium/png-512/leaderboards-medal-rostrum-podium-prize-stage-winner-31bf126e52798c58-512x512.png'>`;

    display.appendChild(table);

    var toFadeIn = document.querySelectorAll('.zoomBox');
    window.setTimeout(function(){Array.prototype.forEach.call(toFadeIn, x => {
        x.style = "width: 64px; height: 64px; transition: all 0.3s ease; opacity: 1;";
    })}, 300);
}