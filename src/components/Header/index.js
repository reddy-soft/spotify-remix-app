import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsPersonFill, BsMusicNoteBeamed} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {RiPlayListFill} from 'react-icons/ri'

import './index.css'

class Header extends Component {
  state = {activeTab: 'HOME'}

  componentDidMount() {
    const {activeTab} = this.props
    this.setState({activeTab})
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="side-nav-bar">
        <Link to="/profile" className="nav-link">
          <img
            src="https://res.cloudinary.com/dseolkiyk/image/upload/v1628318973/Vector_t9cmrv.png"
            alt="Spotify Logo"
            className="logo"
          />
        </Link>
        <ul className="navigation-container">
          <Link to="/profile" className="nav-link">
            <li
              className={`nav-element ${
                activeTab === 'PROFILE' ? 'active-nav' : ''
              }`}
            >
              <BsPersonFill className="nav-image" />
              <p className="nav-img-label">Profile</p>
            </li>
          </Link>
          <Link to="/" className="nav-link">
            <li
              className={`nav-element ${
                activeTab === 'HOME' ? 'active-nav' : ''
              }`}
            >
              <AiFillHome className="nav-image" />
              <p className="nav-img-label">Home</p>
            </li>
          </Link>
          <Link to="/your-music" className="nav-link">
            <li
              className={`nav-element ${
                activeTab === 'MUSIC' ? 'active-nav' : ''
              }`}
            >
              <BsMusicNoteBeamed className="nav-image" />
              <p className="nav-img-label">YourMusic</p>
            </li>
          </Link>
          <Link to="/playlists" className="nav-link">
            <li
              className={`nav-element ${
                activeTab === 'PLAYLISTS' ? 'active-nav' : ''
              }`}
            >
              <RiPlayListFill className="nav-image" />
              <p className="nav-img-label">Playlists</p>
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}

export default Header
