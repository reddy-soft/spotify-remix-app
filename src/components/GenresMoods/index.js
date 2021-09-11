import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import PlaylistCard from '../PlaylistCard'

import './index.css'

class GenresMoods extends Component {
  state = {genresMoodsList: []}

  componentDidMount() {
    this.getGenresMoods()
  }

  getGenresMoods = async () => {
    const token = Cookies.get('pa_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const apiUrl = `https://api.spotify.com/v1/browse/categories`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.categories.items.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.icons[0].url,
      }))
      this.setState({genresMoodsList: updatedData})
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  render() {
    const {genresMoodsList} = this.state

    return (
      <div className="categories-container">
        <h1 className="category-name">Genres & Moods</h1>
        <br />
        <div className="category-container">
          {genresMoodsList.map(eachCard => (
            <Link
              to={`/album/${eachCard.id}`}
              className="nav-link"
              key={eachCard.id}
            >
              <PlaylistCard playlistsCard={eachCard} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default GenresMoods
