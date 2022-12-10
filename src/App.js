import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import TrybeTunesProvider from './context/TrybeTunesProvider';

function App () {
  return (
    <TrybeTunesProvider>
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/search" render={ () => <Search /> } />
        <Route exact path="/album/:id" render={ (props) => <Album {...props} /> } />
        <Route exact path="/favorites" render={ () => <Favorites /> } />
        <Route exact path="/profile/" render={ () => <Profile /> } />
        <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
        <Route path="*" render={ () => <NotFound /> } />
      </Switch>
    </TrybeTunesProvider>
  );
}

export default App;
