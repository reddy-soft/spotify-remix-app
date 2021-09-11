import {Component} from 'react'
import {BsArrowLeftShort} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'

import './index.css'

class BackNavigation extends Component {
  goingToPrevious = () => {
    const {history} = this.props
    history.goBack()
  }

  render() {
    return (
      <button
        type="button"
        className="back-navigation-button"
        onClick={this.goingToPrevious}
      >
        <BsArrowLeftShort className="back-toggler" />
        <p className="back-text">Back</p>
      </button>
    )
  }
}

export default withRouter(BackNavigation)
