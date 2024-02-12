export const formatTrack = (trackObj: any): Track => {
  const track = trackObj.track
  return {
    id: track.id,
    spotify_id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    duration: track.duration_ms,
    album_cover: track.album.images[0].url,
  }
}

export default formatTrack