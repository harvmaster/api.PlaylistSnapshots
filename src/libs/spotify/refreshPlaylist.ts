import axios from 'axios'
import SpotifyTokenManager from '../../services/SpotifyTokenManager'
import Playlist from '../../models/playlist'
import User from '../../models/user'
import Event from '../../models/playlistEvent'
import Track from '../../models/track'

export const refreshPlaylist = async (playlistId: string) => {
  const playlist = await Playlist.findOne({ spotify_id: playlistId })
  if (!playlist) {
    return console.log('RefreshPlaylist: Playlist not found')
  }

  // const user = await User.findOne({ _id: playlist.added_by[0] })
  const user = playlist.added_by[0]
  if (!user) {
    return console.log('RefreshPlaylist: User not found')
  }

  const token = await SpotifyTokenManager.getToken(user)
  console.log(token)

  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${token.token}`
    }
  })

  const tracks: any[] = response.data.items.map((item: any) => {
    return {
      spotify_id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      duration: item.track.duration_ms,
      album_cover: item.track.album.images[0].url,
    }
  })

  const databaseTracks = await Track.find({ spotify_id: { $in: tracks.map((track: any) => track.spotify_id) } })
  const tracksToCreate = tracks.filter((track: any) => {
    return !databaseTracks.find((databaseTrack: any) => databaseTrack.spotify_id === track.spotify_id)
  })
  // console.log(databaseTracks)
  // console.log(tracksToCreate)

  let createdTracks = []
  if (tracksToCreate.length > 0) {
    createdTracks = await Track.create(tracksToCreate)
    // console.log(createdTracks)
  }
  const allTracks = [...databaseTracks, ...createdTracks]
  tracks.forEach((track: any) => {
    const databaseTrack = allTracks.find((databaseTrack: any) => databaseTrack.spotify_id === track.spotify_id)
    track._id = databaseTrack._id
  })

  const currentTracks = await Event.getCurrentState(playlist._id)
  console.log('**************\nCurrent Tracks', currentTracks, '*****************', currentTracks.map((track: any) => track.toString()), '*****************')
  console.log('----------', tracks.map(track => track._id))
  const tracksToAdd = tracks.filter((track: any) => {
    return !currentTracks.find((currentTrack: any) => currentTrack.toString() === track._id.toString())
  })

  const tracksToRemove = currentTracks.filter((track: any) => {
    return !tracks.find((currentTrack: any) => currentTrack._id.toString() === track.toString())
  })

  await Promise.all(tracksToAdd.map(async (track: any) => {
    const newTrack = await Event.create({
      track_id: track._id,
      playlist_id: playlist._id,
      event_type: 'add',
      create_date: track.added_at,
    })

    return newTrack
  }))

  await Promise.all(tracksToRemove.map(async (track: any) => {
    const newTrack = await Event.create({
      track_id: track._id,
      playlist_id: playlist._id,
      event_type: 'remove',
    })

    return newTrack
  }))

  // return console.log(currentTracks, tracksToAdd, tracksToRemove)

  await Playlist.updateOne({ spotify_id: playlistId }, { last_snapshot: Date.now() })

  return tracks
}