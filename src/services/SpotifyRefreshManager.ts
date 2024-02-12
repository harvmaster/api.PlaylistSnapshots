import Playlist from "../models/playlist"
import { refreshPlaylist } from "../libs/spotify/refreshPlaylist"

export const refreshPlaylists = async () => {
  const playlists = await Playlist.find({ tracked: { $ne: null } })
  const playlistsToRefresh = playlists.filter(playlist => {
    if (playlist.last_snapshot === null) return true
    return Date.now() - playlist.last_snapshot.getTime() > 1000 * 60 * 60 * 0.5
  })

  console.log('Playlists to refresh: ', playlistsToRefresh)
  playlistsToRefresh.forEach(playlist => {
    console.log('Refreshing playlist: ', playlist.spotify_id)
    refreshPlaylist(playlist.spotify_id)
  })

}

export default refreshPlaylists