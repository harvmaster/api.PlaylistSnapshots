import Express from 'express'

import auth from '../../auth'

import getPlaylists from './getPlaylists'
// import getPlaylistTracks from './getPlaylistTracks'
import updatePlaylistStatus from './updatePlaylistStatus'
import getPlaylistData from './getPlaylistData'
import purge from './purge'
import refresh from './refreshPlaylist'

const router = Express.Router()

router.get('/all', auth, getPlaylists)
router.get('/:playlistId', auth, getPlaylistData)
router.get('/:playlistId/refresh', refresh)

router.put('/:playlistId/status', auth, updatePlaylistStatus)

router.delete('/all', purge)

export default router
