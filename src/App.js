import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

import Profile from './components/Profile'
import YourMusic from './components/YourMusic'
import YourPlaylists from './components/YourPlaylists'
import SpecificPlaylist from './components/SpecificPlaylist'
import SpecificAlbum from './components/SpecificAlbum'
import SpecificCategiryPlaylist from './components/SpecificCategiryPlaylist'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/your-music" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={YourPlaylists} />
      <ProtectedRoute path="/playlist/:id" component={SpecificPlaylist} />
      <ProtectedRoute path="/album/:id" component={SpecificAlbum} />
      <ProtectedRoute path="/albums/:id/:id" component={SpecificPlaylist} />
      <ProtectedRoute path="/editor-picks/:id" component={SpecificPlaylist} />
      <ProtectedRoute
        path="/new-releases/:id"
        component={SpecificCategiryPlaylist}
      />
    </Switch>
  </BrowserRouter>
)

export default App
