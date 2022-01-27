import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

export function TrackList({ playlist, selectedTrackId }) {
  return !playlist ? null : (
    <>
      <h3>{playlist.title}</h3>
      <div className="ui very relaxed selection list">
        {playlist.tracks.map((track) => (
          <Link
            to={`/playlist/${playlist.id}/${track.id}`}
            className={classNames("item", {
              active: track.id === selectedTrackId,
            })}
            key={track.id}
          >
            <i className="large music middle aligned icon"></i>
            <div className="content">
              <div className="header">{track.title}</div>
              <div className="description">{track.artist}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
