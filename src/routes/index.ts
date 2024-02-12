import Express from 'express'

import auth from './auth'
import playlist from './playlist'

const router = Express.Router()

router.use('/auth', auth)
router.use('/playlists', playlist)

export default router