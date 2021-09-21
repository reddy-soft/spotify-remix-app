import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

import Profile from './components/Profile'
import YourMusic from './components/YourMusic'
import YourPlaylists from './components/YourPlaylists'
import SpecificPlaylist from './components/SpecificPlaylist'
import SpecificAlbum from './components/SpecificAlbum'
import SpecificCategiryPlaylist from './components/SpecificCategiryPlaylist'
import NotFound from './components/NotFound'

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
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
