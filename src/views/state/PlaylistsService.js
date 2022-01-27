import React, { useEffect, useState } from "react";
import { playlistsStorage } from "../../api/PlaylistsStorage";

const usePlaylistsService = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const getAll = async () => setPlaylist(await playlistsStorage.getAll());
    getAll();
  }, []);

  const addNewPlaylist = async (title) => {
    const newPlaylist = await playlistsStorage.create({ title, tracks: [] });
    setPlaylist([...playlist, newPlaylist]);
  };

  const deleteTrackFromPlaylist = async (pl, trackId) => {
    const modifiedPlaylist = {
      ...pl,
      tracks: pl.tracks.filter((id) => id !== trackId),
    };
    return await playlistsStorage.update(modifiedPlaylist);
  };

  const deleteTrackFromMultiplePlaylist = async (trackId) => {
    setPlaylist(
      await Promise.all(
        playlist.map(async (pl) => await deleteTrackFromPlaylist(pl, trackId))
      )
    );
  };

  const addTrackToPlaylist = async (playlistId, trackId) => {
    const plist = playlist.find((pl) => pl.id === playlistId);

    if (!plist) return;

    if (plist.tracks.includes(trackId)) return;

    const modifiedPlaylist = { ...plist, tracks: plist.tracks.concat(trackId) };
    const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist);
    setPlaylist(
      playlist.map((pl) => (pl.id !== playlistId ? pl : updatedPlaylist))
    );
  };

  //Service
  const playlistsService = {
    playlist,
    addNewPlaylist,
    deleteTrackFromPlaylist,
    deleteTrackFromMultiplePlaylist,
    addTrackToPlaylist,
  };

  return playlistsService;
};

export const PlaylistsContext = React.createContext();
export const PlaylistsProvider = ({ children }) => {
  const playlistsService = usePlaylistsService();
  return (
    <PlaylistsContext.Provider value={playlistsService}>
      {children}
    </PlaylistsContext.Provider>
  );
};
