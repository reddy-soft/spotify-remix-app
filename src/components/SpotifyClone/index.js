import {Component} from 'react'

import Header from '../Header'
import EditorsPicks from '../EditorsPicks'
import GenresMoods from '../GenresMoods'
import NewReleases from '../NewReleases'

import './index.css'

class SpotifyClone extends Component {
  render() {
    return (
      <div className="main-container">
        <Header activeTab="HOME" />
        <div className="home-app-container">
          <EditorsPicks />
          <GenresMoods />
          <NewReleases />
        </div>
      </div>
    )
  }
}

export default SpotifyClone
