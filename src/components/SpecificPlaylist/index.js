import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import BackNavigation from '../BackNavigation'
import Player from '../Player'

import './index.css'

class SpecificPlaylist extends Component {
  state = {specificPlaylistAlbum: {}, specificPlaylist: [], playedSong: {}}

  componentDidMount() {
    this.getSpecificPlaylist()
  }

  getSpecificPlaylist = async () => {
    const token = Cookies.get('pa_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.id,
        name: data.name,
        type: data.type,
        imageUrl: data.images[0].url,
        tracks: data.tracks.total,
      }

      const filteredData = data.tracks.items.map(eachData => ({
        id: eachData.track.id,
        name: eachData.track.name,
        album: eachData.track.album.name,
        duration: eachData.track.duration_ms,
        artists: eachData.track.artists[0].name,
        addTime: eachData.added_at,
        songUrl: eachData.track.preview_url,
      }))
      this.setState(
        {
          specificPlaylistAlbum: updatedData,
          specificPlaylist: filteredData,
        },
        this.playedSong,
      )
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  playedSong = () => {
    const {specificPlaylistAlbum, specificPlaylist} = this.state
    const {imageUrl} = specificPlaylistAlbum
    const currentList = specificPlaylist[0]
    const playedSong = {...currentList, imageUrl}

    this.setState({playedSong})
  }

  getSerialNum = id => {
    const {specificPlaylist} = this.state
    const index = specificPlaylist.findIndex(item => {
      if (item.id === id) {
        return true
      }
      return false
    })

    return index + 1
  }

  getDurationInFormat = duration => {
    const minutesTime = Math.floor(duration / 60)
    const secondsTime = Math.ceil(duration - minutesTime * 60)
    const seconds = secondsTime < 10 ? `0${secondsTime}` : secondsTime
    const minutes = minutesTime < 10 ? `0${minutesTime}` : minutesTime

    return `${minutes}:${seconds}`
  }

  getAddedTime = time => {
    const date = new Date(time)
    const currentTime = new Date()
    const addedTimeInMS = currentTime - date
    const days = Math.ceil(addedTimeInMS / (60 * 60 * 24 * 1000))

    if (days < 30) {
      return `${days} Days Ago`
    }

    return days < 365 === true
      ? `${Math.floor(days / 30)} Months Ago`
      : `${Math.floor(days / 365)} Years Ago`
  }

  changeSong = event => {
    const {specificPlaylistAlbum, specificPlaylist} = this.state
    const {imageUrl} = specificPlaylistAlbum
    const index = specificPlaylist.findIndex(item => {
      if (item.name === event.target.textContent) {
        return true
      }
      return false
    })
    const finalPlaySong = specificPlaylist.filter(
      item => item.id === specificPlaylist[index].id,
    )
    const playedSong = {...finalPlaySong[0], imageUrl}
    this.setState({playedSong})
  }

  getSpecificPlaylists = item => {
    const {id, name, album, duration, artists, addTime} = item

    return (
      <li className="sp-playlist-bottom-container" key={id}>
        <p className="sp-playlist-bottom-item width-1 ">
          {this.getSerialNum(id)}
        </p>
        <p
          className="sp-playlist-bottom-item width-2 mobile-header"
          onClick={this.changeSong}
        >
          {name}
        </p>
        <p className="sp-playlist-bottom-item  width-2">{album}</p>
        <p className="sp-playlist-bottom-item width-3 mobile-header">
          {this.getDurationInFormat(duration / 1000)}
        </p>
        <p className="sp-playlist-bottom-item  width-3">{artists}</p>
        <p className="sp-playlist-bottom-item  width-3">
          {this.getAddedTime(addTime)}
        </p>
      </li>
    )
  }

  render() {
    const {specificPlaylistAlbum, specificPlaylist, playedSong} = this.state

    const {name, type, imageUrl, tracks} = specificPlaylistAlbum
    return (
      <div className="sp-playlist-container">
        <div className="header-container">
          <Header activeTab="PLAYLISTS" />
        </div>
        <div className="music-playlist-section">
          <div className="sp-playlist-app-container">
            <BackNavigation />
            <div className="sp-playlist-top-section">
              <img
                src={imageUrl}
                alt={name}
                className="sp-playlist-top-section-img"
              />
              <div className="sp-playlist-top-section-details">
                <p className="sp-playlist-top-section-header">#{type}</p>
                <h1 className="sp-playlist-top-section-heading">{name}</h1>
                <p className="sp-playlist-top-section-tracks">
                  {tracks} Tracks
                </p>
              </div>
            </div>
            <div className="sp-playlist-bottom-container">
              <h1 className="sp-playlist-bottom-header width-1">#</h1>
              <h1 className="sp-playlist-bottom-header width-2">Track</h1>
              <h1 className="sp-playlist-bottom-header  width-2">Album</h1>
              <h1 className="sp-playlist-bottom-header width-3">Time</h1>
              <h1 className="sp-playlist-bottom-header  width-3">Artist</h1>
              <h1 className="sp-playlist-bottom-header  width-3">Added</h1>
            </div>
            <hr className="horizontal_line" />
            <ul className="list-items-container">
              {specificPlaylist.map(eachItem =>
                this.getSpecificPlaylists(eachItem),
              )}
            </ul>
          </div>
          <Player player={playedSong} />
        </div>
      </div>
    )
  }
}

export default SpecificPlaylist
