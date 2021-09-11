import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Player from '../Player'

import './index.css'

class YourMusic extends Component {
  state = {musicListYours: [], playSong: []}

  componentDidMount() {
    this.getYourMusic()
  }

  getYourMusic = async () => {
    const apiUrl = 'https://api.spotify.com/v1/me/tracks'
    const token = Cookies.get('pa_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.items.map(eachData => ({
        id: eachData.track.id,
        name: eachData.track.name,
        songUrl: eachData.track.preview_url,
        imageUrl: eachData.track.album.images[0].url,
        artists: eachData.track.artists.map(person => person.name),
        duration: eachData.track.duration_ms,
      }))

      this.setState({musicListYours: updatedData}, this.getPlayedSong)
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  getPlayedSong = () => {
    const {musicListYours} = this.state
    this.setState({playSong: musicListYours[0]})
  }

  getDurationInFormat = duration => {
    const minutesTime = Math.floor(duration / 60)
    const secondsTime = Math.ceil(duration - minutesTime * 60)
    const seconds = secondsTime < 10 ? `0${secondsTime}` : secondsTime
    const minutes = minutesTime < 10 ? `0${minutesTime}` : minutesTime

    return `${minutes}:${seconds}`
  }

  changeSong = event => {
    const {musicListYours} = this.state
    const songTitle = event.target.textContent
    const index = musicListYours.findIndex(item => {
      if (item.name === songTitle) {
        return true
      }
      return false
    })

    const finalPlaySong = musicListYours.filter(
      item => item.id === musicListYours[index].id,
    )

    this.setState({
      playSong: finalPlaySong[0],
    })
  }

  getMusicItems = music => {
    const {id, name, artists, imageUrl, duration} = music
    return (
      <li key={id} className="music-item-container">
        <img src={imageUrl} alt={name} className="music-item-img" />
        <div className="music-item-details">
          <h1 className="music-item-name" onClick={this.changeSong}>
            {name}
          </h1>
          <p className="music-item-artists">{artists.join(' - ')}</p>
        </div>
        <p className="music-item-duration">
          {this.getDurationInFormat(duration / 1000)}
        </p>
      </li>
    )
  }

  render() {
    const {musicListYours, playSong} = this.state

    return (
      <div className="music-container">
        <Header activeTab="MUSIC" />
        <div className="music-playlist-section">
          <div className="music-app-container">
            <h1 className="music-heading">Your Music</h1>
            <ul className="music-list-container">
              {musicListYours.map(eachMusic => this.getMusicItems(eachMusic))}
            </ul>
          </div>
          <Player player={playSong} />
        </div>
      </div>
    )
  }
}

export default YourMusic
