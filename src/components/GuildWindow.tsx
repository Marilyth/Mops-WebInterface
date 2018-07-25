import * as React from 'react';
import Guilds from './Guilds';

class GuildWindow extends React.Component{
    public selectedGuild = null;

    public render(){
        return <div className = 'centralContainer'>
                <table id='containerTable'>
                    <tr>
                        <td>
                            <div id='serverList' className='scroll-content serverList'>
                                <Guilds/>
                            </div>
                        </td>
                        <td>
                            <div id="iconList" className='iconList'> bla </div>
                        </td>
                    </tr>
                    </table>
           </div>
    }
}

export default GuildWindow