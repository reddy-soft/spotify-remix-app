import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import BackNavigation from '../BackNavigation'

import './index.css'
import YourPlaylistsCard from '../YourPlaylistsCard'

class SpecificAlbum extends Component {
  state = {specificAlbumsList: [], albumName: ''}

  componentDidMount() {
    this.getSpecificAlbums()
  }

  getSpecificAlbums = async () => {
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

    this.setState({albumName: id})

    const countryApi = 'https://api.spotify.com/v1/me'
    const countryResponse = await fetch(countryApi, options)
    const countryData = await countryResponse.json()
    const {country} = countryData
    const getUserCountry = country

    const apiUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${getUserCountry}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.playlists.items.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        tracks: eachData.tracks.total,
        imageUrl: eachData.images,
      }))

      this.setState({specificAlbumsList: updatedData})
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  render() {
    const {specificAlbumsList, albumName} = this.state

    return (
      <div className="sp-album-container">
        <div className="header-container">
          <Header activeTab="HOME" />
        </div>

        <div className="sp-album-app-container">
          <BackNavigation />
          <h1 className="sp-album-heading">{albumName.toUpperCase()}</h1>
          <ul className="sp-albums-List">
            {specificAlbumsList.map(eachItem => (
              <Link
                to={`/albums/${albumName}/${eachItem.id}`}
                key={eachItem.id}
                className="nav-link"
              >
                <YourPlaylistsCard yourPlaylistscard={eachItem} />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SpecificAlbum
