import { Response } from "express";

import { getPlaylistTracks as getTracks } from "../../libs/spotify/getPlaylist";
import { AuthenticatedUserRequest } from '../Types'

export const getPlaylistTracks = async (req: AuthenticatedUserRequest, res: Response) => {
  const { user } = req
  const { playlistId } = req.params

  const tracks = await getTracks(user.spotify_id, playlistId, 0)

  res.json(tracks)
}

export default getPlaylistTracks