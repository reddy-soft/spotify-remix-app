import './index.css'

const altImage =
  'https://res.cloudinary.com/dseolkiyk/image/upload/v1628514453/Spotify_Your_Library_-_Google_Chrome_09-08-2021_18_35_38_2_s4e5iv.png'

const YourPlaylistsCard = props => {
  const {yourPlaylistscard} = props
  const {name, imageUrl, tracks} = yourPlaylistscard

  return (
    <div className="playlists-card-container">
      <img
        src={imageUrl.length === 0 ? altImage : imageUrl[0].url}
        alt={name}
        className="playlists-card-img"
      />
      <p className="playlists-card-name">{name}</p>
      <p className="playlists-card-tracks">{tracks} Tracks</p>
    </div>
  )
}

export default YourPlaylistsCard
