import Express from 'express'

import auth from '../../auth'

import { createAuthRequest } from './createAuthRequest'
import { handleAuthCallback } from './handleAuthCallback'
import { getUserInfo } from './getUserInfo'

const router = Express.Router()

router.get('/spotify', createAuthRequest)
router.get('/spotify/callback', handleAuthCallback)
router.get('/me', auth, getUserInfo)

export default router
