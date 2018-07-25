import * as React from 'react';

class Guilds extends React.Component {

    private lastGuild: any;



    public Guilds() {
        this.lastGuild = null;
    }

    public render() {
        const guilds = JSON.parse(sessionStorage.getItem('guilds') || "");


        return <table id="guilds" className='guildTable'>
            {guilds.map((guild: any) => this.tabelRow(guild))}
        </table>
    }

    public tabelRow = (guild: any) => {
        return <tr>
            <td id={guild.id}>
                <img title={guild.name} onClick={// tslint:disable-next-line:jsx-no-lambda no-shadowed-variable
                    () => { this.switchToGuild(guild) }} className='roundSquare guildIcon' src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                />
            </td>
        </tr>
    }


    public switchToGuild = (guild: any) => {
        if (this.lastGuild != null) {
            const toReverse = document.getElementById(`image:${this.lastGuild.id}`);
            if (toReverse) {
                toReverse.className = "roundSquare toReverseElement";
            }
        }
        const chosen = document.getElementById(`image:${guild.id}`);
        if (chosen) {
            chosen.className = "selected-image chosenElement";
        }
        this.lastGuild = guild;
        this.displayOptions(guild);
    }

    private displayOptions(guild: any) {
        // tslint:disable-next-line:no-console
        console.log(guild.id)
    }



}


export default Guilds