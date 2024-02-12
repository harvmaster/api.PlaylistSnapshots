import axios from 'axios'
import config from '../../config'
import User from '../models/user'

export interface SpotifyToken {
  token: string
  expires_in: number
}

export class SpotifyTokenManager {
  users = new Map<string, SpotifyToken>()

  async getToken (userId: string): Promise<SpotifyToken> {
    const user = this.users.get(userId)

    if (user && user.expires_in > Date.now()) {
      return user
    }

    const token = await this.refreshToken(userId)

    this.users.set(userId, token)

    return token
  }

  async refreshToken (userId: string): Promise<SpotifyToken> {
    const user = await User.findOne({ spotify_id: userId })

    if (!user) {
      throw new Error('User not found')
    }

    try {
      const { data } = await axios.post('https://accounts.spotify.com/api/token',
        {
          refresh_token: user.refreshToken,
          grant_type: 'refresh_token',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${config.spotify.client_id}:${config.spotify.client_secret}`).toString('base64')}`
          }
        })

      const token = {
        token: data.access_token,
        expires_in: data.expires_in
      } as SpotifyToken

      this.users.set(userId, token)

      return token
    } catch (err) {
      throw new Error(err.message)
    }
  }

}

const spotifyTokenManager = new SpotifyTokenManager()

export default spotifyTokenManager