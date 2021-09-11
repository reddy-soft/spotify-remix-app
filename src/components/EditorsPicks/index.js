import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import {Link} from 'react-router-dom'

import PlaylistCard from '../PlaylistCard'

import './index.css'

const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

class EditorsPicks extends Component {
  state = {editorPicsList: [], message: ''}

  componentDidMount() {
    this.getEditorsPicks()
  }

  getEditorsPicks = async () => {
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

    const apiUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timestamp}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {message} = data

      const updatedData = data.playlists.items.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.images[0].url,
      }))
      this.setState({message, editorPicsList: updatedData})
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  render() {
    const {editorPicsList, message} = this.state

    return (
      <div className="picks-container">
        <h1 className="message-name">{message}</h1>
        <br />
        <div className="editor-container">
          {editorPicsList.map(eachCard => (
            <Link
              key={eachCard.id}
              className="nav-link"
              to={`/editor-picks/${eachCard.id}`}
            >
              <PlaylistCard playlistsCard={eachCard} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default EditorsPicks
