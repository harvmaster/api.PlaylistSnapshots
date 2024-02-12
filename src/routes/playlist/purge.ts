import { Request, Response } from 'express'

import Playlist from '../../models/playlist'
import Track from '../../models/track'
import User from '../../models/user'
import Event from '../../models/playlistEvent'

export const purge = async (req: Request, res: Response) => {
  // const deleted = await Playlist.deleteMany({})
  // const deletedTracks = await Track.deleteMany({})
  const deletedEvents = await Event.deleteMany({})
  // const deletedUsers = await User.deleteMany({})

  // await Playlist.collection.drop()
  res.json({ status: 'Success' })
}

export default purge