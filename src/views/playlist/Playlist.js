import React, { useContext } from "react";
import { PlaylistForm } from "./PlaylistForm";
import { PlaylistList } from "./PlaylistList";
import { TrackDetails } from "./TrackDetails";
import { TrackList } from "./TrackList";
import { PlaylistsContext } from "../state/PlaylistsService";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsWithTracks } from "../state/selectors";
import { addPlaylist } from "../state/playlists/actions";

export function Playlist() {
  const dispatch = useDispatch();
  const { playlistId: selectedPlaylistId, trackId: selectedTackId } =
    useParams();

  const playlistsWithTracks = useSelector(getPlaylistsWithTracks);

  const playList = playlistsWithTracks.find(
    (play) => play.id === selectedPlaylistId
  );

  const handleNewPlaylist = (title) => {
    dispatch(addPlaylist(title));
  };

  const track =
    playList && playList.tracks.find((tr) => tr.id === selectedTackId);

  return (
    <div className="ui container">
      <h1>My Playlists</h1>
      <div className="ui stackable two column grid">
        <div className="ui six wide column">
          <h3>Playlists</h3>
          {/*PlaylistForm komponens felel az új playlist-et felvevő form kezelésért. A komponensnek átadásra került  */}
          <PlaylistForm onSubmit={handleNewPlaylist} />
          {/*PlaylistList komponens felel a playlistek-kel kapcsolatos műveletekre és megjelenítésekre. A komponensnek átadásra került a playlisteket tartalmazó objektum (playlist), az akutálisan kiválasztott playlist id-ja (selectedPlaylistId), továbbá még átadásra került az a függvény, aminek segítségével a kiválasztás inerakció kezelésre kerül (onSelect). */}
          <PlaylistList
            playlist={playlistsWithTracks}
            selectedPlaylistId={selectedPlaylistId}
          />
        </div>
        <div className="ui ten wide column">
          {/*TrackList komponens felel a track-kekkel kapcsolatos műveletekre és megjelenítésekre. A komponensnek átadásra került az aktuálisan kiválasztott playlistet tartalmazó objektum (playlist), az akutálisan kiválasztott track id-ja (selectedTrackId), továbbá még átadásra került az a függvény, aminek segítségével a kiválasztás inerakció kezelésre kerül (onSelect).  */}
          <TrackList playlist={playList} selectedTrackId={selectedTackId} />
        </div>
      </div>
      <div className="ui divider"></div>
      {/*TrackDetails komponens felel a kiválasztott track részletes adatainak megjelenítésért. A komponensnek átadásra került a kiválasztott track. */}
      <TrackDetails track={track} />
    </div>
  );
}
