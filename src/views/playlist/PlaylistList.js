import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

export function PlaylistList({playlist, selectedPlaylistId}){
    return(
        <div className="ui very relaxed selection list">
            {
            playlist.map(play =>  
                <Link to={`/playlist/${play.id}`} className={classNames('item',{ active: selectedPlaylistId === play.id})} key={play.id}>
                    <i className="large compact disc middle aligned icon"></i>
                    <div className="content">
                        <div className="header">{play.title}</div>
                        <div className="description">{play.tracks.length} songs</div>
                    </div>
                </Link>
            )
            }
           
            
        </div>
    )
}