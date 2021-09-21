import './index.css'

const defaultUrl =
  'https://p.scdn.co/mp3-preview/bb9f413d6876e265d09a5d2d93345c64f8ac4de8?cid=8bbaca20f32d46878d0fdf8b2766bd5e'

const Player = props => {
  const {player} = props

  const {name, artists, imageUrl, songUrl} = player
  return (
    <div className="player-container">
      <div className="player-details-container">
        <img src={imageUrl} alt={name} className="player-image" />
        <div className="player-details">
          <h1 className="player-details-name">{name}</h1>
          <p className="player-details-artists">{artists}</p>
        </div>
      </div>
      <audio
        controls
        src={songUrl === null ? defaultUrl : songUrl}
        type="audio/mp3"
      >
        <track default kind="captions" srcLang="en" />
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  )
}

export default Player
