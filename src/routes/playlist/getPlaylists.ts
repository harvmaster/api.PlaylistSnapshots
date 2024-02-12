import { Response } from "express";

import { getUserPlaylists } from "../../libs/spotify/getUserPlaylists";
import { AuthenticatedUserRequest } from '../Types'
import Playlists from "../../models/playlist";

const trackedPlaylistTemplate = {
  id: null,
  spotify_id: null,
  added_by: [],
  createdAt: null,
  tracked: null,
}

export const getPlaylists = async (req: AuthenticatedUserRequest, res: Response<UsersPlaylistsResponse>) => {
  const { user } = req
  // console.log(user)

  // const debugPlaylists = await Playlists.find({})
  // console.log(debugPlaylists)

  const spotifyPlaylistsPromise = getUserPlaylists(user.spotify_id)
  const trackedPlaylistsPromise = Playlists.find({ added_by: user.spotify_id }).then(playlists => playlists.map(playlist => playlist.toRes()))
  const [ spotifyPlaylists, trackedPlaylists ] = await Promise.all([spotifyPlaylistsPromise, trackedPlaylistsPromise])
  // console.log(trackedPlaylists)

  const playlists: Playlist[] = spotifyPlaylists.map(playlist => {
    const trackedPlaylist = trackedPlaylists.find(trackedPlaylist => trackedPlaylist.spotify_id === playlist.id) || { ...trackedPlaylistTemplate }
    return {
      ...playlist,

      id: trackedPlaylist ? trackedPlaylist.id : null,
      spotify_id: playlist.id,
      added_by: {
        total: trackedPlaylist.added_by.length,
        user: trackedPlaylist.added_by.includes(user.spotify_id)
      },
      createdAt: trackedPlaylist.createdAt,

      tracked: trackedPlaylist ? trackedPlaylist.tracked : null,
      events: {
        total: -1
      },
    }
  })
  
  const response: UsersPlaylistsResponse = {
    playlists: playlists
  }

  res.json(response)
}

export default getPlaylists