import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import PlaylistCard from '../PlaylistCard'

import './index.css'

class NewReleases extends Component {
  state = {newReleasesList: []}

  componentDidMount() {
    this.getNewReleases()
  }

  getNewReleases = async () => {
    const token = Cookies.get('pa_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const countryApi = 'https://api.spotify.com/v1/me'
    const countryResponse = await fetch(countryApi, options)
    const countryData = await countryResponse.json()
    const {country} = countryData
    const getUserCountry = country
    const apiUrl = `https://api.spotify.com/v1/browse/new-releases?country=${getUserCountry}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.albums.items.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.images[0].url,
      }))
      this.setState({newReleasesList: updatedData})
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  render() {
    const {newReleasesList} = this.state

    return (
      <div className="releases-container">
        <h1 className="releases-name">New Releases</h1>
        <br />
        <div className="releases-sub-container">
          {newReleasesList.map(eachCard => (
            <Link
              to={`/new-releases/${eachCard.id}`}
              key={eachCard.id}
              className="nav-link"
            >
              <PlaylistCard playlistsCard={eachCard} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default NewReleases
