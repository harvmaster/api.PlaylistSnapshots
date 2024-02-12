import { Response, Request } from "express";
import { AuthenticatedUserRequest } from "../../@types/AuthenticatedUserRequest";

import Playlist from "../../models/playlist";
import User from "../../models/user";

import { refreshPlaylist } from "../../libs/spotify/refreshPlaylist";

interface UpdatePlaylistStatusRequest extends AuthenticatedUserRequest{
  params: {
    playlistId: string;
  }
}

export const updatePlaylistStatus = async (req: UpdatePlaylistStatusRequest, res: Response<PlaylistStatusResponse | { message: string }>) => {
  const { playlistId } = req.params;
  const { status } = req.body;

  const playlist = await Playlist.findOne({ spotify_id: playlistId });

  console.log('Update status: ' + playlistId)
  console.log('User Id: ' + req.user.spotify_id)
  console.log(playlist._id)
  
  if (!playlist) {
    const newPlaylist = await Playlist.create({
      spotify_id: playlistId,
      added_by: [req.user.spotify_id],
      tracked: new Date(),
    });
    
    refreshPlaylist(playlistId);
    
    return res.json({
      playlist: {
        tracked: newPlaylist.tracked,
        added_by: {
          total: newPlaylist.added_by.length,
          user: true
        }
      }
    });
  }
  
  // Is user tracking this playlist?
  const isTracking = playlist.added_by.find(userId => userId.toString() === req.user.spotify_id.toString());
  console.log('is tracking: ', isTracking)
  if (!isTracking) {
    playlist.added_by.push(req.user.spotify_id);
    await playlist.save();

    return res.json({
      playlist: {
        tracked: playlist.tracked,
        added_by: {
          total: playlist.added_by.length,
          user: true
        }
      }
    })
  }

  playlist.added_by = playlist.added_by.filter(userId => userId.toString() !== req.user.spotify_id.toString());
  console.log('added by: ', playlist.added_by)
  if (playlist.added_by.length === 0) {
    playlist.tracked = null;
  }
  await playlist.save()

  return res.json({
    playlist: {
      tracked: playlist.tracked,
      added_by: {
        total: playlist.added_by.length,
        user: false
      }
    }
  });
}

export default updatePlaylistStatus