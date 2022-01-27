import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/home/Home";
import { Layout } from "./views/layout/Layout";
import { NotFound } from "./views/notFound/NotFound";

import { Playlist } from "./views/playlist/Playlist";
import { fetchPlaylists } from "./views/state/playlists/actions";
import { fetchTracks } from "./views/state/tracks/actions";
import { Tracks } from "./views/track/Tracks";

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlaylists());
    dispatch(fetchTracks());
  }, [dispatch]);

  return (
    <Router>
      {/*Sablon*/}
      <Layout>
        <Switch>
          {/*Kezdőlap*/}
          <Route exact path="/">
            <Home />
          </Route>
          {/*Playlist oldal*/}
          <Route path="/playlist/:playlistId?/:trackId?">
            <Playlist />
          </Route>
          <Route path="/tracks">
            <Tracks />
          </Route>
          {/*Le nem kezelt elérési út komponense*/}
          <Route>
            <NotFound error="A megadott elérési út nem található!" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
