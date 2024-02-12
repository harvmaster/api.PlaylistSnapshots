import { Request, Response } from 'express'
import axios from 'axios'

import User from '../../models/user'
import SpotifyTokenManager from '../../services/SpotifyTokenManager'

import config from '../../../config'

export const handleAuthCallback = async (req: Request, res: Response) => {
  const { code, error } = req.query

  if (error) {
    res.status(400).json({ message: error })
    return
  }

  if (!code) {
    res.status(400).json({ message: 'Missing code' })
    return
  }

  const url = `https://accounts.spotify.com/api/token`

  try {

    // Get access and refresh Token
    const { data } = await axios.post(url,
      {
        code,
        redirect_uri: config.spotify.redirect_uri,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${config.spotify.client_id}:${config.spotify.client_secret}`).toString('base64')}`
        }
      })

    const userRes = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${data.access_token}`
      } 
    })

    // Check if user already exists
    const userExists = await User.findOne({ spotify_id: userRes.data.id })
    if (userExists) {
      return res.redirect(`${config.client_url}/auth?token=${userExists.generateToken()}`)
    }

    // add user to database if they dont exist
    const user = new User({
      spotify_id: userRes.data.id,
      refreshToken: data.refresh_token
    })

    await user.save()

    const userToken = user.generateToken()

    res.redirect(`${config.client_url}/auth?token=${userToken}`)
  } catch (err) {
    res.status(500).json({ message: err.message })
    return
  }
}

export default handleAuthCallback