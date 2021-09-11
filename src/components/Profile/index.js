import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsFillPersonFill} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

class Profile extends Component {
  state = {profileDetails: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('pa_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const apiUrl = 'https://api.spotify.com/v1/me'
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.display_name,
        country: data.country,
        followers: data.followers.total,
      }

      this.setState({profileDetails: updatedData})
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  onLogOut = () => {
    const {history} = this.props
    Cookies.remove('pa_token')
    history.replace('/login')
  }

  render() {
    const {profileDetails} = this.state
    const {name, followers} = profileDetails
    return (
      <div className="main-container">
        <Header activeTab="PROFILE" />
        <div className="app-profile-container">
          <div className="profile-container">
            <BsFillPersonFill className="profile-img" />
            <h1 className="profile-name">{name}</h1>
            <div className="profile-details">
              <div className="details-container">
                <p className="details-val">{followers}</p>
                <p className="details-name">FOLLOWERS</p>
              </div>
              <div className="details-container">
                <p className="details-val">0</p>
                <p className="details-name">PLAYLISTS</p>
              </div>
            </div>
            <button
              type="button"
              className="profile-btn"
              onClick={this.onLogOut}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
