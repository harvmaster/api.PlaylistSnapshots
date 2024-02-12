import { Response } from 'express'
import { AuthenticatedUserRequest } from '../Types'

import axios from 'axios'
import spotifyTokenManager from '../../services/SpotifyTokenManager'

export const getUserInfo = async (req: AuthenticatedUserRequest, res: Response) => {
  const { user } = req
  console.log(user)

  const token = await spotifyTokenManager.getToken(user.spotify_id)

  const spotifyUser = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token.token}`
    }
  })
  
  const response = {
    name: spotifyUser.data.display_name,
    avatar: spotifyUser.data.images[0].url,
    spotify_id: spotifyUser.data.id,
    id: user._id
  }

  res.json(response)
}