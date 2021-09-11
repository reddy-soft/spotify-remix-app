import './index.css'

const PlaylistCard = props => {
  const {playlistsCard} = props
  const {name, imageUrl} = playlistsCard

  return (
    <div className="card-container">
      <img src={imageUrl} alt={name} className="card-img" />
      <p className="card-name">{name}</p>
    </div>
  )
}

export default PlaylistCard
