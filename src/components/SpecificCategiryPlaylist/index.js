import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import BackNavigation from '../BackNavigation'
import Player from '../Player'

import './index.css'

class SpecificCategiryPlaylist extends Component {
  state = {
    specificCategoryDetails: {},
    specificCategoryList: [],
    playedSong: [],
  }

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

    const apiUrl = `https://api.spotify.com/v1/albums/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        name: data.name,
        type: data.type,
        imageUrl: data.images[0].url,
        tracks: data.tracks.total,
        artists: data.artists[0].name,
      }
      const filteredData = data.tracks.items.map(eachData => ({
        id: eachData.id,
        name: eachData.name,

        duration: eachData.duration_ms,
        artists: eachData.artists[0].name,
        songUrl: eachData.preview_url,
      }))

      this.setState(
        {
          specificCategoryDetails: updatedData,
          specificCategoryList: filteredData,
        },
        this.getPlayedSong,
      )
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  getPlayedSong = () => {
    const {specificCategoryDetails, specificCategoryList} = this.state
    const {imageUrl} = specificCategoryDetails
    const currentList = specificCategoryList[0]
    const playedSong = {...currentList, imageUrl}

    this.setState({playedSong})
  }

  getSerialNum = id => {
    const {specificCategoryList} = this.state
    const index = specificCategoryList.findIndex(item => {
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

  changeSong = event => {
    const {specificCategoryDetails, specificCategoryList} = this.state
    const {imageUrl} = specificCategoryDetails
    const index = specificCategoryList.findIndex(item => {
      if (item.name === event.target.textContent) {
        return true
      }
      return false
    })
    const finalPlaySong = specificCategoryList.filter(
      item => item.id === specificCategoryList[index].id,
    )
    const playedSong = {...finalPlaySong[0], imageUrl}
    this.setState({playedSong})
  }

  getSpecificCategoryPlaylists = item => {
    const {id, name, duration, artists} = item

    return (
      <div className="sp-album-bottom-container" key={id}>
        <p className="sp-album-bottom-item add-width2">
          {this.getSerialNum(id)}
        </p>
        <p
          className="sp-album-bottom-item add-width mobile-header"
          onClick={this.changeSong}
        >
          {name}
        </p>
        <p className="sp-album-bottom-item ">{artists}</p>
        <p className="sp-album-bottom-item mobile-header add-width3">
          {this.getDurationInFormat(duration / 1000)}
        </p>
      </div>
    )
  }

  render() {
    const {
      specificCategoryDetails,
      specificCategoryList,
      playedSong,
    } = this.state
    const {imageUrl, artists, type, name} = specificCategoryDetails
    return (
      <div className="sp-category-playlist-container">
        <div className="header-container">
          <Header activeTab="PLAYLISTS" />
        </div>

        <div className="music-playlist-section">
          <div className="sp-category-playlist-app-container">
            <BackNavigation />
            <div className="sp-album-top-section">
              <img
                src={imageUrl}
                alt={name}
                className="sp-album-top-section-img"
              />
              <div className="sp-album-top-section-details">
                <p className="sp-album-top-section-header">#{type}</p>
                <h1 className="sp-album-top-section-heading">{name}</h1>
                <p className="sp-album-top-section-tracks">{artists}</p>
              </div>
            </div>
            <div className="sp-album-bottom-container">
              <h1 className="sp-album-bottom-header add-width2">#</h1>
              <h1 className="sp-album-bottom-header add-width">Track</h1>
              <h1 className="sp-album-bottom-header ">Artist</h1>
              <h1 className="sp-album-bottom-header">Time</h1>
            </div>
            <hr className="horizontal_line" />
            {specificCategoryList.map(eachItem =>
              this.getSpecificCategoryPlaylists(eachItem),
            )}
          </div>
          <Player player={playedSong} />
        </div>
      </div>
    )
  }
}

export default SpecificCategiryPlaylist
