import axios from 'axios'
import spotifyTokenManager from '../../services/SpotifyTokenManager'
import formatTrack from './formatTrack'

export const getPlaylistTracks = async (userId: string, playlistId: string, offset: number = 0): Promise<Track[]> => {
  const token = await spotifyTokenManager.getToken(userId)
  console.log(playlistId, offset)

  const tracks = []

  const playlist = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token.token}`
    }
  })

  // console.log(playlist.data)

  if (playlist.data.total > offset + 100) {
    const nextTracks = await getPlaylistTracks(userId, playlistId, offset + 100)
    tracks.push(...nextTracks.map(formatTrack))
  }

  tracks.push(...playlist.data.items.map(formatTrack))


  return tracks.sort((a, b) => a.added_at > b.added_at ? 1 : -1)
}

export default getPlaylistTracks