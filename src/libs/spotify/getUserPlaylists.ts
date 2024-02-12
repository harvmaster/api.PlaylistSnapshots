import axios from 'axios'

import spotifyTokenManager from '../../services/SpotifyTokenManager'

import { UsersPlaylistsResponse } from './types/UserPlaylistsResponse'
import { SpotifyPlaylist } from './types/Playlist'
import { FormattedPlaylist, formatPlaylist } from './formatPlaylist'

export const getUserPlaylists = async (userId: string, offset: number = 0) => {
  const token = await spotifyTokenManager.getToken(userId)

  const playlists: FormattedPlaylist[] = [] as FormattedPlaylist[]

  const { data } = await axios.get<UsersPlaylistsResponse>('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token.token}`
    },
    params: {
      limit: 50,
      offset
    }
  })

  if (data.total > offset + 50) {
    const nextPlaylists = await getUserPlaylists(userId, offset + 50)
    playlists.push(...nextPlaylists.reverse())
  }

  const formatted = data.items.map(formatPlaylist)
  playlists.push(...formatted.reverse())

  return playlists.reverse()
}