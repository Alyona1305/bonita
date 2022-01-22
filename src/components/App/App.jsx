import React from 'react';
import './App.scss';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Header } from '../Header/Header';
import { Player } from '../Player/Player';
import { MainPage } from '../../pages/MainPage/MainPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { PlaylistsPage } from '../../pages/PlaylistsPage/PlaylistsPage';
import store from '../../store/store';
import { theme } from '../../assets/theme';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { SelectedPlaylistPage } from '../../pages/SelectedPlaylistPage/SelectedPlaylistPage';
import { history } from '../../createHistory';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { UploadPlaylist } from '../../pages/UploadPlaylist/UploadPlaylist';
import { UploadTracks } from '../../pages/UploadTracks/UploadTracks';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        <Switch>
          {/* TODO: move all routes to constants and reuse it at other places like
            const ROUTES = {
              MAIN_PAGE: '/',
              PLAYLISTS_PAGE: '/playlists',
            };
          */}
          <PrivateRoute exact path="/" component={MainPage}/>
          <PrivateRoute exact path="/playlists" component={PlaylistsPage}/>
          <PrivateRoute exact path="/selectedPlaylist/:id" component={SelectedPlaylistPage}/>
          <PrivateRoute exact path="/uploadPlaylist" component={UploadPlaylist}/>
          <PrivateRoute exact path="/uploadTracks" component={UploadTracks}/>
          <PrivateRoute exact path="/uploadPlaylist" component={UploadPlaylist}/>
          <PrivateRoute exact path="/profile" component={ProfilePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
        </Switch>
        <Player/>
      </Router>
    </Provider>
  </ThemeProvider>
);
