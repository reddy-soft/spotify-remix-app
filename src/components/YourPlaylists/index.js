import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import YourPlaylistsCard from '../YourPlaylistsCard'

import './index.css'

class YourPlaylists extends Component {
  state = {yourPlaylistsList: []}

  componentDidMount() {
    this.getYourPlaylists()
  }

  getYourPlaylists = async () => {
    const token = Cookies.get('pa_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const userUrl = 'https://api.spotify.com/v1/me'
    const userResponse = await fetch(userUrl, options)
    if (userResponse.ok === true) {
      const userData = await userResponse.json()
      const username = userData.display_name

      const apiUrl = `https://api.spotify.com/v1/users/${username}/playlists?limit=50`
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const updatedData = data.items.map(eachdata => ({
        id: eachdata.id,
        name: eachdata.name,
        imageUrl: eachdata.images,
        tracks: eachdata.tracks.total,
      }))

      const formattedData = updatedData.filter(eachData => eachData.tracks > 0)

      this.setState({yourPlaylistsList: formattedData})
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  render() {
    const {yourPlaylistsList} = this.state

    return (
      <div className="playlist-container">
        <Header activeTab="PLAYLISTS" />
        <div className="playlist-app-container">
          <h1 className="playlists-heading">Your Playlists</h1>
          <ul className="playlists-list">
            {yourPlaylistsList.map(eachPlaylist => (
              <Link
                to={`/playlist/${eachPlaylist.id}`}
                className="nav-link"
                key={eachPlaylist.id}
              >
                <YourPlaylistsCard yourPlaylistscard={eachPlaylist} />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default YourPlaylists
