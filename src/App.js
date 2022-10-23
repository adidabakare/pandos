import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import Space from "./components/Space";
import SpaceDashboard from "./components/Music";
import Player from "./components/Player";
import Music from "./components/Music";
import Podcast from "./components/Podcast";
import SpaceD from "./components/SpaceD";
import Categories from "./components/Categories";
import NFT from "./components/NFT";
import Upload from "./components/Upload";
import Profile from "./components/Profile";
import Cover from "./components/Cover";
import EditProfile from "./components/EditProfile";
import Artist from "./components/Artist";
import Dictaphone from "./components/Speach";
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Music} />
          <Route path="/space/:spacename/:action" exact component={Dashboard} />
          <Route path="/create-space" exact component={Space} />
          <Route path="/space-dashboard-music" exact component={Music} />
          <Route path="/space-dashboard-podcast" exact component={Podcast} />
          <Route
            path="/space-dashboard-space/:spacename/:action"
            exact
            component={SpaceD}
          />
          <Route
            path="/space-dashboard-categories"
            exact
            component={Categories}
          />
          <Route path="/space-dashboard-nft" exact component={NFT} />
          <Route path="/space-dashboard-upload" exact component={Upload} />
          <Route path="/speech" exact component={Dictaphone} />
          <Route path="/space-dashboard-profile" exact component={Profile} />
          <Route path="/space-dashboard-artist/:id" exact component={Artist} />
          <Route
            path="/space-dashboard-profile-edit"
            exact
            component={EditProfile}
          />
          <Route path="/space-dashboard-cover/:id" exact component={Cover} />
          <Route path="/space-player" exact component={Player} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
