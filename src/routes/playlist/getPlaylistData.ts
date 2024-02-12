import { Response, response } from "express";

import { getPlaylistTracks as getTracks } from "../../libs/spotify/getPlaylist";
import { AuthenticatedUserRequest } from '../Types'
import Playlist from "../../models/playlist";
import PlaylistEvent from "../../models/playlistEvent";
import Track from "../../models/track";
import getPlaylistSummary from "../../libs/spotify/getPlaylistSummary";

const trackedPlaylistTemplate = {
  id: null,
  // spotify_id: null,
  added_by: [],
  createdAt: null,
  tracked: null,
}

export const getPlaylistData = async (req: AuthenticatedUserRequest, res: Response<PlaylistResponse>) => {
  const { user } = req
  const { playlistId } = req.params

  const spotifyTracks = await getTracks(user.spotify_id, playlistId)
  const { id,  ...spotifyPlaylist } = await getPlaylistSummary(user.spotify_id, playlistId)

  const { added_by, ...playlist } = await Playlist.findOne({ spotify_id: playlistId }).then(playlist => playlist ? playlist.toRes() : {...trackedPlaylistTemplate})
  const events = await PlaylistEvent.find({ playlist_id: playlist.id })
  const tracks = await Track.find({ _id: { $in: events.map(event => event.track_id) } })

  // Remove dupes from spotifyTracks and database tracks
  const responseTracks = {}
  tracks.forEach(track => {
    responseTracks[track.spotify_id] = track.toRes()
  })
  // console.log(spotifyTracks)
  spotifyTracks.forEach(track => {
    const prevId = responseTracks[track.id]?.id
    responseTracks[track.id] = track
    responseTracks[track.id].spotify_id = track.id
    responseTracks[track.id].id = prevId
  })

  const responsePlaylist = {
    spotify_id: id,
    ...spotifyPlaylist,
    ...playlist,
    added_by: {
      total: added_by.length,
      user: added_by.includes(user.spotify_id)
    },
    events: {
      total: events.length,
      items: events.map(event => event.toRes())
    },
  }

  const response: PlaylistResponse = {
    playlist: responsePlaylist,
    tracks: responseTracks
  }

  res.json(response)
}

export default getPlaylistData