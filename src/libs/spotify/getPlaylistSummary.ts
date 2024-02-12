import axios from 'axios'
import spotifyTokenManager from '../../services/SpotifyTokenManager'
import formatPlaylist, { FormattedPlaylist } from './formatPlaylist'

export const getPlaylistSummary = async (userId: string, playlistId: string): Promise<FormattedPlaylist> => {
  const token = await spotifyTokenManager.getToken(userId)
  console.log(playlistId)

  const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token.token}`
    },
    params: {
      fields: 'id,name,description,images,tracks(total)'
    }
  })

  return formatPlaylist(data)
}

export default getPlaylistSummary