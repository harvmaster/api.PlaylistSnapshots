import { Request, Response } from 'express'
import config from '../../../config'

// Returns a url to the user that can be used to authenticate with Spotify
export const createAuthRequest = async (req: Request, res: Response) => {
    
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${config.spotify.client_id}&scope=${config.spotify.scopes.join('%20')}&redirect_uri=${config.spotify.redirect_uri}`
    
    res.redirect(url)
}

export default createAuthRequest